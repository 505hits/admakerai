'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

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
                'Product holding (20 credits/video)',
                'Outfit swapping (20 credits/image)',
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
                '35+ languages',
                'Product holding (20 credits/video)',
                'Outfit swapping (20 credits/image)',
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
                '35+ languages',
                'Product holding (20 credits/video)',
                'Outfit swapping (20 credits/image)',
            ],
        },
    ];

    return (
        <section className={styles.pricingSection} id="pricing">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Simple, Transparent Pricing</h2>
                    <p className={styles.subtitle}>
                        Choose the perfect plan for your AI UGC video creation needs
                    </p>

                    <div className={styles.billingToggle}>
                        <button
                            className={`${styles.toggleButton} ${billingCycle === 'monthly' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`${styles.toggleButton} ${billingCycle === 'annual' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            Annual
                            <span className={styles.discount}>Save 20%</span>
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
                                        ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                                    </span>
                                    <span className={styles.period}>/month</span>
                                </div>
                                {billingCycle === 'annual' && (
                                    <p className={styles.billedAnnually}>
                                        Billed ${plan.annualPrice} annually
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

                            <button className={styles.btnPrimary}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Need a custom plan? <a href="#contact" className={styles.btnSecondary}>Contact us</a>
                    </p>
                </div>
            </div>
        </section>
    );
}
