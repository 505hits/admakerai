import { NextRequest, NextResponse } from 'next/server';

/**
 * Simplified callback endpoint for testing
 */

// In-memory storage for video tasks
const videoTasks = new Map<string, {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    error?: string;
    taskId: string;
    timestamp: number;
}>();

export async function POST(request: NextRequest) {
    try {
        console.log('📹 Veo Callback POST received');

        const bodyText = await request.text();
        console.log('Raw body:', bodyText);

        let body;
        try {
            body = JSON.parse(bodyText);
        } catch (parseError) {
            console.error('❌ Failed to parse JSON:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON' },
                { status: 400 }
            );
        }

        console.log('📹 Parsed callback:', JSON.stringify(body, null, 2));

        const { code, msg, data } = body;
        const { taskId, info } = data || {};

        if (!taskId) {
            return NextResponse.json(
                { error: 'Missing taskId' },
                { status: 400 }
            );
        }

        if (code === 200) {
            const videoUrls = info?.resultUrls ? JSON.parse(info.resultUrls) : [];
            const videoUrl = videoUrls[0];

            videoTasks.set(taskId, {
                status: 'completed',
                videoUrl,
                taskId,
                timestamp: Date.now(),
            });

            console.log(`✅ Video completed: ${taskId}`);
            console.log(`📺 URL: ${videoUrl}`);
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
        return NextResponse.json(
            { error: 'Internal error' },
            { status: 500 }
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
