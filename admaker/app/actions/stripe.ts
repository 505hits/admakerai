'use server'

import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

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
            maxNetworkRetries: 2,
            timeout: 10000,
        });
    }
    return stripeInstance;
};

export async function cancelSubscription(feedbackData?: {
    reason: string;
    frequency: string;
    satisfactionScore: number;
    feedbackText: string;
    recommendationScore: string;
}) {
    try {
        const supabase = await createClient()

        // 1. Authenticate User
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return { success: false, error: 'Unauthorized' }
        }

        // 2. Save Feedback (if provided)
        if (feedbackData) {
            console.log('[Stripe] Saving cancellation feedback...', feedbackData);
            const { error: feedbackError } = await supabase
                .from('cancellation_feedback')
                .insert({
                    user_id: user.id,
                    reason: feedbackData.reason,
                    frequency: feedbackData.frequency,
                    satisfaction_score: feedbackData.satisfactionScore,
                    feedback_text: feedbackData.feedbackText,
                    recommendation_score: feedbackData.recommendationScore
                });

            if (feedbackError) {
                console.error('[Stripe] Failed to save feedback:', feedbackError);
                // We typically don't block cancellation on feedback failure, but good to log
            }
        }

        // 3. Get User Email
        // We trust the auth email.
        const userEmail = user.email;
        if (!userEmail) {
            return { success: false, error: 'User has no email' }
        }

        console.log(`[Stripe] Attempting to cancel subscription for: ${userEmail}`);

        const stripe = getStripe();

        // 4. Find Customer by Email
        // Since we don't store stripe_customer_id reliably yet, we search by email.
        const customers = await stripe.customers.list({
            email: userEmail,
            limit: 1,
            expand: ['data.subscriptions']
        });

        if (customers.data.length === 0) {
            console.log('[Stripe] No customer found for email');
            return { success: false, error: 'No active subscription found' }
        }

        const customer = customers.data[0];

        // 5. Find Active Subscription
        // Look for subscriptions that are not canceled
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active',
            limit: 1
        });

        if (subscriptions.data.length === 0) {
            // Also check 'trialing' if applicable, but usually 'active'
            console.log('[Stripe] No active subscription found for customer');
            return { success: false, error: 'No active subscription found' }
        }

        const subscription = subscriptions.data[0];

        // 6. Cancel at Period End
        const updatedSubscription = await stripe.subscriptions.update(
            subscription.id,
            { cancel_at_period_end: true }
        );

        console.log(`[Stripe] Subscription ${subscription.id} marked for cancellation at period end.`);

        // 7. Optional: Update Supabase Profile
        // We try to update the status to reflect "canceling" or just keep it active but maybe update end date?
        // For now, we won't risk breaking the "active" checks in UI by setting it to a random string like "canceling"
        // unless we know the schema supports it.
        // But we WILL ensure the subscription_end_date is synced if possible.

        if ((updatedSubscription as any).current_period_end) {
            const endDate = new Date((updatedSubscription as any).current_period_end * 1000).toISOString();
            await supabase.from('profiles').update({
                subscription_end_date: endDate
                // We don't change status to 'inactive' yet because they paid for the month.
            }).eq('id', user.id);
        }

        return {
            success: true,
            message: 'Subscription canceled successfully. Access remains until end of period.',
            endDate: (updatedSubscription as any).current_period_end
                ? new Date((updatedSubscription as any).current_period_end * 1000).toLocaleDateString()
                : null
        }

    } catch (error) {
        console.error('[Stripe] Cancel Subscription Error:', error);
        return { success: false, error: 'Failed to cancel subscription' }
    }
}
