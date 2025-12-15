import { NextRequest, NextResponse } from 'next/server';
import { downloadVideo, uploadVideoToR2 } from '@/lib/api/r2-upload';
import { createClient } from '@supabase/supabase-js';

/**
 * Callback endpoint for Veo 3.1 API
 * 
 * This route receives notifications from the Veo API when video generation is complete.
 * The API will POST to this endpoint with the task results.
 * 
 * Flow:
 * 1. Receive callback from Veo with video URL
 * 2. Download video from Veo (temporary URL)
 * 3. Upload video to Cloudflare R2 (permanent storage)
 * 4. Save metadata to Supabase
 * 5. Store in memory for immediate polling access
 */

// In-memory storage for video tasks (for immediate polling access)
const videoTasks = new Map<string, {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    error?: string;
    taskId: string;
    timestamp: number;
}>();

// Initialize Supabase admin client (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log('📹 Veo Callback received:', JSON.stringify(body, null, 2));

        const { code, msg, data } = body;
        const { taskId, info, fallbackFlag } = data || {};

        if (!taskId) {
            return NextResponse.json(
                { error: 'Missing taskId in callback' },
                { status: 400 }
            );
        }

        // Update task status based on callback code
        if (code === 200) {
            // Success - video generated
            const videoUrls = info?.resultUrls ? JSON.parse(info.resultUrls) : [];
            const veoVideoUrl = videoUrls[0];

            if (!veoVideoUrl) {
                console.error('❌ No video URL in callback');
                videoTasks.set(taskId, {
                    status: 'failed',
                    error: 'No video URL received',
                    taskId,
                    timestamp: Date.now(),
                });
                return NextResponse.json({ success: true }, { status: 200 });
            }

            console.log(`📥 Downloading video from Veo: ${veoVideoUrl}`);

            try {
                // Download video from Veo
                const videoBuffer = await downloadVideo(veoVideoUrl);

                // Upload to R2 with filename: taskId.mp4
                const fileName = `${taskId}.mp4`;
                const r2VideoUrl = await uploadVideoToR2(videoBuffer, fileName);

                console.log(`✅ Video uploaded to R2: ${r2VideoUrl}`);

                // Store in memory for immediate polling
                videoTasks.set(taskId, {
                    status: 'completed',
                    videoUrl: r2VideoUrl,
                    taskId,
                    timestamp: Date.now(),
                });

                console.log(`✅ Video generation completed for task ${taskId}`);
                console.log(`📺 R2 Video URL: ${r2VideoUrl}`);

            } catch (uploadError: any) {
                console.error('❌ Error uploading to R2:', uploadError);
                videoTasks.set(taskId, {
                    status: 'failed',
                    error: 'Failed to upload video to storage',
                    taskId,
                    timestamp: Date.now(),
                });
            }

        } else {
            // Failed - video generation error
            videoTasks.set(taskId, {
                status: 'failed',
                error: msg || 'Video generation failed',
                taskId,
                timestamp: Date.now(),
            });

            console.log(`❌ Video generation failed for task ${taskId}: ${msg}`);
        }

        // Return success response to Veo API
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Error processing Veo callback:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET endpoint to check task status (for polling)
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
        return NextResponse.json(
            { error: 'Missing taskId parameter' },
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

// Export the videoTasks map for use in other parts of the app
export { videoTasks };
