-- ✅ FIX QUERY FOR contact.admakerai@gmail.com
-- This will manually update the profile to Startup plan with correct credits

-- IMPORTANT: Verify the Startup plan credits first!
-- Check your payment page to see what the Startup plan includes
-- Common Startup plan values:
-- - credits: 100 (video generation credits)
-- - actor_credits: 10 (AI actor credits)
-- - replicator_credits: 0 or 5 (video replication credits)

-- UPDATE QUERY - Run this to fix the profile
UPDATE profiles
SET 
    subscription_plan = 'startup',
    subscription_status = 'active',
    credits = 440,  -- Startup plan: 440 video credits
    actor_credits = 440,  -- Startup plan: 440 actor credits
    replicator_credits = 0,  -- Startup plan: no replicator credits
    subscription_end_date = NOW() + INTERVAL '1 month',  -- Change to '1 year' if annual plan
    updated_at = NOW()
WHERE id = '97399063-fc6c-4b29-9cbb-f85cf91e8949';

-- After running the UPDATE, verify with this query:
SELECT 
    u.email,
    p.credits,
    p.actor_credits,
    p.replicator_credits,
    p.subscription_plan,
    p.subscription_status,
    p.subscription_end_date,
    p.updated_at
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'contact.admakerai@gmail.com';
