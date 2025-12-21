/**
 * Kie.ai 2-2-animate-replace API Client
 * Replicate videos with different actors
 */

const KIE_API_KEY = process.env.KIE_API_KEY || '';
const KIE_API_URL = 'https://api.kie.ai/api/v1/jobs';

interface ReplicateVideoParams {
    videoUrl: string;
    actorImageUrl: string;
    resolution?: '480p' | '580p' | '720p';
}

interface KieTaskResponse {
    code: number;
    msg: string;
    data: {
        taskId: string;
    };
}

interface KieStatusResponse {
    code: number;
    msg: string;
    data: {
        taskId: string;
        model: string;
        state: 'waiting' | 'success' | 'fail';
        param: string;
        resultJson: string | null;
        failCode: string | null;
        failMsg: string | null;
        costTime: number | null;
        completeTime: number | null;
        createTime: number;
    };
}

/**
 * Create a video replication task
 */
export async function replicateVideoWithActor({
    videoUrl,
    actorImageUrl,
    resolution = '720p'
}: ReplicateVideoParams): Promise<{ taskId: string }> {
    try {
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

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Kie API error:', errorText);
            throw new Error(`Kie API error: ${response.status} ${errorText}`);
        }

        const data: KieTaskResponse = await response.json();

        if (data.code !== 200) {
            throw new Error(data.msg || 'Failed to create replication task');
        }

        console.log('✅ Replication task created:', data.data.taskId);
        return { taskId: data.data.taskId };

    } catch (error: any) {
        console.error('❌ Error creating replication task:', error);
        throw new Error(error.message || 'Failed to start video replication');
    }
}

/**
 * Query task status
 */
export async function getTaskStatus(taskId: string): Promise<KieStatusResponse['data']> {
    try {
        const response = await fetch(`${KIE_API_URL}/recordInfo?taskId=${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${KIE_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get task status: ${response.status}`);
        }

        const data: KieStatusResponse = await response.json();

        if (data.code !== 200) {
            throw new Error(data.msg || 'Failed to get task status');
        }

        return data.data;

    } catch (error: any) {
        console.error('❌ Error getting task status:', error);
        throw error;
    }
}

/**
 * Kie.ai client for browser-side usage
 */
export const kieClient = {
    replicateVideo: replicateVideoWithActor,
    getStatus: getTaskStatus,
};
