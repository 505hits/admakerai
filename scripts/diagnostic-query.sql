-- Diagnostic SQL Query for User Profile
-- Run this in Supabase SQL Editor to check profile for contact.admakerai@gmail.com

-- Step 1: Find the user ID from auth.users
SELECT 
    id as user_id,
    email,
    created_at as user_created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
WHERE email = 'contact.admakerai@gmail.com';

-- Step 2: Check the profile data (copy the user_id from above and use it here)
-- Replace 'USER_ID_HERE' with the actual ID from the query above
SELECT 
    id,
    credits,
    actor_credits,
    replicator_credits,
    subscription_plan,
    subscription_status,
    subscription_end_date,
    created_at,
    updated_at,
    -- Access check calculations
    CASE 
        WHEN credits > 0 OR actor_credits > 0 OR COALESCE(replicator_credits, 0) > 0 THEN true
        ELSE false
    END as has_credits,
    CASE 
        WHEN subscription_status = 'active' THEN true
        ELSE false
    END as has_active_subscription,
    CASE 
        WHEN subscription_status = 'active' 
            OR credits > 0 
            OR actor_credits > 0 
            OR COALESCE(replicator_credits, 0) > 0 
        THEN true
        ELSE false
    END as should_see_dashboard
FROM profiles
WHERE id = 'USER_ID_HERE';

-- Step 3: Combined query (easier to use)
-- This joins both tables automatically
SELECT 
    u.id as user_id,
    u.email,
    u.created_at as user_created_at,
    p.credits,
    p.actor_credits,
    p.replicator_credits,
    p.subscription_plan,
    p.subscription_status,
    p.subscription_end_date,
    p.created_at as profile_created_at,
    p.updated_at as profile_updated_at,
    -- Access check
    CASE 
        WHEN p.credits > 0 OR p.actor_credits > 0 OR COALESCE(p.replicator_credits, 0) > 0 THEN 'YES'
        ELSE 'NO'
    END as has_credits,
    CASE 
        WHEN p.subscription_status = 'active' THEN 'YES'
        ELSE 'NO'
    END as has_active_subscription,
    CASE 
        WHEN p.subscription_status = 'active' 
            OR p.credits > 0 
            OR p.actor_credits > 0 
            OR COALESCE(p.replicator_credits, 0) > 0 
        THEN '✅ YES - Dashboard should appear'
        ELSE '❌ NO - Dashboard will NOT appear'
    END as should_see_dashboard
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'contact.admakerai@gmail.com';

-- Step 4: If you need to manually fix the profile, use this UPDATE query
-- ONLY run this if the diagnostic shows incorrect data
/*
UPDATE profiles
SET 
    subscription_plan = 'startup',
    subscription_status = 'active',
    credits = 100,  -- Adjust based on the Startup plan
    actor_credits = 10,  -- Adjust based on the Startup plan
    subscription_end_date = NOW() + INTERVAL '1 month'  -- Or '1 year' for annual
WHERE id = 'USER_ID_HERE';
*/
