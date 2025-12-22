/**
 * OpenAI API Client via Replicate
 * Enhances video scripts for Instagram/TikTok UGC ads
 */

import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

interface EnhanceScriptParams {
    originalScript: string;
    duration?: number;
}

/**
 * Enhance a video script using OpenAI o1 model via Replicate
 * Optimizes for 8-second Instagram/TikTok UGC ads with catchy hooks
 */
export async function enhanceScript({
    originalScript,
    duration = 8
}: EnhanceScriptParams): Promise<string> {
    try {
        console.log('🤖 Enhancing script with OpenAI...');
        console.log('Original script:', originalScript);

        // Check if REPLICATE_API_TOKEN is configured
        if (!process.env.REPLICATE_API_TOKEN) {
            console.error('❌ REPLICATE_API_TOKEN is not configured');
            throw new Error('AI Script Enhancer is not configured. Please add your REPLICATE_API_TOKEN to the environment variables.');
        }

        // Create the prompt for OpenAI
        const prompt = `You are an expert UGC (User Generated Content) ad copywriter specializing in viral Instagram and TikTok ads.

Transform the following script into a highly engaging ${duration}-second UGC ad script optimized for Instagram/TikTok.

Requirements:
- Start with a CATCHY HOOK in the first 1-2 seconds that stops scrolling
- Keep it conversational and authentic (UGC style)
- Use short, punchy sentences
- Include emotional triggers
- End with a clear call-to-action
- Total length should fit in ${duration} seconds when spoken naturally
- Format: Script only, no scene descriptions

Original script:
${originalScript}

Enhanced UGC script:`;

        // Call OpenAI o1 model via Replicate
        const output = await replicate.run(
            "openai/o1" as any,
            {
                input: {
                    prompt: prompt,
                    reasoning_effort: "medium",
                    max_completion_tokens: 500
                }
            }
        );

        // The output is an array of strings, concatenate them
        let enhancedScript = '';
        if (Array.isArray(output)) {
            enhancedScript = output.join('');
        } else if (typeof output === 'string') {
            enhancedScript = output;
        }

        console.log('✅ Script enhanced successfully');
        console.log('Enhanced script:', enhancedScript);

        return enhancedScript.trim();

    } catch (error: any) {
        console.error('❌ Error enhancing script:', error);

        // Provide more user-friendly error messages
        if (error.message?.includes('API token')) {
            throw new Error('AI Script Enhancer is not configured properly. Please check your API credentials.');
        }

        throw new Error(error.message || 'Failed to enhance script. Please try again later.');
    }
}

/**
 * OpenAI client for browser-side usage
 */
export const openaiClient = {
    enhanceScript,
};
