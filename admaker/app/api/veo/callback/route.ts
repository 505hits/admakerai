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

        const contentType = request.headers.get('content-type') || '';
        console.log('Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('Raw body:', bodyText.substring(0, 200)); // Log first 200 chars

        // Check if body is a URL (plain text)
        if (bodyText.startsWith('http://') || bodyText.startsWith('https://')) {
            console.log('📹 Received plain URL callback');

            // Extract taskId from URL or use a default
            // For now, we can't process this without more info
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

            // Return success anyway to avoid Veo retrying
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
