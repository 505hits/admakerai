import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PRICING_PLANS, PlanType, BillingPeriod } from '@/lib/stripe/config';

export async function POST(request: NextRequest) {
    try {
        console.log('🔵 Stripe checkout API called');

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
        const body = await request.json();
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
        console.log('🔵 Plan details:', plan);

        // Get user email from profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', user.id)
            .single();

        console.log('🔵 User email:', profile?.email || user.email);

        // Create Stripe instance directly to avoid build-time errors
        console.log('🔵 Creating Stripe session...');
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-12-15.clover' as any,
            typescript: true,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingPeriod === 'monthly' ? 'Monthly' : 'Annual'}`,
                            description: `${plan.videoCredits} video credits, ${plan.actorCredits} actor credits${plan.replicatorCredits > 0 ? `, ${plan.replicatorCredits} replicator credits` : ''}`,
                        },
                        unit_amount: plan.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment?payment=cancelled`,
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

        console.log('✅ Stripe session created:', session.id);
        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('❌ Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
