import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Callback endpoint for Veo API
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
        console.log('📹 Veo Callback POST received - Build: 2025-12-16-14:38');
        console.log('🔄 SIMPLIFIED ARCHITECTURE - Direct Kie URL storage');

        const contentType = request.headers.get('content-type') || '';
        console.log('Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('Raw body length:', bodyText.length);
        console.log('Raw body preview:', bodyText.substring(0, 200));

        // Check if body is a URL (plain text) - Kie sends this format
        const trimmedBody = bodyText.trim();

        // Handle plain URL (with or without quotes)
        const urlMatch = trimmedBody.match(/https?:\/\/[^\s"'\]]+/);
        if (urlMatch) {
            const veoVideoUrl = urlMatch[0];
            console.log('📹 Received URL callback (extracted from text)');
            console.log(`📺 Veo URL: ${veoVideoUrl}`);

            // Extract taskId from URL - Kie uses UUID format with dashes
            // Example: /r/45b73df1-b7d6-41d5-98fa-6455de802e58_watermarked.mp4
            // Or: /r/c3a0d9bd-6ba9-4055-a8cc-a4d2288c4244_watermarked.mp4
            const taskIdMatch = veoVideoUrl.match(/\/([a-f0-9-]{36})/);
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
        let metadata = taskMetadata.get(taskId);

        if (!metadata) {
            console.log('⚠️ No metadata found for taskId:', taskId);
            console.log('🔄 Trying fallback: using most recent task metadata...');

            // Fallback: use the most recent task metadata
            const allTaskIds = Array.from(taskMetadata.keys());
            console.log(`Found ${allTaskIds.length} stored task IDs:`, allTaskIds);

            if (allTaskIds.length > 0) {
                const recentTaskId = allTaskIds[allTaskIds.length - 1];
                metadata = taskMetadata.get(recentTaskId);
                console.log(`✅ Using metadata from most recent taskId: ${recentTaskId}`);
            } else {
                console.log('❌ No stored metadata available');
                return;
            }
        }

        if (!metadata) {
            console.log('❌ Cannot save to database without user info');
            return;
        }

        // Calculate expiration date (60 days from now - Kie URL expiration)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 60);

        const { error: dbError } = await supabase
            .from('videos')
            .insert({
                user_id: metadata.userId,
                task_id: taskId,
                video_url: videoUrl, // Store Kie URL directly!
                actor_name: metadata.actorName,
                actor_image_url: metadata.actorImageUrl,
                script: metadata.script,
                scene_description: metadata.sceneDescription,
                duration: metadata.duration,
                format: metadata.format,
                status: 'completed',
                expires_at: expiresAt.toISOString()
            });

        if (dbError) {
            console.error('❌ Error saving to Supabase:', dbError);
        } else {
            console.log('✅ Veo URL saved to Supabase (expires in 60 days)');
            // Clean up metadata
            taskMetadata.delete(taskId);
        }
    } catch (dbErr: any) {
        console.error('❌ Database error:', dbErr.message);
    }
}

// GET endpoint removed - no longer needed with simplified architecture
// Videos are stored directly via webhook callback
