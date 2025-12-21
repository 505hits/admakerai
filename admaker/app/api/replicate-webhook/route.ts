import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { downloadVideo, uploadVideoToR2 } from '@/lib/r2-upload';

/**
 * Webhook endpoint for Replicate predictions
 * Handles video completion and saves to Supabase
 */

// Force dynamic rendering - critical for webhooks
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds max

// Helper function to create Supabase service client
function createServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        console.log('📹 Replicate Webhook POST received');

        const body = await request.json();
        console.log('📹 Replicate webhook payload:', JSON.stringify(body, null, 2));

        const { id: predictionId, status, output, error } = body;

        if (!predictionId) {
            console.log('⚠️ No prediction ID in webhook');
            return NextResponse.json(
                { success: true, message: 'No prediction ID provided' },
                { status: 200 }
            );
        }

        if (status === 'succeeded' && output) {
            console.log(`✅ Video completed: ${predictionId}`);
            console.log(`📺 Replicate output URL: ${output}`);

            // Save video to database
            await saveVideoToDatabase(predictionId, output);

        } else if (status === 'failed' || status === 'canceled') {
            console.log(`❌ Video generation failed: ${predictionId}, status: ${status}, error: ${error}`);

            // Update metadata to mark as failed
            const supabase = createServiceClient();
            await supabase
                .from('video_generation_metadata')
                .update({ status: 'failed' })
                .eq('task_id', predictionId);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Replicate webhook error:', error);
        // Always return 200 to avoid Replicate retrying
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}

// Helper function to save video to database
async function saveVideoToDatabase(predictionId: string, videoUrl: string) {
    try {
        console.log('💾 Saving Replicate video to Supabase...');
        const supabase = createServiceClient();

        // Retrieve metadata from Supabase
        console.log(`🔍 Looking for metadata with taskId: ${predictionId}`);
        const { data: metadata, error: metadataError } = await supabase
            .from('video_generation_metadata')
            .select('*')
            .eq('task_id', predictionId)
            .single();

        if (metadataError || !metadata) {
            console.log('⚠️ No metadata found for predictionId:', predictionId);
            console.log('🔄 Trying fallback: using most recent task metadata...');

            // Fallback: use the most recent task metadata
            const { data: recentMetadata, error: recentError } = await supabase
                .from('video_generation_metadata')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (recentError || !recentMetadata) {
                console.log('❌ No stored metadata available in Supabase');
                return;
            }

            console.log(`✅ Using metadata from most recent task: ${recentMetadata.task_id}`);
        }

        if (!metadata) {
            console.log('❌ Cannot save to database without user info');
            return;
        }

        // Download video from Replicate
        console.log('📥 Downloading video from Replicate...');
        const videoBuffer = await downloadVideo(videoUrl);

        // Upload to Cloudflare R2
        console.log('☁️ Uploading video to Cloudflare R2...');
        const fileName = `videos/${predictionId}.mp4`;
        const r2VideoUrl = await uploadVideoToR2(videoBuffer, fileName);

        console.log(`✅ Video uploaded to R2: ${r2VideoUrl}`);

        // Videos on R2 don't expire
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 10); // 10 years

        // Insert video record into Supabase with R2 URL
        const { error: insertError } = await supabase
            .from('videos')
            .insert({
                user_id: metadata.user_id,
                task_id: predictionId,
                video_url: r2VideoUrl,
                actor_name: metadata.actor_name,
                actor_image_url: metadata.actor_image_url,
                script: metadata.script,
                scene_description: metadata.scene_description,
                duration: metadata.duration,
                format: metadata.format,
                status: 'completed',
                expires_at: expiresAt.toISOString()
            });

        if (insertError) {
            console.error('❌ Error inserting video:', insertError);
            throw insertError;
        }

        console.log('✅ Video saved to Supabase successfully');
        console.log(`📊 Video details: user=${metadata.user_id}, actor=${metadata.actor_name}, duration=${metadata.duration}s`);
        console.log(`🔗 R2 URL: ${r2VideoUrl}`);

        // Clean up metadata after successful save
        await supabase
            .from('video_generation_metadata')
            .delete()
            .eq('task_id', predictionId);

        console.log('🧹 Metadata cleaned up');

    } catch (error: any) {
        console.error('❌ Error saving video to database:', error);
        throw error;
    }
}
