'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './Profile.module.css';

export default function ProfilePage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [subscriptionPlan, setSubscriptionPlan] = useState('Free');

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        // Get user data from localStorage
        setUserEmail(localStorage.getItem('userEmail') || 'user@example.com');
        setSubscriptionPlan(localStorage.getItem('subscriptionPlan') || 'Free');
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('subscriptionPlan');
        router.push('/');
    };

    const handleUnsubscribe = () => {
        if (confirm('Are you sure you want to unsubscribe? You will lose access to premium features.')) {
            localStorage.setItem('subscriptionPlan', 'Free');
            setSubscriptionPlan('Free');
            alert('You have been unsubscribed from your current plan.');
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <h1 className={styles.pageTitle}>My Account</h1>
                            <span className={`${styles.planBadge} ${styles.large}`}>
                                {subscriptionPlan}
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
                                    <span className={styles.label}>Plan</span>
                                    <span className={styles.value}>{subscriptionPlan}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actionsGrid}>
                            <a href="/#pricing" className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                                <span>Upgrade Plan</span>
                            </a>
                            <a href="/dashboard" className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Dashboard</span>
                            </a>
                            {subscriptionPlan !== 'Free' && (
                                <button onClick={handleUnsubscribe} className={`${styles.actionCard} ${styles.danger}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Unsubscribe</span>
                                </button>
                            )}
                            <button onClick={handleLogout} className={`${styles.actionCard} ${styles.secondary}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M16 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4M10 20l-6-6 6-6M4 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
