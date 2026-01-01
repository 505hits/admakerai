'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
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
        const startTime = performance.now();
        console.log('🔍 [Profile] Starting to load user data...');

        // Add a safety timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            console.warn(`⚠️ [Profile] Loading timed out after ${elapsed} seconds. Forcing loading to false.`);
            setLoading(false);
        }, 10000);

        try {
            // Get current user with timeout
            console.log('🔍 [Profile] Getting user from Supabase auth...');
            const authStart = performance.now();

            // Create a promise that times out after 5 seconds
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
                console.log(`🔍 [Profile] Auth query took ${authTime}s`);
            } catch (timeoutError) {
                console.error('🔍 [Profile] Auth query timed out, trying session fallback...');
                // Fallback: try to get session instead
                const { data: { session } } = await supabase.auth.getSession();
                user = session?.user;
                if (!user) {
                    console.log('🔍 [Profile] No session found either');
                    clearTimeout(timeoutId);
                    setLoading(false);
                    router.push('/login');
                    return;
                }
                console.log('🔍 [Profile] Got user from session fallback');
            }

            if (userError || !user) {
                console.log('🔍 [Profile] No user or error:', userError);
                clearTimeout(timeoutId);
                setLoading(false);
                router.push('/login');
                return;
            }

            console.log('🔍 [Profile] User found:', user.email);
            setUserEmail(user.email || '');

            // Get user profile from database with explicit field selection
            console.log('🔍 [Profile] Fetching profile data from DB for ID:', user.id);
            const profileStart = performance.now();
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, credits, actor_credits, subscription_plan, subscription_status, subscription_end_date, created_at, updated_at')
                .eq('id', user.id)
                .maybeSingle();
            const profileTime = ((performance.now() - profileStart) / 1000).toFixed(2);
            console.log(`🔍 [Profile] Profile query took ${profileTime}s`);

            console.log('🔍 [Profile] Raw profile data received:', profileData);
            console.log('🔍 [Profile] Credits value:', profileData?.credits);
            console.log('🔍 [Profile] Actor credits value:', profileData?.actor_credits);

            if (profileError) {
                console.error('🔍 [Profile] Profile error:', profileError);
                clearTimeout(timeoutId);
                setLoading(false);
                return;
            }

            if (!profileData) {
                console.log('🔍 [Profile] No profile found, attempting to create default profile');
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
                    console.error('🔍 [Profile] Failed to create default profile:', insertError);
                } else {
                    console.log('🔍 [Profile] Default profile created:', newProfile);
                    setProfile(newProfile);
                }
            } else {
                console.log('🔍 [Profile] Profile data loaded successfully');
                console.log('🔍 [Profile] Setting profile with credits:', profileData.credits);
                setProfile(profileData);
            }
        } catch (error) {
            console.error('🔍 [Profile] Critical error in loadUserData:', error);
        } finally {
            const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`🔍 [Profile] Load process finished in ${totalTime}s, clearing timeout and loading state.`);
            clearTimeout(timeoutId);
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

                            {isActive && (
                                <button onClick={handleCancelSubscription} className={`${styles.actionCard} ${styles.danger}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Cancel Subscription</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
