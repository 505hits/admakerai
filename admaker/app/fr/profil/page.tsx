'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import styles from '../../profile/Profile.module.css';

interface UserProfile {
    id: string;
    credits: number;
    subscription_plan: string;
    subscription_status: string;
    subscription_end_date: string | null;
}

export default function ProfilPage() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const startTime = performance.now();
        console.log('🔍 [Profil] Début du chargement des données utilisateur...');

        // Timeout de sécurité (10s)
        const timeoutId = setTimeout(() => {
            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            console.warn(`⚠️ [Profil] Le chargement a expiré après ${elapsed} secondes. Désactivation forcée.`);
            setLoading(false);
        }, 10000);

        try {
            console.log('🔍 [Profil] Récupération de l\'utilisateur depuis Supabase...');
            const authStart = performance.now();

            // 1. Try getUser with 5s timeout
            const getUserPromise = supabase.auth.getUser();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Auth timeout')), 5000)
            );

            let user;
            let userError;

            try {
                const result = await Promise.race([getUserPromise, timeoutPromise]) as any;
                user = result.data?.user;
                userError = result.error;
                const authTime = ((performance.now() - authStart) / 1000).toFixed(2);
                console.log(`🔍 [Profil] Auth query took ${authTime}s`);
            } catch (timeoutError) {
                console.error('🔍 [Profil] Timeout auth, tentative fallback session...');

                // 2. Fallback: getSession with 2s timeout
                const getSessionPromise = supabase.auth.getSession();
                const sessionTimeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Session timeout')), 2000)
                );

                try {
                    console.log('🔍 [Profil] Appel getSession...');
                    const sessionResult = await Promise.race([getSessionPromise, sessionTimeoutPromise]) as any;
                    const { data: { session } } = sessionResult;
                    user = session?.user;
                    if (user) console.log('🔍 [Profil] Utilisateur récupéré depuis fallback session');
                } catch (e) {
                    console.error('🔍 [Profil] Fallback session a aussi échoué/timeout:', e);
                }
            }

            if (userError || !user) {
                console.log('🔍 [Profil] Pas d\'utilisateur ou erreur:', userError);
                clearTimeout(timeoutId);
                setLoading(false);
                router.push('/fr/connexion');
                return;
            }

            console.log('🔍 [Profil] Utilisateur trouvé:', user.email);
            setUserEmail(user.email || '');

            // Get user profile from database with explicit field selection
            console.log('🔍 [Profil] Récupération du profil depuis la DB pour ID:', user.id);
            const profileStart = performance.now();
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, credits, actor_credits, subscription_plan, subscription_status, subscription_end_date, created_at, updated_at')
                .eq('id', user.id)
                .maybeSingle();
            const profileTime = ((performance.now() - profileStart) / 1000).toFixed(2);
            console.log(`🔍 [Profil] Profile query took ${profileTime}s`);

            console.log('🔍 [Profil] Données de profil brutes reçues:', profileData);
            console.log('🔍 [Profil] Valeur des crédits:', profileData?.credits);
            console.log('🔍 [Profil] Valeur des crédits acteur:', profileData?.actor_credits);

            if (profileError) {
                console.error('🔍 [Profil] Erreur de profil:', profileError);
                clearTimeout(timeoutId);
                setLoading(false);
                return;
            }

            if (!profileData) {
                console.log('🔍 [Profil] Aucun profil trouvé, tentative de création d\'un profil par défaut');
                // Create default profile if doesn't exist
                const { data: newProfile, error: insertError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: user.id,
                        credits: 0,
                        actor_credits: 0,
                        subscription_plan: 'free',
                        subscription_status: 'inactive'
                    }])
                    .select()
                    .single();

                if (insertError) {
                    console.error('🔍 [Profil] Échec de la création du profil par défaut:', insertError);
                } else {
                    console.log('🔍 [Profil] Profil par défaut créé:', newProfile);
                    setProfile(newProfile);
                }
            } else {
                console.log('🔍 [Profil] Données de profil chargées avec succès');
                console.log('🔍 [Profil] Définition du profil avec crédits:', profileData.credits);
                setProfile(profileData);
            }
        } catch (error) {
            console.error('🔍 [Profil] Erreur critique dans loadUserData:', error);
        } finally {
            const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`🔍 [Profil] Chargement terminé en ${totalTime}s, nettoyage.`);
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleUpgrade = () => {
        router.push('/fr/paiement');
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l\'accès aux fonctionnalités premium.')) {
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('profiles')
                .update({
                    subscription_status: 'cancelled',
                    subscription_plan: 'free'
                })
                .eq('id', user.id);

            if (error) throw error;

            alert('Votre abonnement a été annulé. Vous conservez l\'accès jusqu\'à la fin de la période payée.');
            loadUserData(); // Reload data
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Erreur lors de l\'annulation de l\'abonnement');
        }
    };

    // Afficher l'indicateur de chargement mais ne pas bloquer la page entière
    const isLoading = loading && !profile;

    const planNames: { [key: string]: string } = {
        'free': 'Gratuit',
        'startup': 'Startup',
        'growth': 'Growth',
        'pro': 'Pro'
    };

    const planName = planNames[profile?.subscription_plan || 'free'] || 'Gratuit';
    const isActive = profile?.subscription_status === 'active';

    return (
        <>
            <Navbar lang="fr" />
            <div className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <h1 className={styles.pageTitle}>
                                Mon Compte {isLoading && <span style={{ fontSize: '14px', opacity: 0.7 }}>Chargement...</span>}
                            </h1>
                            <span className={`${styles.planBadge} ${styles.large} ${isActive ? styles.active : ''}`}>
                                {planName}
                            </span>
                        </div>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 6l7-3 7 3v6c0 4-7 8-7 8s-7-4-7-8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.value}>{userEmail}</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Crédits</span>
                                    <span className={styles.value}>{profile?.credits || 0} crédits</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Statut</span>
                                    <span className={styles.value}>
                                        {isActive ? '✅ Actif' : '❌ Inactif'}
                                    </span>
                                </div>
                            </div>

                            {profile?.subscription_end_date && (
                                <div className={styles.infoItem}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <div>
                                        <span className={styles.label}>Renouvellement</span>
                                        <span className={styles.value}>
                                            {new Date(profile.subscription_end_date).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.actionsGrid}>
                            <button onClick={handleUpgrade} className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                                <span>Améliorer le Plan</span>
                            </button>

                            <a href="/fr/tableau-de-bord" className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Tableau de Bord</span>
                            </a>

                            {isActive && (
                                <button onClick={handleCancelSubscription} className={`${styles.actionCard} ${styles.danger}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Annuler l'abonnement</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

