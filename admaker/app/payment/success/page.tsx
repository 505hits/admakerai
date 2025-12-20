'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import styles from './Success.module.css';

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [credits, setCredits] = useState<{ video: number; actor: number } | null>(null);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Fetch updated credits
        const fetchCredits = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('credits, actor_credits')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setCredits({
                        video: profile.credits || 0,
                        actor: profile.actor_credits || 0
                    });
                }
            }
        };

        fetchCredits();

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/dashboard');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router, searchParams]);

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.glow}></div>
            </div>

            <div className={styles.card}>
                {/* Success Animation */}
                <div className={styles.iconContainer}>
                    <div className={styles.successIcon}>
                        <svg className={styles.checkmark} viewBox="0 0 52 52">
                            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                            <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.subtitle}>Your credits have been added to your account</p>

                {/* Credits Display */}
                {credits && (
                    <div className={styles.creditsDisplay}>
                        <div className={styles.creditItem}>
                            <div className={styles.creditIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className={styles.creditInfo}>
                                <span className={styles.creditLabel}>Video Credits</span>
                                <span className={styles.creditValue}>{credits.video}</span>
                            </div>
                        </div>
                        <div className={styles.creditItem}>
                            <div className={styles.creditIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className={styles.creditInfo}>
                                <span className={styles.creditLabel}>Actor Credits</span>
                                <span className={styles.creditValue}>{credits.actor}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Redirect Message */}
                <div className={styles.redirectMessage}>
                    <div className={styles.spinner}></div>
                    <p>Redirecting to dashboard in {countdown}s...</p>
                </div>

                {/* Manual Redirect Button */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className={styles.dashboardBtn}
                >
                    Go to Dashboard Now
                </button>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className={styles.container}>
                <div className={styles.background}>
                    <div className={styles.glow}></div>
                </div>
                <div className={styles.card}>
                    <div className={styles.spinner}></div>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
