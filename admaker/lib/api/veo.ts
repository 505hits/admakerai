import { VeoGenerateRequest, VeoExtendRequest, VeoResponse } from '@/lib/types/veo';

const API_BASE_URL = 'https://api.kie.ai';
const API_KEY = process.env.NEXT_PUBLIC_VEO_API_KEY || '';

class VeoAPIClient {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private async request<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || 'API request failed');
        }

        return response.json();
    }

    async generateVideo(params: VeoGenerateRequest): Promise<VeoResponse> {
        return this.request<VeoResponse>('/api/v1/veo/generate', params);
    }

    async extendVideo(params: VeoExtendRequest): Promise<VeoResponse> {
        return this.request<VeoResponse>('/api/v1/veo/extend', params);
    }

    async getVideoStatus(taskId: string): Promise<any> {
        // Implement polling endpoint if available
        // For now, we'll rely on callbacks
        throw new Error('Not implemented - use callbacks');
    }
}

export const veoClient = new VeoAPIClient(API_KEY);

// Helper function to generate video with optional extension
export async function generateVideoWithDuration(
    actorImageUrl: string,
    script: string,
    sceneDescription: string,
    format: '16:9' | '9:16',
    duration: 8 | 16,
    productImageUrl?: string
): Promise<{ initialTaskId: string; extendTaskId?: string }> {

    const imageUrls = productImageUrl
        ? [actorImageUrl, productImageUrl]
        : [actorImageUrl];

    const prompt = `${script}\n\nScene: ${sceneDescription}`;

    // Generate initial 8s video
    const generateRequest: VeoGenerateRequest = {
        prompt,
        imageUrls,
        model: 'veo3_fast',
        aspectRatio: format,
        generationType: 'FIRST_AND_LAST_FRAMES_2_VIDEO',
        enableTranslation: true,
        watermark: 'AdMaker AI',
    };

    const initialResponse = await veoClient.generateVideo(generateRequest);

    if (initialResponse.code !== 200) {
        throw new Error(initialResponse.msg);
    }

    const result = {
        initialTaskId: initialResponse.data.taskId,
        extendTaskId: undefined as string | undefined,
    };

    // If 16s requested, extend the video
    if (duration === 16) {
        const extendRequest: VeoExtendRequest = {
            taskId: initialResponse.data.taskId,
            prompt: `Continue the scene: ${sceneDescription}`,
            watermark: 'AdMaker AI',
        };

        const extendResponse = await veoClient.extendVideo(extendRequest);

        if (extendResponse.code !== 200) {
            throw new Error(extendResponse.msg);
        }

        result.extendTaskId = extendResponse.data.taskId;
    }

    return result;
}
