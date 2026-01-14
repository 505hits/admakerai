import { NextRequest, NextResponse } from 'next/server';
// Note: replicate import removed as we are switching to Kie.ai for this endpoint
// We keep the package in package.json for other features (script enhancer, hooks)
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting for video generation
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.videoGeneration);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many video generation requests. Please try again later' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        const { videoUrl, actorImageUrl, resolution = '720' } = await request.json();

        if (!videoUrl || !actorImageUrl) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const KIE_API_KEY = process.env.KIE_API_KEY;

        if (!KIE_API_KEY) {
            console.error('❌ KIE_API_KEY is not set');
            return NextResponse.json(
                { error: 'Server configuration error: Missing API key' },
                { status: 500 }
            );
        }

        console.log('🎬 Creating Kie.ai Kling 2.6 motion control task...');
        console.log('Video URL:', videoUrl);
        console.log('Actor Image URL:', actorImageUrl);

        const kieResponse = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${KIE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'kling-2.6/motion-control',
                input: {
                    input_urls: [actorImageUrl],
                    video_urls: [videoUrl],
                    character_orientation: 'video', // Default as per documentation
                    mode: resolution === '1080' ? '1080p' : '720p' // Map resolution to Kie format
                },
                callBackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/kie/webhook`
            })
        });

        if (!kieResponse.ok) {
            const errorText = await kieResponse.text();
            console.error('❌ Kie.ai API Error:', errorText);
            throw new Error(`Kie.ai API Error: ${kieResponse.status} ${errorText}`);
        }

        const kieData = await kieResponse.json();

        if (kieData.code !== 200) {
            console.error('❌ Kie.ai Error Response:', kieData);
            throw new Error(kieData.msg || 'Failed to create Kie task');
        }

        const taskData = kieData.data;
        console.log('✅ Kie.ai task created:', taskData.taskId);

        return NextResponse.json(
            {
                predictionId: taskData.taskId, // Mapping taskId to predictionId for frontend compatibility
                status: 'starting'
            },
            { headers: getRateLimitHeaders(rateLimitResult) }
        );

    } catch (error: any) {
        console.error('❌ Error creating video replication task:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to start video replication' },
            { status: 500 }
        );
    }
}
