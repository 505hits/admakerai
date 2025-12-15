import { NextRequest, NextResponse } from 'next/server';
import { downloadVideo, uploadVideoToR2 } from '@/lib/api/r2-upload';
import { createClient } from '@/lib/supabase/server';

/**
 * Callback endpoint for Veo API
 * Handles video completion, downloads from Veo, uploads to R2, and saves to Supabase
 */

// In-memory storage for video tasks (for polling)
const videoTasks = new Map<string, {
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
        console.log('📹 Veo Callback POST received');

        const contentType = request.headers.get('content-type') || '';
        console.log('Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('Raw body:', bodyText.substring(0, 200));

        // Check if body is a URL (plain text)
        if (bodyText.startsWith('http://') || bodyText.startsWith('https://')) {
            console.log('📹 Received plain URL callback');
            console.log('⚠️ Plain URL format not yet supported:', bodyText);

            return NextResponse.json({
                success: true,
                message: 'URL received but format not supported yet'
            }, { status: 200 });
        }

        // Try to parse as JSON
        let body;
        try {
            body = JSON.parse(bodyText);
        } catch (parseError) {
            console.error('❌ Failed to parse as JSON:', parseError);
            console.log('Body was:', bodyText);

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

            // Download video from Veo
            console.log('📥 Downloading video from Veo...');
            const videoBuffer = await downloadVideo(veoVideoUrl);

            // Upload to R2
            console.log('☁️ Uploading to Cloudflare R2...');
            const fileName = `${taskId}.mp4`;
            const r2VideoUrl = await uploadVideoToR2(videoBuffer, fileName);

            console.log(`✅ Video uploaded to R2: ${r2VideoUrl}`);

            // Save to Supabase
            console.log('💾 Saving metadata to Supabase...');
            const supabase = await createClient();

            // Get metadata from the original request
            const metadata = taskMetadata.get(taskId);

            if (metadata) {
                const { error: dbError } = await supabase
                    .from('videos')
                    .insert({
                        user_id: metadata.userId,
                        task_id: taskId,
                        video_url: r2VideoUrl,
                        actor_name: metadata.actorName,
                        actor_image_url: metadata.actorImageUrl,
                        script: metadata.script,
                        scene_description: metadata.sceneDescription,
                        duration: metadata.duration,
                        format: metadata.format,
                        status: 'completed'
                    });

                if (dbError) {
                    console.error('❌ Error saving to Supabase:', dbError);
                    // Continue anyway - video is in R2
                } else {
                    console.log('✅ Metadata saved to Supabase');
                    // Clean up metadata after successful save
                    taskMetadata.delete(taskId);
                }
            } else {
                console.log('⚠️ No metadata found for taskId, skipping Supabase save');
            }

            // Update in-memory cache
            videoTasks.set(taskId, {
                status: 'completed',
                videoUrl: r2VideoUrl,
                taskId,
                timestamp: Date.now(),
            });

        } else {
            videoTasks.set(taskId, {
                status: 'failed',
                error: msg || 'Failed',
                taskId,
                timestamp: Date.now(),
            });

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

    const task = videoTasks.get(taskId);

    if (!task) {
        return NextResponse.json(
            { error: 'Task not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(task, { status: 200 });
}
