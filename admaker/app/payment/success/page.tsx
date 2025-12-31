'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Success.module.css';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Countdown timer
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Redirect after 3 seconds
        const redirectTimeout = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectTimeout);
        };
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Animated Checkmark */}
                <div className={styles.checkmarkWrapper}>
                    <svg className={styles.checkmark} viewBox="0 0 52 52">
                        <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                        <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.message}>
                    Your subscription has been activated successfully.
                </p>

                {/* Countdown */}
                <div className={styles.countdown}>
                    <p>Redirecting to dashboard in <span className={styles.countdownNumber}>{countdown}</span>s</p>
                </div>

                {/* Manual redirect button */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className={styles.dashboardButton}
                >
                    Go to Dashboard Now
                </button>
            </div>
        </div>
    );
}
