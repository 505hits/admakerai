import { NextRequest, NextResponse } from 'next/server';

/**
 * Callback endpoint for Veo 3.1 API
 * 
 * This route receives notifications from the Veo API when video generation is complete.
 * The API will POST to this endpoint with the task results.
 */

// In-memory storage for video tasks (in production, use a database)
const videoTasks = new Map<string, {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    error?: string;
    taskId: string;
    timestamp: number;
}>();

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
            const videoUrl = videoUrls[0] || null;

            videoTasks.set(taskId, {
                status: 'completed',
                videoUrl,
                taskId,
                timestamp: Date.now(),
            });

            console.log(`✅ Video generation completed for task ${taskId}`);
            console.log(`📺 Video URL: ${videoUrl}`);

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
