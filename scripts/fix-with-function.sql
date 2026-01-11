-- ✅ FONCTION SQL POUR CONTOURNER RLS
-- Cette fonction contournera les politiques RLS

-- Étape 1: Créer la fonction
CREATE OR REPLACE FUNCTION fix_user_profile(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER  -- Cette ligne permet de contourner RLS
AS $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Trouver l'ID de l'utilisateur
    SELECT id INTO user_uuid
    FROM auth.users
    WHERE email = user_email;
    
    -- Mettre à jour le profil
    UPDATE profiles
    SET 
        subscription_plan = 'startup',
        subscription_status = 'active',
        credits = 440,
        actor_credits = 440,
        replicator_credits = 0,
        subscription_end_date = NOW() + INTERVAL '1 month',
        updated_at = NOW()
    WHERE id = user_uuid;
    
    RAISE NOTICE 'Profile updated for user: %', user_email;
END;
$$;

-- Étape 2: Exécuter la fonction
SELECT fix_user_profile('contact.admakerai@gmail.com');

-- Étape 3: Vérifier
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

-- Étape 4: Nettoyer (optionnel - supprime la fonction après usage)
-- DROP FUNCTION IF EXISTS fix_user_profile(TEXT);
