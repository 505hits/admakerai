/**
 * Diagnostic script to check user profile data
 * Run with: npx tsx scripts/check-user-profile.ts <user-email>
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUserProfile(email: string) {
    console.log(`\n🔍 Checking profile for: ${email}\n`);

    // 1. Find user by email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error('❌ Error fetching users:', userError);
        return;
    }

    const user = users.users.find(u => u.email === email);

    if (!user) {
        console.error(`❌ User not found with email: ${email}`);
        return;
    }

    console.log('✅ User found:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Created: ${user.created_at}`);
    console.log('');

    // 2. Check profile in database
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

    if (profileError) {
        console.error('❌ Error fetching profile:', profileError);
        return;
    }

    if (!profile) {
        console.log('⚠️  No profile found in database!');
        console.log('   This user needs a profile created.');
        return;
    }

    console.log('📊 Profile Data:');
    console.log(`   Credits: ${profile.credits || 0}`);
    console.log(`   Actor Credits: ${profile.actor_credits || 0}`);
    console.log(`   Replicator Credits: ${profile.replicator_credits || 0}`);
    console.log(`   Subscription Plan: ${profile.subscription_plan || 'N/A'}`);
    console.log(`   Subscription Status: ${profile.subscription_status || 'N/A'}`);
    console.log(`   Subscription End Date: ${profile.subscription_end_date || 'N/A'}`);
    console.log(`   Created At: ${profile.created_at}`);
    console.log(`   Updated At: ${profile.updated_at}`);
    console.log('');

    // 3. Check if user should have access to dashboard
    const hasCredits = (profile.credits || 0) > 0 ||
        (profile.actor_credits || 0) > 0 ||
        (profile.replicator_credits || 0) > 0;
    const hasActiveSubscription = profile.subscription_status === 'active';
    const hasAccess = hasActiveSubscription || hasCredits;

    console.log('🔐 Access Check:');
    console.log(`   Has Credits: ${hasCredits ? '✅' : '❌'}`);
    console.log(`   Has Active Subscription: ${hasActiveSubscription ? '✅' : '❌'}`);
    console.log(`   Should See Dashboard: ${hasAccess ? '✅ YES' : '❌ NO'}`);
    console.log('');

    // 4. Recommendations
    console.log('💡 Recommendations:');
    if (profile.subscription_plan === 'free' && hasCredits) {
        console.log('   ⚠️  User has credits but plan is "free" - this might be incorrect');
    }
    if (profile.subscription_status !== 'active' && profile.subscription_plan !== 'free') {
        console.log('   ⚠️  User has a paid plan but status is not "active"');
    }
    if (!hasAccess) {
        console.log('   ❌ User will NOT see Dashboard option in menu');
    }
}

// Get email from command line
const email = process.argv[2];

if (!email) {
    console.error('❌ Please provide an email address');
    console.error('   Usage: npx tsx scripts/check-user-profile.ts <email>');
    process.exit(1);
}

checkUserProfile(email).catch(console.error);
