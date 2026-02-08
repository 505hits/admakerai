'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackPurchase } from '@/lib/gtag';
import styles from './Success.module.css';

interface VerificationStatus {
    loading: boolean;
    verified: boolean;
    error: string | null;
    credits?: {
        video: number;
        actor: number;
        replicator: number;
    };
    plan?: string;
}

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const purchaseTracked = useRef(false);

    const [status, setStatus] = useState<VerificationStatus>({
        loading: true,
        verified: false,
        error: null,
    });
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!sessionId) {
            setStatus({
                loading: false,
                verified: false,
                error: 'No session ID found. Redirecting to dashboard...',
            });
            // Redirect anyway after 3 seconds if no session ID
            setTimeout(() => router.push('/dashboard'), 3000);
            return;
        }

        let attempts = 0;
        const maxAttempts = 15; // 15 attempts * 2 seconds = 30 seconds max

        const verifyCredits = async () => {
            try {
                const response = await fetch(`/api/payment/verify-credits?session_id=${sessionId}`);

                if (!response.ok) {
                    throw new Error('Failed to verify payment');
                }

                const data = await response.json();

                if (data.success && data.creditsAdded && data.planUpdated) {
                    // Track purchase event for Google Ads conversion (only once)
                    if (!purchaseTracked.current) {
                        purchaseTracked.current = true;

                        // Estimate value based on plan
                        const planPrices: Record<string, number> = {
                            startup: 49,
                            growth: 69,
                            pro: 99,
                        };
                        const planName = data.profile.subscriptionPlan || 'subscription';
                        const estimatedValue = planPrices[planName.toLowerCase()] || 49;

                        trackPurchase({
                            transactionId: sessionId,
                            value: estimatedValue,
                            currency: 'USD',
                            planName: planName,
                        });
                    }

                    // Credits verified successfully!
                    setStatus({
                        loading: false,
                        verified: true,
                        error: null,
                        credits: {
                            video: data.profile.videoCredits,
                            actor: data.profile.actorCredits,
                            replicator: data.profile.replicatorCredits,
                        },
                        plan: data.profile.subscriptionPlan,
                    });
                } else if (attempts >= maxAttempts) {
                    // Max attempts reached, redirect anyway
                    setStatus({
                        loading: false,
                        verified: false,
                        error: 'Verification taking longer than expected. Redirecting to dashboard...',
                    });
                } else {
                    // Keep trying
                    attempts++;
                    setTimeout(verifyCredits, 2000); // Try again in 2 seconds
                }
            } catch (error) {
                console.error('Error verifying credits:', error);
                if (attempts >= maxAttempts) {
                    setStatus({
                        loading: false,
                        verified: false,
                        error: 'Could not verify credits. Please check your dashboard.',
                    });
                } else {
                    attempts++;
                    setTimeout(verifyCredits, 2000);
                }
            }
        };

        // Start verification
        verifyCredits();
    }, [sessionId, router]);

    useEffect(() => {
        // Only start countdown when verified or error
        if (!status.loading && (status.verified || status.error)) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        router.push('/dashboard');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [status.loading, status.verified, status.error, router]);

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

                {status.loading ? (
                    <>
                        <p className={styles.message}>
                            Verifying your credits...
                        </p>
                        <div className={styles.countdown}>
                            <div className={styles.spinner}></div>
                        </div>
                    </>
                ) : status.verified ? (
                    <>
                        <p className={styles.message}>
                            Your <strong>{status.plan}</strong> subscription has been activated!
                        </p>
                        {status.credits && (
                            <div className={styles.creditsInfo}>
                                <p>✅ {status.credits.video} video credits added</p>
                                <p>✅ {status.credits.actor} actor credits added</p>
                                {status.credits.replicator > 0 && (
                                    <p>✅ {status.credits.replicator} replicator credits added</p>
                                )}
                            </div>
                        )}
                        <div className={styles.countdown}>
                            <p>Redirecting to dashboard in <span className={styles.countdownNumber}>{countdown}</span>s</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className={styles.message}>
                            {status.error || 'Your subscription has been activated successfully.'}
                        </p>
                        <div className={styles.countdown}>
                            <p>Redirecting to dashboard in <span className={styles.countdownNumber}>{countdown}</span>s</p>
                        </div>
                    </>
                )}

                {/* Manual redirect button */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className={styles.dashboardButton}
                    disabled={status.loading}
                >
                    {status.loading ? 'Verifying...' : 'Go to Dashboard Now'}
                </button>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.checkmarkWrapper}>
                        <svg className={styles.checkmark} viewBox="0 0 52 52">
                            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                            <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                    <h1 className={styles.title}>Payment Successful!</h1>
                    <p className={styles.message}>Loading...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
