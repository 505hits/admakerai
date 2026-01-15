import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';

/**
 * Store metadata for a video generation task in Supabase
 * This is called before generating a video to associate user info with the task
 */
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.api);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }
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

        // Verify user authentication
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (userId !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized: User ID mismatch' },
                { status: 403 }
            );
        }

        // Store metadata in Supabase (replaces in-memory Map)
        // We can use the same authenticated client if RLS allows insert
        // OR rely on service client but we are now safe because we verified userId === user.id
        const serviceClient = createServiceClient();
        const { error } = await serviceClient
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
