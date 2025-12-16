import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

/**
 * Store metadata for a video generation task in Supabase
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

        // Store metadata in Supabase (replaces in-memory Map)
        const supabase = createServiceClient();
        const { error } = await supabase
            .from('video_generation_metadata')
            .upsert({
                task_id: taskId,
                user_id: userId,
                actor_name: actorName || 'Unknown',
                actor_image_url: actorImageUrl || '',
                script: script || '',
                scene_description: sceneDescription || '',
                duration: duration || 8,
                format: format || '16:9'
            });

        if (error) {
            console.error('❌ Error storing metadata in Supabase:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        console.log(`✅ Metadata stored in Supabase for taskId: ${taskId}`);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Error storing metadata:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
