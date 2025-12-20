import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/config';
import { createServiceClient } from '@/lib/supabase/service';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        const stripe = await getStripe();
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
                const session = event.data.object as Stripe.Checkout.Session;

                console.log('✅ Payment successful:', session.id);
                console.log('Metadata:', session.metadata);

                // Extract metadata
                const userId = session.metadata?.userId;
                const videoCredits = parseInt(session.metadata?.videoCredits || '0');
                const actorCredits = parseInt(session.metadata?.actorCredits || '0');

                if (!userId) {
                    console.error('❌ Missing userId in session metadata');
                    break;
                }

                // Update user credits in Supabase
                const supabase = createServiceClient();

                // Get current credits
                const { data: profile, error: fetchError } = await supabase
                    .from('profiles')
                    .select('credits, actor_credits')
                    .eq('id', userId)
                    .single();

                if (fetchError) {
                    console.error('❌ Error fetching user profile:', fetchError);
                    break;
                }

                // Add new credits to existing credits
                const newVideoCredits = (profile?.credits || 0) + videoCredits;
                const newActorCredits = (profile?.actor_credits || 0) + actorCredits;

                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({
                        credits: newVideoCredits,
                        actor_credits: newActorCredits,
                    })
                    .eq('id', userId);

                if (updateError) {
                    console.error('❌ Error updating user credits:', updateError);
                } else {
                    console.log(`✅ Credits updated for user ${userId}:`);
                    console.log(`   Video credits: ${profile?.credits || 0} → ${newVideoCredits} (+${videoCredits})`);
                    console.log(`   Actor credits: ${profile?.actor_credits || 0} → ${newActorCredits} (+${actorCredits})`);
                }

                break;
            }

            case 'checkout.session.expired': {
                const session = event.data.object as Stripe.Checkout.Session;
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
