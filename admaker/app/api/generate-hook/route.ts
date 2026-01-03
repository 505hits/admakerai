import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Replicate from 'replicate';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { schemas, containsMaliciousContent } from '@/lib/security/validation';
import { handleError, ValidationError, AuthenticationError } from '@/lib/security/error-handler';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
    try {
        console.log('🎣 Hook generation API called');

        // Rate limiting - 5 requests per hour per IP (for non-authenticated users)
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.enhance);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        // Get authenticated user (optional for this endpoint)
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        let hooksRemaining = null;

        // If user is authenticated, check their hook usage
        if (user) {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('hook_generations_used')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('❌ Error fetching profile:', profileError);
                return NextResponse.json(
                    { error: 'Failed to check usage limit' },
                    { status: 500 }
                );
            }

            const usedGenerations = profile?.hook_generations_used ?? 0;
            hooksRemaining = Math.max(0, 10 - usedGenerations);

            if (usedGenerations >= 10) {
                console.log('❌ User has reached hook generation limit');
                return NextResponse.json(
                    {
                        error: 'You have used all your free hook generations. Upgrade to Pro for unlimited access.',
                        limitReached: true,
                        hooksRemaining: 0
                    },
                    { status: 403 }
                );
            }

            console.log(`✅ User has ${hooksRemaining} hook generations remaining`);
        }

        // Parse and validate request body
        const body = await request.json();
        const { videoIdea } = body as { videoIdea: string };

        console.log('💡 Video idea:', videoIdea);

        // Validate video idea input
        if (!videoIdea || videoIdea.trim().length === 0) {
            throw new ValidationError('Please provide a video idea');
        }

        if (videoIdea.length > 500) {
            throw new ValidationError('Video idea must be less than 500 characters');
        }

        // Check for malicious content
        if (containsMaliciousContent(videoIdea)) {
            throw new ValidationError('Video idea contains potentially malicious content');
        }

        // Check if REPLICATE_API_TOKEN is configured
        if (!process.env.REPLICATE_API_TOKEN) {
            console.error('❌ REPLICATE_API_TOKEN is not configured');
            throw new Error('Hook Generator is not configured. Please contact support.');
        }

        // Create the prompt for the AI model
        const prompt = `You are an expert copywriter specializing in viral video hooks for TikTok, Instagram Reels, and YouTube Shorts.

Generate 5 DIFFERENT catchy hooks for a video about: "${videoIdea}"

Requirements for each hook:
- MUST grab attention in the first 2 seconds
- Use pattern interrupts, curiosity gaps, or bold statements
- Keep it under 15 words
- Make it conversational and authentic
- Avoid clickbait - be genuine
- Each hook MUST be completely different from the others
- DETECT the language of the video idea and respond in THE SAME LANGUAGE

Format your response as a numbered list (1-5), one hook per line.
Do NOT include explanations, just the hooks.

Example format:
1. Wait... this changed everything about how I [topic]
2. Nobody talks about this, but [surprising fact]
3. I tried [topic] for 30 days and...
4. Stop doing [common mistake] - here's why
5. The truth about [topic] that nobody tells you

Generate 5 hooks:`;

        // Call Meta Llama 3.1 405B Instruct model via Replicate
        const output = await replicate.run(
            "meta/meta-llama-3.1-405b-instruct" as any,
            {
                input: {
                    prompt: prompt,
                    max_tokens: 500,
                    temperature: 0.8,
                    top_p: 0.9,
                }
            }
        );

        // Collect the output
        let generatedHooks = '';

        if (output && typeof output === 'object' && Symbol.asyncIterator in output) {
            for await (const chunk of output as any) {
                generatedHooks += chunk;
            }
        } else if (output && typeof output === 'object' && Symbol.iterator in output) {
            for (const chunk of output as any) {
                generatedHooks += chunk;
            }
        } else if (Array.isArray(output)) {
            generatedHooks = output.join('');
        } else if (typeof output === 'string') {
            generatedHooks = output;
        }

        if (!generatedHooks || generatedHooks.trim().length === 0) {
            console.error('❌ No hooks generated from AI');
            throw new Error('Failed to generate hooks. Please try again.');
        }

        // Parse the hooks from the response
        const hooks = generatedHooks
            .split('\n')
            .filter(line => line.trim().match(/^\d+\./))
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(hook => hook.length > 0)
            .slice(0, 5);

        if (hooks.length === 0) {
            console.error('❌ Failed to parse hooks from response');
            throw new Error('Failed to generate hooks. Please try again.');
        }

        // If user is authenticated, increment their hook usage
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('hook_generations_used')
                .eq('id', user.id)
                .single();

            const newUsageCount = (profile?.hook_generations_used ?? 0) + 1;
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ hook_generations_used: newUsageCount })
                .eq('id', user.id);

            if (updateError) {
                console.error('❌ Error updating hook_generations_used:', updateError);
            } else {
                console.log(`✅ Hook generations updated: ${newUsageCount}/10`);
                hooksRemaining = Math.max(0, 10 - newUsageCount);
            }
        }

        console.log('✅ Hooks generated successfully');
        return NextResponse.json(
            {
                hooks,
                success: true,
                hooksRemaining,
                isAuthenticated: !!user
            },
            { headers: getRateLimitHeaders(rateLimitResult) }
        );

    } catch (error) {
        console.error('❌ Error generating hooks:', error);
        const secureError = handleError(error, 'generate-hook');

        return NextResponse.json(
            { error: secureError.message },
            { status: secureError.statusCode }
        );
    }
}
