import { NextRequest, NextResponse } from 'next/server';

const KIE_API_KEY = process.env.KIE_API_KEY;
const KIE_API_URL = 'https://api.kie.ai/api/v1/jobs';

export async function POST(request: NextRequest) {
    try {
        const { videoUrl, actorImageUrl, resolution = '480p' } = await request.json();

        if (!videoUrl || !actorImageUrl) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        if (!KIE_API_KEY) {
            console.error('❌ KIE_API_KEY is not set');
            return NextResponse.json(
                { error: 'Server configuration error: Missing API key' },
                { status: 500 }
            );
        }

        console.log('🎬 Creating video replication task...');
        console.log('Video URL:', videoUrl);
        console.log('Actor Image URL:', actorImageUrl);

        const response = await fetch(`${KIE_API_URL}/createTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KIE_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'wan/2-2-animate-replace',
                input: {
                    video_url: videoUrl,
                    image_url: actorImageUrl,
                    resolution: resolution,
                },
                callBackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/kie/webhook`,
            }),
        });

        const responseText = await response.text();
        console.log('Kie.ai response:', responseText);

        if (!response.ok) {
            console.error('❌ Kie API error:', response.status, responseText);
            return NextResponse.json(
                { error: `Kie API error: ${response.status} - ${responseText}` },
                { status: response.status }
            );
        }

        const data = JSON.parse(responseText);

        if (data.code !== 200) {
            return NextResponse.json(
                { error: data.msg || 'Failed to create replication task' },
                { status: 400 }
            );
        }

        console.log('✅ Replication task created:', data.data.taskId);
        return NextResponse.json({ taskId: data.data.taskId });

    } catch (error: any) {
        console.error('❌ Error creating replication task:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to start video replication' },
            { status: 500 }
        );
    }
}
