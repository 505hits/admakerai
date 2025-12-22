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
        // Note: Replicate returns an async iterator for streaming responses
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

        // Log the raw output for debugging
        console.log('🔍 Raw Replicate output type:', typeof output);
        console.log('🔍 Is Array?:', Array.isArray(output));
        console.log('🔍 Is Iterator?:', output && typeof output === 'object' && Symbol.iterator in output);
        console.log('🔍 Is Async Iterator?:', output && typeof output === 'object' && Symbol.asyncIterator in output);

        // Collect the output - Replicate often returns an async iterator
        let enhancedScript = '';

        // Check if it's an async iterator (most common for Replicate)
        if (output && typeof output === 'object' && Symbol.asyncIterator in output) {
            console.log('📡 Output is async iterator, collecting chunks...');
            for await (const chunk of output as any) {
                console.log('📦 Received chunk:', chunk);
                enhancedScript += chunk;
            }
        }
        // Check if it's a regular iterator
        else if (output && typeof output === 'object' && Symbol.iterator in output) {
            console.log('📡 Output is iterator, collecting chunks...');
            for (const chunk of output as any) {
                console.log('📦 Received chunk:', chunk);
                enhancedScript += chunk;
            }
        }
        // Check if it's an array
        else if (Array.isArray(output)) {
            console.log('📋 Output is array with length:', output.length);
            enhancedScript = output.join('');
        }
        // Check if it's a string
        else if (typeof output === 'string') {
            console.log('📝 Output is string');
            enhancedScript = output;
        }
        // Check if it's an object with common properties
        else if (output && typeof output === 'object') {
            console.log('📦 Output is object, keys:', Object.keys(output));
            const possibleKeys = ['text', 'output', 'content', 'response', 'result', 'completion', 'message'];
            for (const key of possibleKeys) {
                if ((output as any)[key]) {
                    console.log(`✅ Found output in key: ${key}`);
                    const value = (output as any)[key];
                    if (Array.isArray(value)) {
                        enhancedScript = value.join('');
                    } else {
                        enhancedScript = String(value);
                    }
                    break;
                }
            }
        }

        if (!enhancedScript || enhancedScript.trim().length === 0) {
            console.error('❌ No enhanced script extracted from output');
            console.error('Full output:', output);
            console.error('Output type:', typeof output);
            console.error('Output constructor:', output?.constructor?.name);
            throw new Error('No enhanced script received from AI. Please try again.');
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
