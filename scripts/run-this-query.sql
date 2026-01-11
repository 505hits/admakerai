-- ✅ EXECUTE THIS QUERY IN SUPABASE SQL EDITOR
-- This is the complete diagnostic query for contact.admakerai@gmail.com

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
