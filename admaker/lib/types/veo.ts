// Veo 3.1 API Types

export interface VeoGenerateRequest {
    prompt: string;
    imageUrls: string[];
    model: 'veo3' | 'veo3_fast';
    aspectRatio: '16:9' | '9:16' | 'Auto';
    generationType: 'TEXT_2_VIDEO' | 'FIRST_AND_LAST_FRAMES_2_VIDEO' | 'REFERENCE_2_VIDEO';
    seeds?: number;
    callBackUrl?: string;
    watermark?: string;
    enableTranslation?: boolean;
}

export interface VeoExtendRequest {
    taskId: string;
    prompt: string;
    seeds?: number;
    watermark?: string;
    callBackUrl?: string;
}

export interface VeoResponse {
    code: number;
    msg: string;
    data: {
        taskId: string;
    };
}

export interface VeoCallbackData {
    code: number;
    msg: string;
    data: {
        taskId: string;
        info: {
            resultUrls: string;
            originUrls?: string;
            resolution: string;
        };
        fallbackFlag?: boolean;
    };
}

export interface VeoTaskStatus {
    taskId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    error?: string;
}

// AI Actor Types
export interface AIActor {
    id: string;
    name: string;
    category: 'Business' | 'Casual' | 'Lifestyle' | 'Product Demo' | 'Fitness' | 'Beauty' | 'Custom';
    imageUrl: string;
    thumbnailUrl: string;
    sceneDescription: string;
    tags: string[];
    gender: 'male' | 'female' | 'neutral';
    ageRange: string;
    style: string;
}

// Video Generation Types
export interface VideoGenerationParams {
    actorId: string;
    actorImageUrl: string;
    script: string;
    sceneDescription: string;
    productImageUrl?: string;
    format: '16:9' | '9:16';
    duration: 8 | 16;
    model: 'veo3' | 'veo3_fast';
}

export interface GeneratedVideo {
    id: string;
    taskId: string;
    videoUrl: string;
    thumbnailUrl?: string;
    duration: number;
    format: string;
    createdAt: Date;
    actorId: string;
    prompt: string;
}
