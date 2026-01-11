/**
 * Simplified diagnostic script using Next.js server action
 * This can be called from a temporary API route
 */

import { createServiceClient } from '@/lib/supabase/service';

export async function checkUserProfile(email: string) {
    const supabase = createServiceClient();

    console.log(`\n🔍 Checking profile for: ${email}\n`);

    try {
        // 1. Find user by email
        const { data: users, error: userError } = await supabase.auth.admin.listUsers();

        if (userError) {
            console.error('❌ Error fetching users:', userError);
            return { error: userError.message };
        }

        const user = users.users.find(u => u.email === email);

        if (!user) {
            console.error(`❌ User not found with email: ${email}`);
            return { error: `User not found: ${email}` };
        }

        console.log('✅ User found:');
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Created: ${user.created_at}`);

        // 2. Check profile in database
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

        if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
            return { error: profileError.message };
        }

        if (!profile) {
            console.log('⚠️  No profile found in database!');
            return {
                user,
                profile: null,
                error: 'No profile found',
                recommendation: 'Profile needs to be created'
            };
        }

        console.log('📊 Profile Data:');
        console.log(`   Credits: ${profile.credits || 0}`);
        console.log(`   Actor Credits: ${profile.actor_credits || 0}`);
        console.log(`   Replicator Credits: ${profile.replicator_credits || 0}`);
        console.log(`   Subscription Plan: ${profile.subscription_plan || 'N/A'}`);
        console.log(`   Subscription Status: ${profile.subscription_status || 'N/A'}`);
        console.log(`   Subscription End Date: ${profile.subscription_end_date || 'N/A'}`);

        // 3. Check access
        const hasCredits = (profile.credits || 0) > 0 ||
            (profile.actor_credits || 0) > 0 ||
            (profile.replicator_credits || 0) > 0;
        const hasActiveSubscription = profile.subscription_status === 'active';
        const hasAccess = hasActiveSubscription || hasCredits;

        console.log('🔐 Access Check:');
        console.log(`   Has Credits: ${hasCredits ? '✅' : '❌'}`);
        console.log(`   Has Active Subscription: ${hasActiveSubscription ? '✅' : '❌'}`);
        console.log(`   Should See Dashboard: ${hasAccess ? '✅ YES' : '❌ NO'}`);

        return {
            user: {
                id: user.id,
                email: user.email,
                created_at: user.created_at
            },
            profile,
            hasAccess,
            hasCredits,
            hasActiveSubscription
        };
    } catch (error) {
        console.error('❌ Error:', error);
        return { error: String(error) };
    }
}
