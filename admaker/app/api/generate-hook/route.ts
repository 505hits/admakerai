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

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Get user if authenticated
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        let hooksRemaining = null; // Initialize hooksRemaining here

        // Rate limiting for non-authenticated users (stricter - 10 total per hour)
        let rateLimitResult; // Declare rateLimitResult here to be accessible later

        if (!user) {
            const clientIp = getClientIp(request);
            // Use a custom config for hook generation (10 requests per hour)
            const ipRateLimit = await rateLimit(clientIp, {
                windowMs: 60 * 60 * 1000, // 1 hour
                maxRequests: 10, // 10 requests per hour
            });
            rateLimitResult = ipRateLimit; // Assign to rateLimitResult

            if (!ipRateLimit.success) {
                return NextResponse.json(
                    {
                        error: 'You\'ve reached the maximum number of free hook generations. Please sign up to continue.',
                        limitReached: true,
                        isAuthenticated: false
                    },
                    {
                        status: 429,
                        headers: getRateLimitHeaders(ipRateLimit)
                    }
                );
            }
        }

        // For authenticated users, check their hook generation count
        if (user) {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('hook_generations_used, subscription_status')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('❌ Error fetching profile:', profileError);
                return NextResponse.json(
                    { error: 'Failed to check usage limit' },
                    { status: 500 }
                );
            }

            // Check if user has a paid subscription
            const isPaidUser = profile?.subscription_status === 'active' ||
                profile?.subscription_status === 'trialing';

            if (!isPaidUser) {
                const hooksUsed = profile?.hook_generations_used || 0;
                hooksRemaining = Math.max(0, 10 - hooksUsed);

                if (hooksUsed >= 10) {
                    console.log('❌ User has reached hook generation limit');
                    return NextResponse.json(
                        {
                            error: 'You\'ve used all your free hook generations! Upgrade to Pro for unlimited access.',
                            limitReached: true,
                            hooksRemaining: 0,
                            isAuthenticated: true
                        },
                        { status: 429 }
                    );
                }
                console.log(`✅ User has ${hooksRemaining} hook generations remaining`);
            } else {
                // Paid users have unlimited hooks
                hooksRemaining = -1; // Indicate unlimited
                console.log('✅ Paid user has unlimited hook generations');
            }
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

Generate 3 DIFFERENT catchy hooks for a video about: "${videoIdea}"

Requirements for each hook:
- MUST grab attention in the first 2 seconds
- Use pattern interrupts, curiosity gaps, or bold statements
- Keep it under 15 words
- Make it conversational and authentic
- Avoid clickbait - be genuine
- Each hook MUST be completely different from the others
- DETECT the language of the video idea and respond in THE SAME LANGUAGE

Format your response as a numbered list (1-3), one hook per line.
Do NOT include explanations, just the hooks.

Example format:
1. Wait... this changed everything about how I [topic]
2. Nobody talks about this, but [surprising fact]
3. I tried [topic] for 30 days and...
4. Stop doing [common mistake] - here's why
5. The truth about [topic] that nobody tells you

Generate 3 hooks:`;

        // Call Meta Llama 3.1 405B Instruct model via Replicate
        const output = await replicate.run(
            "meta/meta-llama-3.1-405b-instruct" as any,
            {
                input: {
                    prompt: prompt,
                    max_tokens: 300,
                    temperature: 0.8,
                    top_p: 0.9,
                }
            }
        );

        // Collect the output
        let generatedText = '';

        if (output && typeof output === 'object' && Symbol.asyncIterator in output) {
            for await (const chunk of output as any) {
                generatedText += chunk;
            }
        } else if (output && typeof output === 'object' && Symbol.iterator in output) {
            for (const chunk of output as any) {
                generatedText += chunk;
            }
        } else if (Array.isArray(output)) {
            generatedText = output.join('');
        } else if (typeof output === 'string') {
            generatedText = output;
        }

        if (!generatedText || generatedText.trim().length === 0) {
            console.error('❌ No hooks generated from AI');
            throw new Error('Failed to generate hooks. Please try again.');
        }

        // Parse the hooks from the response
        const hooks = generatedText
            .split('\n')
            .filter((line: string) => line.trim().match(/^\d+\./))
            .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
            .filter((hook: string) => hook.length > 0)
            .slice(0, 3); // Take only first 3 hooks

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
            rateLimitResult ? { headers: getRateLimitHeaders(rateLimitResult) } : {}
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
