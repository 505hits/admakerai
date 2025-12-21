'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import styles from './Pricing.module.css';

export default function Pricing() {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (plan: typeof plans[0], cycle: 'monthly' | 'annual') => {
        setLoading(plan.name);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            // Convert plan name to planType format expected by API
            const planType = plan.name.toLowerCase() as 'startup' | 'growth' | 'pro';

            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planType,
                    billingPeriod: cycle,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        } finally {
            setLoading(null);
        }
    };

    const plans = [
        {
            name: 'Startup',
            monthlyPrice: 49,
            annualPrice: 470, // 20% discount
            videoCredits: 440,
            videos: 22,
            actorCredits: 440,
            features: [
                'Up to 22 videos per month',
                '440 video credits',
                '440 actor credits',
                '35+ languages',
                'Product holding',
                'Outfit swapping',
            ],
        },
        {
            name: 'Growth',
            monthlyPrice: 69,
            annualPrice: 662, // 20% discount
            videoCredits: 1200,
            videos: 60,
            actorCredits: 1200,
            features: [
                'Up to 60 videos per month',
                '1200 video credits',
                '1200 actor credits',
                '100 replicator credits (5 replications)',
                '35+ languages',
                'Product holding',
                'Outfit swapping',
            ],
            popular: true,
        },
        {
            name: 'Pro',
            monthlyPrice: 99,
            annualPrice: 950, // 20% discount
            videoCredits: 2200,
            videos: 110,
            actorCredits: 2200,
            features: [
                'Up to 110 videos per month',
                '2200 video credits',
                '2200 actor credits',
                '200 replicator credits (10 replications)',
                '35+ languages',
                'Product holding',
                'Outfit swapping',
            ],
        },
    ];

    return (
        <section className={styles.pricingSection} id="pricing">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Choose Your Perfect Plan</h2>
                    <p className={styles.subtitle}>
                        Start creating professional AI UGC videos in minutes
                    </p>

                    <div className={styles.pricingToggle}>
                        <button
                            className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${billingCycle === 'annual' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            Annual
                            <span className={styles.discountBadge}>Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${styles.pricingCard} ${plan.popular ? styles.featured : ''}`}
                        >
                            {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}

                            <div className={styles.pricingHeader}>
                                <h3>{plan.name}</h3>
                                <div className={styles.pricingPrice}>
                                    <span className={styles.price}>
                                        ${billingCycle === 'monthly' ? plan.monthlyPrice : (plan.annualPrice / 12).toFixed(2)}
                                    </span>
                                    <span className={styles.period}>/month</span>
                                </div>
                                {billingCycle === 'annual' && (
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                                        ${plan.annualPrice} billed annually
                                    </p>
                                )}
                            </div>

                            <ul className={styles.pricingFeatures}>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className={styles.feature}>
                                        <svg
                                            className={styles.checkIcon}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 10L8 14L16 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={styles.btnPrimary}
                                onClick={() => handleCheckout(plan, billingCycle)}
                                disabled={loading === plan.name}
                            >
                                {loading === plan.name ? 'Loading...' : 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
