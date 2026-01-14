import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';

export async function POST(request: NextRequest) {
    // Rate limiting for webhooks (DDoS protection)
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.webhook);

    if (!rateLimitResult.success) {
        return NextResponse.json(
            { error: 'Too many webhook requests' },
            {
                status: 429,
                headers: getRateLimitHeaders(rateLimitResult),
            }
        );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    // Import Stripe type for type safety
    type StripeEvent = import('stripe').Stripe.Event;
    let event: StripeEvent;

    try {
        // Create Stripe instance directly to avoid build-time errors
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-12-15.clover' as any,
            typescript: true,
        });

        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as import('stripe').Stripe.Checkout.Session;

                console.log('✅ Payment successful:', session.id);
                console.log('Metadata:', session.metadata);

                // Extract metadata
                const userId = session.metadata?.userId;
                const planType = session.metadata?.planType; // 'startup', 'growth', 'pro'
                const billingPeriod = session.metadata?.billingPeriod; // 'monthly', 'annual'

                const videoCredits = parseInt(session.metadata?.videoCredits || '0');
                const actorCredits = parseInt(session.metadata?.actorCredits || '0');
                const replicatorCredits = parseInt(session.metadata?.replicatorCredits || '0');

                if (!userId) {
                    console.error('❌ Missing userId in session metadata');
                    break;
                }

                // Update user credits and subscription status in Supabase
                const supabase = createServiceClient();

                // Get current credits
                const { data: profile, error: fetchError } = await supabase
                    .from('profiles')
                    .select('credits, actor_credits, replicator_credits')
                    .eq('id', userId)
                    .single();

                if (fetchError) {
                    console.error('❌ Error fetching user profile:', fetchError);
                    break;
                }

                // Add new credits to existing credits
                const newVideoCredits = (profile?.credits || 0) + videoCredits;
                const newActorCredits = (profile?.actor_credits || 0) + actorCredits;
                const newReplicatorCredits = (profile?.replicator_credits || 0) + replicatorCredits;

                // Calculate subscription end date
                // Default to 1 month from now if monthly, 1 year if annual
                // In a real implementation with recurring payments, Stripe provides current_period_end
                const now = new Date();
                let endDate = new Date();
                if (billingPeriod === 'annual') {
                    endDate.setFullYear(endDate.getFullYear() + 1);
                } else {
                    endDate.setMonth(endDate.getMonth() + 1);
                }

                const updateData: any = {
                    credits: newVideoCredits,
                    actor_credits: newActorCredits,
                    replicator_credits: newReplicatorCredits,
                };

                // Only update subscription status if a plan was purchased
                // (This avoids overwriting status if this was just a credit top-up, though currently we only sell plans)
                if (planType) {
                    updateData.subscription_status = 'active';
                    updateData.subscription_plan = planType;
                    updateData.subscription_end_date = endDate.toISOString();
                }

                const { error: updateError } = await supabase
                    .from('profiles')
                    .update(updateData)
                    .eq('id', userId);

                if (updateError) {
                    console.error('❌ Error updating user profile:', updateError);
                    console.error('   User ID:', userId);
                    console.error('   Update data:', updateData);
                } else {
                    console.log('✅✅✅ CREDITS SUCCESSFULLY ADDED ✅✅✅');
                    console.log(`   User ID: ${userId}`);
                    console.log(`   Plan: ${planType} (${billingPeriod})`);
                    console.log(`   Subscription Status: active`);
                    console.log(`   Subscription End Date: ${endDate.toISOString()}`);
                    console.log('   CREDITS SUMMARY:');
                    console.log(`   - Video: ${profile?.credits || 0} → ${newVideoCredits} (+${videoCredits})`);
                    console.log(`   - Actor: ${profile?.actor_credits || 0} → ${newActorCredits} (+${actorCredits})`);
                    console.log(`   - Replicator: ${profile?.replicator_credits || 0} → ${newReplicatorCredits} (+${replicatorCredits})`);
                    console.log('✅ User can now use the /api/payment/verify-credits endpoint');
                }

                break;
            }

            case 'checkout.session.expired': {
                const session = event.data.object as import('stripe').Stripe.Checkout.Session;
                console.log('⏰ Checkout session expired:', session.id);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error handling webhook event:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
