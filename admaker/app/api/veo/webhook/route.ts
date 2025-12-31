import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { getSecretFromRequest } from '@/lib/security/webhook-validation';

/**
 * Callback endpoint for Veo API
 * Handles video completion and saves to Supabase
 */

// Force dynamic rendering - critical for webhooks
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds max

// In-memory storage for task metadata (user_id, actor info, etc.)
// This is populated before video generation and used by the webhook
export const taskMetadata = new Map<string, {
    userId: string;
    actorName: string;
    actorImageUrl: string;
    script: string;
    sceneDescription: string;
    duration: number;
    format: string;
}>();


export async function POST(request: NextRequest) {
    try {
        console.log('==========================================');
        console.log('🎯 VEO WEBHOOK CALLED - Timestamp:', new Date().toISOString());
        console.log('🔗 URL:', request.url);
        console.log('🌍 Method:', request.method);
        console.log('==========================================');

        console.log('📹 Veo Callback POST received - Build: 2025-12-31-12:20');
        console.log('🔄 SIMPLIFIED ARCHITECTURE - Direct Kie URL storage');

        // Rate limiting for webhooks
        const clientIp = getClientIp(request);
        console.log('🔍 Client IP:', clientIp);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.webhook);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many webhook requests' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        // Webhook security: Verify secret token
        const secret = getSecretFromRequest(request);
        const expectedSecret = process.env.VEO_WEBHOOK_SECRET;

        console.log('🔐 Webhook security check:');
        console.log('   - Has secret in request:', !!secret);
        console.log('   - Has expected secret configured:', !!expectedSecret);

        if (expectedSecret && secret !== expectedSecret) {
            console.warn('❌ Unauthorized webhook attempt:', {
                ip: clientIp,
                hasSecret: !!secret,
            });
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!expectedSecret) {
            console.warn('⚠️ VEO_WEBHOOK_SECRET not configured - webhook is unsecured!');
        }

        const contentType = request.headers.get('content-type') || '';
        console.log('📋 Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('📦 Raw body length:', bodyText.length);
        console.log('📦 Raw body preview:', bodyText.substring(0, 300));

        // Check if body is a URL (plain text) - Kie sends this format
        const trimmedBody = bodyText.trim();

        // Handle plain URL (with or without quotes)
        const urlMatch = trimmedBody.match(/https?:\/\/[^\s"'\]]+/);
        if (urlMatch) {
            const veoVideoUrl = urlMatch[0];
            console.log('📹 Received URL callback (extracted from text)');
            console.log(`📺 Veo URL: ${veoVideoUrl}`);


            // Extract taskId from URL - Kie uses hex format WITHOUT dashes
            // Example: /v/651dfe3a590b77518403c2d2957ef2ae_1766427848.mp4
            // TaskId is 32 hex characters (no dashes)
            const taskIdMatch = veoVideoUrl.match(/\/([a-f0-9]{32})(?:_|\.)/);
            const taskId = taskIdMatch ? taskIdMatch[1] : null;

            if (!taskId) {
                console.error('❌ Could not extract taskId from URL:', veoVideoUrl);
                console.log('⚠️ Trying to use stored metadata keys...');

                // Try to find a matching taskId in metadata by checking all stored tasks
                const allTaskIds = Array.from(taskMetadata.keys());
                console.log(`Found ${allTaskIds.length} stored task IDs`);

                if (allTaskIds.length > 0) {
                    // Use the most recent task (last one added)
                    const recentTaskId = allTaskIds[allTaskIds.length - 1];
                    console.log(`Using most recent taskId: ${recentTaskId}`);
                    await saveVideoToDatabase(recentTaskId, veoVideoUrl);
                    return NextResponse.json({ success: true }, { status: 200 });
                }

                return NextResponse.json(
                    { success: true, message: 'Could not extract taskId from URL and no stored tasks' },
                    { status: 200 }
                );
            }

            console.log(`🔍 Extracted taskId: ${taskId}`);

            // Store Veo URL directly to Supabase
            await saveVideoToDatabase(taskId, veoVideoUrl);

            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Try to parse as JSON
        let body;
        try {
            body = JSON.parse(trimmedBody);
        } catch (parseError) {
            console.error('❌ Failed to parse as JSON:', parseError);
            console.log('Body was not a URL and not valid JSON');
            console.log('Body content:', trimmedBody.substring(0, 500));

            return NextResponse.json(
                { success: true, message: 'Received but could not parse' },
                { status: 200 }
            );
        }

        console.log('📹 Parsed JSON callback:', JSON.stringify(body, null, 2));

        const { code, msg, data } = body;
        const { taskId, info } = data || {};

        if (!taskId) {
            console.log('⚠️ No taskId in callback');
            return NextResponse.json(
                { success: true, message: 'No taskId provided' },
                { status: 200 }
            );
        }

        if (code === 200) {
            // Extract video URL from resultUrls
            const videoUrls = info?.resultUrls ? JSON.parse(info.resultUrls) : [];
            const veoVideoUrl = videoUrls[0];

            if (!veoVideoUrl) {
                console.log('⚠️ No video URL in callback');
                return NextResponse.json(
                    { success: true, message: 'No video URL provided' },
                    { status: 200 }
                );
            }

            console.log(`✅ Video completed: ${taskId}`);
            console.log(`📺 Veo URL: ${veoVideoUrl}`);

            // Store Veo URL directly to Supabase
            await saveVideoToDatabase(taskId, veoVideoUrl);

        } else {
            console.log(`❌ Video generation failed: ${taskId}, code: ${code}, msg: ${msg}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Callback error:', error);
        // Always return 200 to avoid Kie retrying
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}

// Helper function to save video to database
async function saveVideoToDatabase(taskId: string, videoUrl: string) {
    try {
        console.log('💾 Saving Veo URL directly to Supabase...');
        const supabase = createServiceClient();

        // Retrieve metadata from Supabase (replaces in-memory Map)
        console.log(`🔍 Looking for metadata with taskId: ${taskId}`);
        const { data: metadataRow, error: metadataError } = await supabase
            .from('video_generation_metadata')
            .select('*')
            .eq('task_id', taskId)
            .single();

        let metadata = metadataRow;

        if (metadataError || !metadata) {
            console.log('⚠️ No metadata found for taskId:', taskId);
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

            metadata = recentMetadata;
            console.log(`✅ Using metadata from most recent task: ${metadata.task_id}`);
        }

        if (!metadata) {
            console.log('❌ Cannot save to database without user info');
            return;
        }

        // Store Kie URL directly (no download/upload needed)
        console.log('💾 Storing Kie URL directly...');

        // Kie URLs are valid for a long time
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year

        // Insert video record into Supabase with Kie URL
        const { error: insertError } = await supabase
            .from('videos')
            .insert({
                user_id: metadata.user_id,
                task_id: taskId,
                video_url: videoUrl, // Store Kie URL directly
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
        console.log(`🔗 Kie URL: ${videoUrl}`);

        // Clean up metadata after successful save
        await supabase
            .from('video_generation_metadata')
            .delete()
            .eq('task_id', taskId);

        console.log('🧹 Metadata cleaned up');

    } catch (error: any) {
        console.error('❌ Error saving video to database:', error);
        throw error;
    }
}

// GET endpoint removed - no longer needed with simplified architecture
// Videos are stored directly via webhook callback
