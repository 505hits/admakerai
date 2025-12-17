/**
 * Kie Nano Banana Pro API Client
 * For AI actor image generation
 */

const KIE_API_URL = 'https://api.kie.ai/api/v1/jobs';

export interface NanoBananaInput {
    prompt: string;
    image_input?: string[]; // Array of image URLs (up to 8)
    aspect_ratio?: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9' | 'auto';
    resolution?: '1K' | '2K' | '4K';
    output_format?: 'png' | 'jpg';
}

export interface CreateTaskResponse {
    code: number;
    msg: string;
    data: {
        taskId: string;
    };
}

export interface TaskStatusResponse {
    code: number;
    msg: string;
    data: {
        taskId: string;
        model: string;
        state: 'waiting' | 'success' | 'fail';
        param: string; // JSON string
        resultJson: string | null; // JSON string with resultUrls array
        failCode: string | null;
        failMsg: string | null;
        costTime: number | null;
        completeTime: number | null;
        createTime: number;
    };
}

/**
 * Create a Nano Banana image generation task
 */
export async function createNanoBananaTask(
    input: NanoBananaInput,
    apiKey: string,
    callBackUrl?: string
): Promise<CreateTaskResponse> {
    try {
        const requestBody = {
            model: 'nano-banana-pro',
            input: {
                prompt: input.prompt,
                image_input: input.image_input || [],
                aspect_ratio: input.aspect_ratio || '1:1',
                resolution: input.resolution || '1K',
                output_format: input.output_format || 'png'
            },
            ...(callBackUrl && { callBackUrl })
        };

        console.log('🍌 Creating Nano Banana task:', JSON.stringify(requestBody, null, 2));

        const response = await fetch(`${KIE_API_URL}/createTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Kie API error (${response.status}): ${errorText}`);
        }

        const data: CreateTaskResponse = await response.json();
        console.log('✅ Task created:', data.data.taskId);
        return data;

    } catch (error: any) {
        console.error('❌ Error creating Nano Banana task:', error);
        throw error;
    }
}

/**
 * Check the status of a Nano Banana task
 */
export async function checkNanoBananaTaskStatus(
    taskId: string,
    apiKey: string
): Promise<TaskStatusResponse> {
    try {
        console.log(`🔍 Checking task status: ${taskId}`);

        const response = await fetch(`${KIE_API_URL}/recordInfo?taskId=${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Kie API error (${response.status}): ${errorText}`);
        }

        const data: TaskStatusResponse = await response.json();
        console.log(`📊 Task status: ${data.data.state}`);
        return data;

    } catch (error: any) {
        console.error('❌ Error checking task status:', error);
        throw error;
    }
}

/**
 * Extract image URL from task result
 */
export function extractImageUrl(taskStatus: TaskStatusResponse): string | null {
    try {
        if (taskStatus.data.state !== 'success' || !taskStatus.data.resultJson) {
            return null;
        }

        const result = JSON.parse(taskStatus.data.resultJson);
        const imageUrls = result.resultUrls || [];
        return imageUrls[0] || null;

    } catch (error) {
        console.error('❌ Error extracting image URL:', error);
        return null;
    }
}
