require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local or .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

(async () => {
    const email = 'ahmed.mkk@gmail.com';

    console.log(`Looking for user with email: ${email}`);

    let userId = null;
    let page = 1;
    while (true) {
        const { data, error } = await supabase.auth.admin.listUsers({
            page: page,
            perPage: 1000
        });

        if (error) {
            console.error("Error fetching users:", error);
            process.exit(1);
        }

        if (!data.users || data.users.length === 0) {
            break;
        }

        const user = data.users.find(u => u.email === email);
        if (user) {
            userId = user.id;
            break;
        }
        page++;
    }

    if (!userId) {
        console.error(`User with email ${email} not found.`);
        process.exit(1);
    }

    console.log(`Found user ID: ${userId}`);

    // Get current profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
        process.exit(1);
    }

    // Growth pack gives: 1200 video credits, 1200 actor credits, 300 replicator credits
    const currentVideoCredits = profile ? (profile.credits || 0) : 0;
    const currentActorCredits = profile ? (profile.actor_credits || 0) : 0;
    const currentReplicatorCredits = profile ? (profile.replicator_credits || 0) : 0;

    const growthVideoCredits = 1200;
    const growthActorCredits = 1200;
    const growthReplicatorCredits = 300;

    const extraVideoCredits = 50;

    const newVideoCredits = currentVideoCredits + growthVideoCredits + extraVideoCredits;
    const newActorCredits = currentActorCredits + growthActorCredits;
    const newReplicatorCredits = currentReplicatorCredits + growthReplicatorCredits;

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month from now

    const updateData = {
        id: userId,
        credits: newVideoCredits,
        actor_credits: newActorCredits,
        replicator_credits: newReplicatorCredits,
        subscription_status: 'active',
        subscription_plan: 'growth',
        subscription_end_date: endDate.toISOString(),
    };

    const { error: updateError } = await supabase
        .from('profiles')
        .upsert(updateData);

    if (updateError) {
        console.error("Error updating profile:", updateError);
        process.exit(1);
    }

    // Log a payment entry to mimic webhook somewhat, but we don't have stripe_session_id
    // We can skip that, or just add a manual payment entry if required. Profiles update is enough for credits.

    console.log("✅ Successfully updated user profile.");
    console.log(`New Video Credits: ${newVideoCredits}`);
    console.log(`New Actor Credits: ${newActorCredits}`);
    console.log(`New Replicator Credits: ${newReplicatorCredits}`);
    console.log(`Subscription Plan: growth`);
    console.log(`Subscription End Date: ${endDate.toISOString()}`);
})();
