import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
    try {
        const { videoUrl, actorImageUrl, resolution = '720' } = await request.json();

        if (!videoUrl || !actorImageUrl) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        if (!process.env.REPLICATE_API_TOKEN) {
            console.error('❌ REPLICATE_API_TOKEN is not set');
            return NextResponse.json(
                { error: 'Server configuration error: Missing API key' },
                { status: 500 }
            );
        }

        console.log('🎬 Creating Replicate video replication task...');
        console.log('Video URL:', videoUrl);
        console.log('Actor Image URL:', actorImageUrl);
        console.log('Resolution:', resolution);

        const prediction = await replicate.predictions.create({
            version: "wan-video/wan-2.2-animate-replace",
            input: {
                video: videoUrl,
                character_image: actorImageUrl,
                resolution: resolution,
                go_fast: true,
                merge_audio: true,
                refert_num: 1,
                frames_per_second: 24,
            },
        });

        console.log('✅ Replicate prediction created:', prediction.id);
        return NextResponse.json({
            predictionId: prediction.id,
            status: prediction.status
        });

    } catch (error: any) {
        console.error('❌ Error creating Replicate prediction:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to start video replication' },
            { status: 500 }
        );
    }
}
