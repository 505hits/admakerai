import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const predictionId = searchParams.get('predictionId');

        if (!predictionId) {
            return NextResponse.json(
                { error: 'Missing predictionId parameter' },
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

        const prediction = await replicate.predictions.get(predictionId);

        // Map Replicate status to our format
        let state: 'waiting' | 'success' | 'fail';
        if (prediction.status === 'succeeded') {
            state = 'success';
        } else if (prediction.status === 'failed' || prediction.status === 'canceled') {
            state = 'fail';
        } else {
            // starting, processing
            state = 'waiting';
        }

        return NextResponse.json({
            predictionId: prediction.id,
            state,
            status: prediction.status,
            output: prediction.output,
            error: prediction.error,
            videoUrl: prediction.status === 'succeeded' ? prediction.output : null,
        });

    } catch (error: any) {
        console.error('❌ Error getting prediction status:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get prediction status' },
            { status: 500 }
        );
    }
}
