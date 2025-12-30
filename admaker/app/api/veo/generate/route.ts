import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { generateVideoWithDuration } from '@/lib/api/veo';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
    // Rate limiting for video generation
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

    try {
        const body = await request.json();
        const {
            actorImageUrl,
            script,
            sceneDescription,
            format,
            duration,
            productImageUrl,
            virtualTryOnImageUrl,
            accent,
            userId
        } = body;

        // Validate required fields
        if (!actorImageUrl || !script || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields: actorImageUrl, script, userId' },
                { status: 400 }
            );
        }

        // Verify user authentication
        const supabase = createServiceClient();
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single();

        if (profileError || !profile) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Generate video using server-side function
        const result = await generateVideoWithDuration(
            actorImageUrl,
            script,
            sceneDescription,
            format,
            duration,
            productImageUrl,
            virtualTryOnImageUrl,
            accent
        );

        return NextResponse.json({ taskId: result.taskId });
    } catch (error: any) {
        console.error('❌ Video generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to start video generation' },
            { status: 500 }
        );
    }
}
