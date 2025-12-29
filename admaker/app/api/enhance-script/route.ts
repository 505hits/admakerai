import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enhanceScript } from '@/lib/api/openai';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { schemas, containsMaliciousContent } from '@/lib/security/validation';
import { handleError, ValidationError, AuthenticationError } from '@/lib/security/error-handler';

export async function POST(request: NextRequest) {
    try {
        console.log('🤖 Script enhancement API called');

        // Rate limiting - 30 requests per hour per IP
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

        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.log('❌ Unauthorized - No user found');
            throw new AuthenticationError();
        }

        // Check AI script uses remaining
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('ai_script_uses')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
            return NextResponse.json(
                { error: 'Failed to check usage limit' },
                { status: 500 }
            );
        }

        const remainingUses = profile?.ai_script_uses ?? 0;

        if (remainingUses <= 0) {
            console.log('❌ User has no AI script uses remaining');
            return NextResponse.json(
                { error: 'You have used all 50 AI script enhancements. This feature is limited to 50 uses per account.' },
                { status: 403 }
            );
        }

        console.log(`✅ User has ${remainingUses} AI script uses remaining`);

        // Parse and validate request body
        const body = await request.json();
        const { script, duration = 8 } = body as {
            script: string;
            duration?: number;
        };

        console.log('📝 Original script:', script);
        console.log('⏱️ Duration:', duration);

        // Validate script input
        const scriptValidation = schemas.script.safeParse(script);
        if (!scriptValidation.success) {
            throw new ValidationError(scriptValidation.error.issues[0].message);
        }

        // Check for malicious content
        if (containsMaliciousContent(script)) {
            throw new ValidationError('Script contains potentially malicious content');
        }

        // Validate duration
        const durationValidation = schemas.duration.safeParse(duration);
        if (!durationValidation.success) {
            throw new ValidationError('Duration must be between 5 and 60 seconds');
        }

        // Enhance the script using OpenAI
        const enhancedScript = await enhanceScript({
            originalScript: script,
            duration
        });

        // Decrement ai_script_uses
        const newUsesRemaining = remainingUses - 1;
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ ai_script_uses: newUsesRemaining })
            .eq('id', user.id);

        if (updateError) {
            console.error('❌ Error updating ai_script_uses:', updateError);
            // Don't fail the request, just log the error
        } else {
            console.log(`✅ AI script uses decremented: ${remainingUses} → ${newUsesRemaining}`);
        }

        console.log('✅ Script enhanced successfully');
        return NextResponse.json(
            {
                enhancedScript,
                success: true
            },
            { headers: getRateLimitHeaders(rateLimitResult) }
        );

    } catch (error) {
        console.error('❌ Error enhancing script:', error);
        const secureError = handleError(error, 'enhance-script');

        return NextResponse.json(
            { error: secureError.message },
            { status: secureError.statusCode }
        );
    }
}
