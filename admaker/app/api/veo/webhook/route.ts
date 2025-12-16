import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

/**
 * Callback endpoint for Veo API
 * Handles video completion and saves to Supabase
 */

// Force dynamic rendering - critical for webhooks
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds max

// In-memory storage for video tasks (for polling)
export const videoTasks = new Map<string, {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    error?: string;
    taskId: string;
    timestamp: number;
}>();

// In-memory storage for task metadata (user_id, actor info, etc.)
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
        // FORCE REBUILD - Last updated: 2025-12-16 12:53:00
        console.log('📹 Veo Callback POST received - Build:', Date.now());
        console.log('🔄 FRESH BUILD - Timestamp:', new Date().toISOString());

        const contentType = request.headers.get('content-type') || '';
        console.log('Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('Raw body:', bodyText.substring(0, 200));
        console.log('Body length:', bodyText.length);
        console.log('Body trimmed:', bodyText.trim().substring(0, 200));

        // Check if body is a URL (plain text) - SIMPLIFIED: Store Veo URL directly
        const trimmedBody = bodyText.trim();
        if (trimmedBody.startsWith('http://') || trimmedBody.startsWith('https://')) {
            console.log('📹 Received plain URL callback');
            const veoVideoUrl = trimmedBody;
            console.log(`📺 Veo URL (plain text): ${veoVideoUrl}`);

            // Extract taskId from URL - Kie uses UUID format with dashes
            // Example: /r/45b73df1-b7d6-41d5-98fa-6455de802e58_watermarked.mp4
            const taskIdMatch = veoVideoUrl.match(/\/([a-f0-9-]{36})/);
            const taskId = taskIdMatch ? taskIdMatch[1] : null;

            if (!taskId) {
                console.error('❌ Could not extract taskId from URL:', veoVideoUrl);
                return NextResponse.json(
                    { success: true, message: 'Could not extract taskId from URL' },
                    { status: 200 }
                );
            }

            console.log(`🔍 Extracted taskId: ${taskId}`);

            // Store Veo URL directly to Supabase (no download/upload needed!)
            try {
                console.log('💾 Saving Veo URL directly to Supabase...');
                const supabase = createServiceClient();
                const metadata = taskMetadata.get(taskId);

                if (metadata) {
                    // Calculate expiration date (60 days from now)
                    const expiresAt = new Date();
                    expiresAt.setDate(expiresAt.getDate() + 60);

                    const { error: dbError } = await supabase
                        .from('videos')
                        .insert({
                            user_id: metadata.userId,
                            task_id: taskId,
                            video_url: veoVideoUrl, // Store Veo URL directly!
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
                        taskMetadata.delete(taskId);
                    }
                } else {
                    console.log('⚠️ No metadata found - cannot save to database');
                }
            } catch (dbErr: any) {
                console.error('❌ Supabase error:', dbErr.message);
            }

            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Try to parse as JSON only if it's not a plain URL
        let body;
        try {
            body = JSON.parse(trimmedBody);
        } catch (parseError) {
            console.error('❌ Failed to parse as JSON:', parseError);
            console.log('Body was not a URL and not valid JSON:', trimmedBody.substring(0, 100));

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
            const videoUrls = info?.resultUrls ? JSON.parse(info.resultUrls) : [];
            const veoVideoUrl = videoUrls[0];

            if (!veoVideoUrl) {
                console.log('⚠️ No video URL in callback');
                videoTasks.set(taskId, {
                    status: 'failed',
                    error: 'No video URL provided',
                    taskId,
                    timestamp: Date.now(),
                });
                return NextResponse.json({ success: true }, { status: 200 });
            }

            console.log(`✅ Video completed: ${taskId}`);
            console.log(`📺 Veo URL: ${veoVideoUrl}`);

            // Store Veo URL directly to Supabase (simplified architecture!)
            try {
                console.log('💾 Saving Veo URL directly to Supabase...');
                const supabase = createServiceClient();
                const metadata = taskMetadata.get(taskId);

                if (metadata) {
                    // Calculate expiration date (60 days from now)
                    const expiresAt = new Date();
                    expiresAt.setDate(expiresAt.getDate() + 60);

                    const { error: dbError } = await supabase
                        .from('videos')
                        .insert({
                            user_id: metadata.userId,
                            task_id: taskId,
                            video_url: veoVideoUrl, // Store Veo URL directly!
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
                        taskMetadata.delete(taskId);
                    }
                } else {
                    console.log('⚠️ No metadata found - storing in memory only');
                }
            } catch (dbErr: any) {
                console.error('❌ Supabase error:', dbErr.message);
            }

            // Update task status in Supabase
            try {
                const supabase = createServiceClient();
                const { error: updateError } = await supabase
                    .from('video_tasks')
                    .update({
                        status: 'completed',
                        video_url: veoVideoUrl
                    })
                    .eq('task_id', taskId);

                if (updateError) {
                    console.error('❌ Error updating task status in Supabase:', updateError);
                } else {
                    console.log('✅ Task status updated in Supabase');
                }
            } catch (updateErr: any) {
                console.error('❌ Task update error:', updateErr.message);
            }

        } else {
            // Update task status to failed in Supabase
            try {
                const supabase = createServiceClient();
                const { error: updateError } = await supabase
                    .from('video_tasks')
                    .update({
                        status: 'failed',
                        error: msg || 'Failed'
                    })
                    .eq('task_id', taskId);

                if (updateError) {
                    console.error('❌ Error updating failed task in Supabase:', updateError);
                }
            } catch (updateErr: any) {
                console.error('❌ Failed task update error:', updateErr.message);
            }

            console.log(`❌ Video failed: ${taskId}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Callback error:', error);
        // Always return 200 to avoid Veo retrying
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
        return NextResponse.json(
            { error: 'Missing taskId' },
            { status: 400 }
        );
    }

    // Query Supabase instead of in-memory Map
    const supabase = createServiceClient();
    const { data: task, error } = await supabase
        .from('video_tasks')
        .select('*')
        .eq('task_id', taskId)
        .single();

    if (error || !task) {
        return NextResponse.json(
            { error: 'Task not found' },
            { status: 404 }
        );
    }

    // Return task in the expected format
    return NextResponse.json({
        status: task.status,
        videoUrl: task.video_url,
        error: task.error,
        taskId: task.task_id,
        timestamp: new Date(task.created_at).getTime()
    }, { status: 200 });
}
