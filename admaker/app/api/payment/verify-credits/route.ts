import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Initialize Stripe lazily to avoid build-time errors
let stripeInstance: any;

const getStripe = async () => {
    if (!stripeInstance) {
        const Stripe = (await import('stripe')).default;
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-12-15.clover' as any,
            typescript: true,
        });
    }
    return stripeInstance;
};

export async function GET(request: NextRequest) {
    try {
        // Get session_id from query params
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Missing session_id parameter' },
                { status: 400 }
            );
        }

        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Retrieve the Stripe session
        const stripe = await getStripe();
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            );
        }

        // Verify the session belongs to the current user
        if (session.metadata?.userId !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized - Session does not belong to this user' },
                { status: 403 }
            );
        }

        // Check if payment was successful
        if (session.payment_status !== 'paid') {
            return NextResponse.json({
                success: false,
                paid: false,
                message: 'Payment not completed yet'
            });
        }

        // Get user profile to check if credits were added
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('credits, actor_credits, replicator_credits, subscription_plan, subscription_status')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('Error fetching profile:', profileError);
            return NextResponse.json(
                { error: 'Failed to fetch user profile' },
                { status: 500 }
            );
        }

        // Extract expected credits from session metadata
        const expectedVideoCredits = parseInt(session.metadata?.videoCredits || '0');
        const expectedActorCredits = parseInt(session.metadata?.actorCredits || '0');
        const expectedReplicatorCredits = parseInt(session.metadata?.replicatorCredits || '0');
        const expectedPlan = session.metadata?.planType;

        // Check if credits have been added (profile should have at least the purchased amount)
        const hasCredits = profile.credits >= expectedVideoCredits ||
            profile.actor_credits >= expectedActorCredits;

        const planUpdated = profile.subscription_plan === expectedPlan &&
            profile.subscription_status === 'active';

        return NextResponse.json({
            success: hasCredits && planUpdated,
            paid: true,
            creditsAdded: hasCredits,
            planUpdated: planUpdated,
            profile: {
                videoCredits: profile.credits,
                actorCredits: profile.actor_credits,
                replicatorCredits: profile.replicator_credits,
                subscriptionPlan: profile.subscription_plan,
                subscriptionStatus: profile.subscription_status,
            },
            expected: {
                videoCredits: expectedVideoCredits,
                actorCredits: expectedActorCredits,
                replicatorCredits: expectedReplicatorCredits,
                plan: expectedPlan,
            }
        });

    } catch (error) {
        console.error('Error verifying credits:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
