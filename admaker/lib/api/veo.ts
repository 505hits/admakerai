import { VeoGenerateRequest, VeoResponse } from '@/lib/types/veo';

const API_BASE_URL = 'https://api.kie.ai';
const API_KEY = process.env.NEXT_PUBLIC_VEO_API_KEY || '';

// Get the callback URL - always use the production URL from env
const getCallbackUrl = () => {
    // Always use NEXT_PUBLIC_APP_URL to ensure callbacks work
    // even when testing on preview deployments
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    return `${appUrl}/api/veo/webhook`;
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

    // Note: Kie API doesn't document a /extend endpoint
    // We only support 8s video generation
}

export const veoClient = new VeoAPIClient(API_KEY);

// Helper function to generate video with actor image
// Note: Only 8s videos are supported (Kie API doesn't document /extend endpoint)
export async function generateVideoWithDuration(
    actorImageUrl: string,
    script: string,
    sceneDescription: string,
    format: '16:9' | '9:16',
    duration: 8 | 16, // Keep parameter for compatibility, but only 8s is used
    productImageUrl?: string,
    virtualTryOnImageUrl?: string,
    accent?: string
): Promise<{ taskId: string }> {

    // Get callback URL
    const callBackUrl = getCallbackUrl();

    console.log(`📹 Generating ${duration}s video with callback URL: ${callBackUrl}`);

    if (duration === 16) {
        console.warn('⚠️ 16s videos not supported by Kie API - generating 8s video instead');
    }

    // Build image URLs array
    // REFERENCE_2_VIDEO: 1-3 images (actor + optional product + optional virtual try-on)
    // FIRST_AND_LAST_FRAMES_2_VIDEO: 1-2 images
    const imageUrls = [actorImageUrl];
    if (productImageUrl) imageUrls.push(productImageUrl);
    if (virtualTryOnImageUrl) imageUrls.push(virtualTryOnImageUrl);

    // Mode selection based on aspect ratio
    // REFERENCE_2_VIDEO: Only supports 16:9 with veo3_fast
    // FIRST_AND_LAST_FRAMES_2_VIDEO: Supports both 16:9 and 9:16
    const useReferenceMode = format === '16:9';

    // Build enhanced prompt with accent and product handling
    let enhancedPrompt = sceneDescription.trim() || '';

    // Add accent if specified
    if (accent && accent.trim()) {
        enhancedPrompt += enhancedPrompt ? `. The person speaks with a ${accent} accent` : `The person speaks with a ${accent} accent`;
    }

    // Add product handling if product image provided
    // This prevents close-up shots of the product alone and ensures focus stays on the influencer
    if (productImageUrl) {
        const productInstruction = '. The influencer holds the product in their hand while presenting it. Always keep the camera focused on the influencer\'s face and body - never show close-up shots or full-screen views of the product alone. The product should only appear as a prop in the influencer\'s hand';
        enhancedPrompt += productInstruction;
    }

    // Create final prompt combining enhanced description and script
    const naturalPrompt = enhancedPrompt
        ? `${enhancedPrompt}. ${script.trim()}`
        : script.trim();

    // Generate 8s video
    const generateRequest: VeoGenerateRequest = {
        prompt: naturalPrompt,
        imageUrls,
        model: 'veo3_fast', // Fast and cost-effective
        aspectRatio: format,
        generationType: useReferenceMode ? 'REFERENCE_2_VIDEO' : 'FIRST_AND_LAST_FRAMES_2_VIDEO',
        enableTranslation: true, // Auto-translate to English
        callBackUrl,
    };

    console.log('📤 Sending request to Kie API:', {
        mode: generateRequest.generationType,
        format: generateRequest.aspectRatio,
        imageCount: imageUrls.length,
    });

    const response = await veoClient.generateVideo(generateRequest);

    if (response.code !== 200) {
        throw new Error(response.msg);
    }

    console.log('✅ Video generation started, taskId:', response.data.taskId);

    return {
        taskId: response.data.taskId,
    };
}
