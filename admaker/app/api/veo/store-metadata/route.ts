import { NextRequest, NextResponse } from 'next/server';
import { taskMetadata } from '../webhook/route';
import { createServiceClient } from '@/lib/supabase/service';

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

        // Store metadata in the shared Map (for webhook callback)
        taskMetadata.set(taskId, {
            userId,
            actorName: actorName || 'Unknown',
            actorImageUrl: actorImageUrl || '',
            script: script || '',
            sceneDescription: sceneDescription || '',
            duration: duration || 8,
            format: format || '16:9'
        });

        // Initialize task in Supabase with pending status
        // This persists across serverless function invocations
        const supabase = createServiceClient();
        const { error: dbError } = await supabase
            .from('video_tasks')
            .insert({
                task_id: taskId,
                user_id: userId, // CRITICAL: Must include user_id
                status: 'pending',
                created_at: new Date().toISOString()
            });

        if (dbError) {
            console.error('❌ Error initializing task in Supabase:', dbError);
            // Continue anyway - task will still work via metadata
        } else {
            console.log(`✅ Metadata stored for taskId: ${taskId}`);
            console.log(`📊 Task initialized in Supabase with pending status`);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Error storing metadata:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
