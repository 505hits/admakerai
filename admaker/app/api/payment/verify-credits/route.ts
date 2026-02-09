import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
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

        // 1. Check if payment is already recorded in our DB (Webhook was fast)
        // using service client for reliability in reading payments
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
        // Reuse the stripe instance if we already have it, or get it
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
        // Use service client to bypass RLS for insert
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
            creditsAdded: true, // we just added them
            planUpdated: true, // we just updated it
            source: 'self-healing',
            profile: {
                videoCredits: newVideoCredits,
                actorCredits: newActorCredits,
                replicatorCredits: newReplicatorCredits,
                subscriptionPlan: planType,
                subscriptionStatus: 'active',
            }
        });

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
        // Use service client to bypass RLS if needed for insert, though here user is auth'd
        // But for consistency we can just use the auth'd client if policies allow, 
        // or create a service client if we wanted to be 100% sure. 
        // Since we are in an API route with user context, standard client is fine IF policy allows insert.
        // However, checking the migration plan, we didn't add an INSERT policy for users.
        // So we should use Service Client for the insert to be safe.

        // We need to import createServiceClient dynamically or assume available
        // But wait, createServiceClient isn't imported. Let's stick to the auth'd client 
        // and assume the user has insert rights OR use the Service Client if we can import it.
        // To be safe and avoid import errors if not already there, let's look at imports.
        // This file imports createClient from @/lib/supabase/server.
        // We need createServiceClient for robust backend ops usually. 
        // Let's modify imports first if needed? 
        // Actually, let's just use the current client and if it fails, we log it. 
        // BUT, if we want to guarantee it works, we should probably add the Service Client import.
        // Ref: verify-credits/route.ts only imports createClient. 
        // Let's add the import in a separate step or just use what we have? 
        // The Service Client is safer. 
        // However, to keep it simple and avoid multi-step file edits if possible:
        // Let's see if we can just use what we have.
        // If I use the auth'd client, I need an INSERT policy.
        // The migration I wrote: "No explicit policy needed for service role... ensure no public write access".
        // It implies users CANNOT insert. So I MUST use service client.

        // I will add the import in the ReplacementContent? No, imports are at top.
        // I should probably use `multi_replace_file_content` to add import AND logic.
        // But I am using `replace_file_content` here. 
        // Verification: existing imports are lines 1-2.
        // I will cancel this tool call and use multi_replace to add the import.

    } catch (error) {
        console.error('Error verifying credits:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
