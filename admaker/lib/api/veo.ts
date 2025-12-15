import { VeoGenerateRequest, VeoExtendRequest, VeoResponse } from '@/lib/types/veo';

const API_BASE_URL = 'https://api.kie.ai';
const API_KEY = process.env.NEXT_PUBLIC_VEO_API_KEY || '';

// Get the callback URL - always use the production URL from env
const getCallbackUrl = () => {
    // Always use NEXT_PUBLIC_APP_URL to ensure callbacks work
    // even when testing on preview deployments
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    return `${appUrl}/api/veo/callback`;
};

class VeoAPIClient {
    private apiKey: string;
    private maxRetries = 3;
    private retryDelay = 1000; // 1 second

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async request<T>(endpoint: string, data: any, retryCount = 0): Promise<T> {
        try {
            console.log(`🚀 Veo API Request to ${endpoint}:`, JSON.stringify(data, null, 2));

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(`📥 Veo API Response (${response.status}):`, JSON.stringify(result, null, 2));

            // Handle specific error codes
            if (result.code !== 200) {
                // Retry on rate limit (429)
                if (result.code === 429 && retryCount < this.maxRetries) {
                    console.log(`⏳ Rate limited, retrying in ${this.retryDelay}ms... (attempt ${retryCount + 1}/${this.maxRetries})`);
                    await this.sleep(this.retryDelay * (retryCount + 1));
                    return this.request<T>(endpoint, data, retryCount + 1);
                }

                // Throw error with specific message
                const errorMessages: Record<number, string> = {
                    400: '1080P is processing. Please wait 1-2 minutes.',
                    401: 'Invalid API key. Please check your credentials.',
                    402: 'Insufficient credits. Please upgrade your plan.',
                    404: 'API endpoint not found.',
                    422: `Validation error: ${result.msg}`,
                    429: 'Rate limit exceeded. Please try again later.',
                    455: 'Service is under maintenance. Please try again later.',
                    500: 'Server error. Please try again.',
                    501: 'Video generation failed. Please try again.',
                    505: 'This feature is currently disabled.',
                };

                throw new Error(errorMessages[result.code] || result.msg || 'API request failed');
            }

            return result as T;
        } catch (error: any) {
            console.error(`❌ Veo API Error:`, error);
            throw error;
        }
    }

    async generateVideo(params: VeoGenerateRequest): Promise<VeoResponse> {
        return this.request<VeoResponse>('/api/v1/veo/generate', params);
    }

    async extendVideo(params: VeoExtendRequest): Promise<VeoResponse> {
        return this.request<VeoResponse>('/api/v1/veo/extend', params);
    }

    async getVideoStatus(taskId: string): Promise<any> {
        // In localhost, callbacks don't work because Veo can't reach your machine
        // This polls our local callback storage which only gets populated if:
        // 1. You're using ngrok/tunneling, OR
        // 2. You're deployed to a public URL (Vercel, etc.)
        const response = await fetch(`/api/veo/callback?taskId=${taskId}`);
        if (!response.ok) {
            return null;
        }
        return response.json();
    }
}

export const veoClient = new VeoAPIClient(API_KEY);

// Helper function to generate video with actor image
export async function generateVideoWithDuration(
    actorImageUrl: string,
    script: string,
    sceneDescription: string,
    format: '16:9' | '9:16',
    duration: 8 | 16,
    productImageUrl?: string
): Promise<{ initialTaskId: string; extendTaskId?: string }> {

    // Build the prompt combining script and scene description
    const prompt = `${script}\n\nScene: ${sceneDescription}`;

    // Use REFERENCE_2_VIDEO mode with actor image as reference
    // If product image is provided, include it as well (max 3 images for REFERENCE mode)
    const imageUrls = productImageUrl
        ? [actorImageUrl, productImageUrl]
        : [actorImageUrl];

    // Get callback URL
    const callBackUrl = getCallbackUrl();

    console.log(`📹 Generating video with callback URL: ${callBackUrl}`);

    // Note: REFERENCE_2_VIDEO mode only supports 16:9 aspect ratio with veo3_fast
    // For 9:16 videos, we'll use FIRST_AND_LAST_FRAMES_2_VIDEO mode instead
    const useReferenceMode = format === '16:9';

    // Combine script and scene description into a natural prompt
    // Format: "Action/dialogue. Scene description."
    const combinedPrompt = `${script.trim()}. ${sceneDescription.trim()}`;

    // Generate initial 8s video
    const generateRequest: VeoGenerateRequest = {
        prompt: combinedPrompt,
        imageUrls,
        model: 'veo3_fast', // Fast model for quicker generation
        aspectRatio: format, // Use user-selected format
        generationType: useReferenceMode ? 'REFERENCE_2_VIDEO' : 'FIRST_AND_LAST_FRAMES_2_VIDEO',
        enableTranslation: true, // Auto-translate prompts to English
        watermark: 'AdMaker AI',
        callBackUrl, // Callback URL for async notification
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
            callBackUrl,
        };

        const extendResponse = await veoClient.extendVideo(extendRequest);

        if (extendResponse.code !== 200) {
            throw new Error(extendResponse.msg);
        }

        result.extendTaskId = extendResponse.data.taskId;
    }

    return result;
}
