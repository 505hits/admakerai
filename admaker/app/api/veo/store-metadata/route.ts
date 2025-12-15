import { NextRequest, NextResponse } from 'next/server';
import { taskMetadata } from '../callback/route';

/**
 * Store metadata for a video generation task
 * This is called before generating a video to associate user info with the task
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            taskId,
            userId,
            actorName,
            actorImageUrl,
            script,
            sceneDescription,
            duration,
            format
        } = body;

        if (!taskId || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields: taskId and userId' },
                { status: 400 }
            );
        }

        // Store metadata in the shared Map
        taskMetadata.set(taskId, {
            userId,
            actorName: actorName || 'Unknown',
            actorImageUrl: actorImageUrl || '',
            script: script || '',
            sceneDescription: sceneDescription || '',
            duration: duration || 8,
            format: format || '16:9'
        });

        console.log(`✅ Metadata stored for taskId: ${taskId}`);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Error storing metadata:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
