-- ✅ REQUÊTE AVEC BYPASS RLS
-- Dans Supabase SQL Editor, assurez-vous de sélectionner le rôle "postgres" en haut à droite
-- (pas "authenticated" ou "anon")

UPDATE profiles
SET 
    subscription_plan = 'startup',
    subscription_status = 'active',
    credits = 440,
    actor_credits = 440,
    replicator_credits = 0,
    subscription_end_date = NOW() + INTERVAL '1 month',
    updated_at = NOW()
WHERE id = '97399063-fc6c-4b29-9cbb-f85cf91e8949';

-- Vérification
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
