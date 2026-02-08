'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'
import { getUserData } from '@/app/actions/profile'
import { cancelSubscription } from '@/app/actions/stripe';
import Navbar from '@/components/Navbar';
import styles from '../../profile/Profile.module.css';

interface UserProfile {
    id: string;
    credits: number;
    actor_credits: number;
    replicator_credits?: number;
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
        setLoading(true);
        console.log('🔍 [Profil] Chargement des données via Server Action...');
        const startTime = performance.now();

        try {
            const { user, profile, error } = await getUserData();

            if (error) {
                console.error('🔍 [Profil] Erreur Server Action:', error);
                if (typeof error === 'string' && (error.includes('No user') || !user)) {
                    router.push('/fr/connexion');
                    return;
                }
            }

            if (user) {
                console.log('🔍 [Profil] Utilisateur trouvé:', user.email);
                setUserEmail(user.email || '');
            }

            if (profile) {
                console.log('🔍 [Profil] Profil chargé:', profile);
                console.log('🔍 [Profil] Crédits:', profile.credits);
                setProfile(profile);
            }
        } catch (e) {
            console.error('🔍 [Profil] Erreur inattendue:', e);
        } finally {
            const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`🔍 [Profil] Chargement terminé en ${totalTime}s`);
            setLoading(false);
        }
    };

    const handleUpgrade = () => {
        router.push('/fr/paiement');
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Vous conserverez vos avantages jusqu\'à la fin de la période en cours.')) {
            return;
        }

        setLoading(true);
        try {
            const result = await cancelSubscription();
            if (result.success) {
                alert('Votre abonnement a été annulé avec succès. Il prendra fin le : ' + (result.endDate || 'Fin de la période'));
                // Refresh profile data to update UI (though status remains until period end)
                loadUserData();
            } else {
                alert('Erreur lors de l\'annulation : ' + result.error);
            }
        } catch (error) {
            console.error('Erreur annulation :', error);
            alert('Une erreur est survenue.');
        } finally {
            setLoading(false);
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
                                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Crédits Acteur</span>
                                    <span className={styles.value}>{profile?.actor_credits || 0} crédits</span>
                                </div>
                            </div>

                            {profile?.replicator_credits !== undefined && profile?.replicator_credits > 0 && (
                                <div className={styles.infoItem}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    <div>
                                        <span className={styles.label}>Crédits Réplicateur</span>
                                        <span className={styles.value}>{profile?.replicator_credits} crédits</span>
                                    </div>
                                </div>
                            )}

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

                            <button
                                onClick={handleCancelSubscription}
                                className={`${styles.actionCard} ${styles.danger}`}
                                disabled={!isActive}
                                style={!isActive ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>Annuler l'abonnement</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

