import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

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

        // 1. Check if payment is already recorded in our DB (Webhook was fast)
        const serviceClient = createServiceClient();
        const { data: existingPayment } = await serviceClient
            .from('payments')
            .select('id')
            .eq('stripe_session_id', sessionId)
            .single();

        if (existingPayment) {
            console.log('✅ Payment already processed (found in DB)');
            return NextResponse.json({
                success: true,
                paid: true,
                creditsAdded: true,
                planUpdated: true,
                source: 'db'
            });
        }

        console.log('⚠️ Payment not in DB yet, checking Stripe directly...');

        // 2. If not in DB, check Stripe to see if it's actually paid
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

        if (session.payment_status !== 'paid') {
            return NextResponse.json({
                success: false,
                paid: false,
                message: 'Payment not completed yet'
            });
        }

        // 3. AUTO-HEALING: Payment is paid but not in DB -> Process it NOW!
        console.log('🔄 Self-healing: Processing payment immediately...');

        // Extract metadata
        const planType = session.metadata?.planType;
        const billingPeriod = session.metadata?.billingPeriod;
        const videoCredits = parseInt(session.metadata?.videoCredits || '0');
        const actorCredits = parseInt(session.metadata?.actorCredits || '0');
        const replicatorCredits = parseInt(session.metadata?.replicatorCredits || '0');

        // Get current profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('credits, actor_credits, replicator_credits')
            .eq('id', user.id)
            .single();

        // Add credits
        const newVideoCredits = (profile?.credits || 0) + videoCredits;
        const newActorCredits = (profile?.actor_credits || 0) + actorCredits;
        const newReplicatorCredits = (profile?.replicator_credits || 0) + replicatorCredits;

        // Calculate end date
        const endDate = new Date();
        if (billingPeriod === 'annual') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            endDate.setMonth(endDate.getMonth() + 1);
        }

        const updateData: any = {
            credits: newVideoCredits,
            actor_credits: newActorCredits,
            replicator_credits: newReplicatorCredits,
            subscription_status: 'active',
            subscription_plan: planType,
            subscription_end_date: endDate.toISOString(),
            updated_at: new Date().toISOString()
        };

        // Update profile
        const { error: updateError } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id);

        if (updateError) {
            console.error('❌ Error self-healing profile:', updateError);
            return NextResponse.json(
                { error: 'Failed to update user profile' },
                { status: 500 }
            );
        }

        // Record payment to prevent webhook from processing it again
        await serviceClient.from('payments').insert({
            user_id: user.id,
            stripe_session_id: session.id,
            amount_total: session.amount_total,
            currency: session.currency,
            status: session.payment_status,
            plan_type: planType,
            created_at: new Date().toISOString()
        });

        // Return success with updated profile data
        return NextResponse.json({
            success: true,
            paid: true,
            creditsAdded: true,
            planUpdated: true,
            source: 'self-healing',
            profile: {
                videoCredits: newVideoCredits,
                actorCredits: newActorCredits,
                replicatorCredits: newReplicatorCredits,
                subscriptionPlan: planType,
                subscriptionStatus: 'active',
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
