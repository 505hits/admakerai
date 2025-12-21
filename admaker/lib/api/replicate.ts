/**
 * Replicate API Client for Wan 2.2 Animate Replace
 * Replicate videos with different actors using Replicate's wan-video/wan-2.2-animate-replace model
 */

import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

interface ReplicateVideoParams {
    videoUrl: string;
    actorImageUrl: string;
    resolution?: '480' | '720' | '1080';
}

/**
 * Create a video replication task using Replicate
 */
export async function replicateVideoWithActor({
    videoUrl,
    actorImageUrl,
    resolution = '720'
}: ReplicateVideoParams): Promise<{ predictionId: string }> {
    try {
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
        return { predictionId: prediction.id };

    } catch (error: any) {
        console.error('❌ Error creating Replicate prediction:', error);
        throw new Error(error.message || 'Failed to start video replication');
    }
}

/**
 * Get the status of a Replicate prediction
 */
export async function getPredictionStatus(predictionId: string) {
    try {
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

        return {
            predictionId: prediction.id,
            state,
            status: prediction.status,
            output: prediction.output as string | null,
            error: prediction.error,
            logs: prediction.logs,
        };

    } catch (error: any) {
        console.error('❌ Error getting prediction status:', error);
        throw error;
    }
}

/**
 * Replicate client for browser-side usage
 */
export const replicateClient = {
    replicateVideo: replicateVideoWithActor,
    getStatus: getPredictionStatus,
};
