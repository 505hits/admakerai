'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
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
        console.log('🔍 [Profil] Benutzerdaten werden geladen...');

        // Sicherheits-Timeout, um unendliches Laden zu verhindern
        const timeoutId = setTimeout(() => {
            console.warn('⚠️ [Profil] Laden nach 3 Sekunden abgebrochen. Ladezustand wird erzwungen.');
            setLoading(false);
        }, 3000);

        try {
            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                clearTimeout(timeoutId);
                setLoading(false);
                router.push('/de/anmelden');
                return;
            }

            setUserEmail(user.email || '');

            // Get user profile from database with explicit field selection
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, credits, actor_credits, replicator_credits, subscription_plan, subscription_status, subscription_end_date, created_at, updated_at')
                .eq('id', user.id)
                .maybeSingle();

            if (profileError) {
                console.error('🔍 [Profil] Profilfehler:', profileError);
                clearTimeout(timeoutId);
                setLoading(false);
                return;
            }

            if (!profileData) {
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
                    console.error('🔍 [Profil] Standardprofil konnte nicht erstellt werden:', insertError);
                } else {
                    setProfile(newProfile);
                }
            } else {
                setProfile(profileData);
            }
        } catch (error) {
            console.error('🔍 [Profil] Kritischer Fehler in loadUserData:', error);
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleUpgrade = () => {
        router.push('/de/zahlung');
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Sind Sie sicher, dass Sie Ihr Abonnement kündigen möchten? Sie verlieren den Zugriff auf Premium-Funktionen.')) {
            return;
        }

        try {
            const result = await cancelSubscription();

            if (result.success) {
                alert('Ihr Abonnement wurde gekündigt. Sie behalten den Zugriff bis zum Ende des bezahlten Zeitraums.');
                loadUserData(); // Reload data
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Fehler beim Kündigen des Abonnements: ' + error);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar lang="de" />
                <div className={styles.profileContainer}>
                    <div className="container">
                        <div className={styles.loading}>Laden...</div>
                    </div>
                </div>
            </>
        );
    }

    const planNames: { [key: string]: string } = {
        'free': 'Kostenlos',
        'startup': 'Startup',
        'growth': 'Growth',
        'pro': 'Pro'
    };

    const planName = planNames[profile?.subscription_plan || 'free'] || 'Kostenlos';
    const isActive = profile?.subscription_status === 'active';

    return (
        <>
            <Navbar lang="de" />
            <div className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <h1 className={styles.pageTitle}>Mein Konto</h1>
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
                                    <span className={styles.label}>Video-Credits</span>
                                    <span className={styles.value}>{profile?.credits || 0} Credits</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Schauspieler-Credits</span>
                                    <span className={styles.value}>{profile?.actor_credits || 0} Credits</span>
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
                                        <span className={styles.label}>Replikator-Credits</span>
                                        <span className={styles.value}>{profile?.replicator_credits} Credits</span>
                                    </div>
                                </div>
                            )}

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Status</span>
                                    <span className={styles.value}>
                                        {isActive ? '✅ Aktiv' : '❌ Inaktiv'}
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
                                        <span className={styles.label}>Erneuerung</span>
                                        <span className={styles.value}>
                                            {new Date(profile.subscription_end_date).toLocaleDateString('de-DE')}
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
                                <span>Plan Upgraden</span>
                            </button>

                            <a href="/dashboard" className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Dashboard</span>
                            </a>

                            {isActive && (
                                <button onClick={handleCancelSubscription} className={`${styles.actionCard} ${styles.danger}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Abonnement kündigen</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
