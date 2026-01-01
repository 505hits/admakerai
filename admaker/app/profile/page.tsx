'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'
import { getUserData } from '@/app/actions/profile';
import Navbar from '@/components/Navbar';
import styles from './Profile.module.css';

interface UserProfile {
    id: string;
    credits: number;
    subscription_plan: string;
    subscription_status: string;
    subscription_end_date: string | null;
}

export default function ProfilePage() {
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
        console.log('🔍 [Profile] Loading user data via Server Action...');
        const startTime = performance.now();

        try {
            const { user, profile, error } = await getUserData();

            if (error) {
                console.error('🔍 [Profile] Server Action Error:', error);
                if (typeof error === 'string' && (error.includes('No user') || !user)) {
                    router.push('/login');
                    return;
                }
            }

            if (user) {
                console.log('🔍 [Profile] User found:', user.email);
                setUserEmail(user.email || '');
            }

            if (profile) {
                console.log('🔍 [Profile] Profile loaded:', profile);
                console.log('🔍 [Profile] Credits:', profile.credits);
                setProfile(profile);
            }
        } catch (e) {
            console.error('🔍 [Profile] Unexpected error:', e);
        } finally {
            const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`🔍 [Profile] Load complete in ${totalTime}s`);
            setLoading(false);
        }
    };

    const handleUpgrade = () => {
        router.push('/payment');
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
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

            alert('Your subscription has been cancelled. You will retain access until the end of the paid period.');
            loadUserData(); // Reload data
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Error cancelling subscription');
        }
    };

    // Show loading indicator but don't block the entire page
    const isLoading = loading && !profile;

    const planNames: { [key: string]: string } = {
        'free': 'Free',
        'startup': 'Startup',
        'growth': 'Growth',
        'pro': 'Pro'
    };

    const planName = planNames[profile?.subscription_plan || 'free'] || 'Free';
    const isActive = profile?.subscription_status === 'active';

    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <h1 className={styles.pageTitle}>
                                My Account {isLoading && <span style={{ fontSize: '14px', opacity: 0.7 }}>Loading...</span>}
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
                                    <span className={styles.label}>Credits</span>
                                    <span className={styles.value}>{profile?.credits || 0} credits</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Status</span>
                                    <span className={styles.value}>
                                        {isActive ? '✅ Active' : '❌ Inactive'}
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
                                        <span className={styles.label}>Renewal</span>
                                        <span className={styles.value}>
                                            {new Date(profile.subscription_end_date).toLocaleDateString('en-US')}
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
                                <span>Upgrade Plan</span>
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

                            <button
                                onClick={handleCancelSubscription}
                                className={`${styles.actionCard} ${styles.danger}`}
                                disabled={!isActive}
                                style={!isActive ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>Cancel Subscription</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
