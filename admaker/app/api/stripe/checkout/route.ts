import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PRICING_PLANS, PlanType, BillingPeriod } from '@/lib/stripe/config';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { validateUserAgent } from '@/lib/security/bot-detection';
import Stripe from 'stripe';

// Initialize Stripe instance lazily
let stripeInstance: Stripe | undefined;

const getStripe = () => {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is missing');
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-12-15.clover' as any,
            typescript: true,
            maxNetworkRetries: 2, // Retry network errors automatically
            timeout: 10000, // Client-side timeout (10s)
        });
    }
    return stripeInstance;
};

export async function POST(request: NextRequest) {
    try {
        console.log('🔵 Stripe checkout API called');

        // Rate limiting - prevent checkout spam
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.checkout);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many checkout requests. Please try again later' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        // Bot detection
        const uaValidation = validateUserAgent(request);
        if (!uaValidation.valid) {
            console.warn('❌ Suspicious User-Agent blocked:', {
                userAgent: uaValidation.userAgent,
                reason: uaValidation.reason,
            });
            return NextResponse.json(
                { error: 'Suspicious bot activity detected' },
                { status: 403 }
            );
        }

        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        console.log('🔵 User:', user?.id, 'Auth Error:', authError);

        if (authError || !user) {
            console.log('❌ Unauthorized - No user found');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { planType, billingPeriod } = body as {
            planType: PlanType;
            billingPeriod: BillingPeriod;
        };

        console.log('🔵 Plan:', planType, 'Billing:', billingPeriod);

        // Validate plan type and billing period
        if (!planType || !billingPeriod) {
            return NextResponse.json(
                { error: 'Missing planType or billingPeriod' },
                { status: 400 }
            );
        }

        if (!['startup', 'growth', 'pro'].includes(planType)) {
            return NextResponse.json(
                { error: 'Invalid planType' },
                { status: 400 }
            );
        }

        if (!['monthly', 'annual'].includes(billingPeriod)) {
            return NextResponse.json(
                { error: 'Invalid billingPeriod' },
                { status: 400 }
            );
        }

        // Get plan details
        const plan = PRICING_PLANS[billingPeriod][planType];

        // Safety check for plan existance
        if (!plan || !plan.amount) {
            console.error('❌ Plan details missing for:', planType, billingPeriod);
            return NextResponse.json(
                { error: 'Plan configuration error' },
                { status: 500 }
            );
        }

        console.log('🔵 Plan details:', plan);

        // Get user email from profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', user.id)
            .single();

        console.log('🔵 User email:', profile?.email || user.email);

        // Create Stripe checkout session
        console.log('🔵 Creating Stripe session...');

        try {
            const stripe = getStripe();

            // Ensure app URL is valid and doesn't have trailing slash
            let appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admakerai.app';
            appUrl = appUrl.replace(/\/$/, '');

            // Use Promise.race to enforce a strict server-side timeout
            const createSessionPromise = stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: plan.priceId, // Use predefined Price ID from Stripe
                        quantity: 1,
                    },
                ],
                mode: 'subscription', // Changed from 'payment' to 'subscription' for recurring prices
                success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${appUrl}/payment?payment=cancelled`,
                customer_email: profile?.email || user.email,
                metadata: {
                    userId: user.id,
                    planType,
                    billingPeriod,
                    videoCredits: plan.videoCredits.toString(),
                    actorCredits: plan.actorCredits.toString(),
                    replicatorCredits: plan.replicatorCredits.toString(),
                },
            });

            // 15 second timeout barrier
            const timeoutPromise = new Promise<{ timeout: true }>((resolve) => {
                setTimeout(() => resolve({ timeout: true }), 15000);
            });

            const result = await Promise.race([createSessionPromise, timeoutPromise]);

            if ('timeout' in result) {
                console.error('❌ Stripe API timed out after 15s');
                return NextResponse.json(
                    { error: 'Payment service timed out. Please try again.' },
                    { status: 504 }
                );
            }

            const session = result as Stripe.Checkout.Session;
            console.log('✅ Stripe session created:', session.id);

            return NextResponse.json(
                { url: session.url },
                { headers: getRateLimitHeaders(rateLimitResult) }
            );

        } catch (stripeError: any) {
            console.error('❌ Stripe SDK Error:', {
                message: stripeError.message,
                type: stripeError.type,
                code: stripeError.code,
                statusCode: stripeError.statusCode,
                raw: stripeError.raw,
                priceId: plan.priceId,
            });
            return NextResponse.json(
                {
                    error: 'Payment initialization failed',
                    details: stripeError.message,
                    stripeCode: stripeError.code
                },
                { status: 502 }
            );
        }

    } catch (error) {
        console.error('❌ Error in checkout route:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
