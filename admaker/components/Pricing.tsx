'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

type PlanType = 'startup' | 'growth' | 'pro';

export default function Pricing() {
    const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const pricingData = {
        monthly: {
            startup: { price: 49, videos: 22, videoCredits: 440, actorCredits: 440 },
            growth: { price: 69, videos: 60, videoCredits: 1200, actorCredits: 1200 },
            pro: { price: 99, videos: 110, videoCredits: 2200, actorCredits: 2200 }
        },
        annual: {
            startup: { price: 39.20, originalPrice: 49, videos: 264, videoCredits: 5280, actorCredits: 5280, totalBilling: 470.40 },
            growth: { price: 55.20, originalPrice: 69, videos: 720, videoCredits: 14400, actorCredits: 14400, totalBilling: 662.40 },
            pro: { price: 79.20, originalPrice: 99, videos: 1320, videoCredits: 26400, actorCredits: 26400, totalBilling: 950.40 }
        }
    };

    const currentPricing = pricingData[plan];

    const handleCheckout = async (planType: PlanType) => {
        try {
            setLoadingPlan(`${planType}-${plan}`);

            console.log('🔵 Starting checkout for:', planType, plan);

            // Call API to create checkout session
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planType,
                    billingPeriod: plan,
                }),
            });

            console.log('🔵 Response status:', response.status);
            const data = await response.json();
            console.log('🔵 Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout using the session URL
            console.log('🔵 Redirecting to Stripe Checkout...');
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received from server');
            }
        } catch (error) {
            console.error('❌ Checkout error:', error);
            alert(`Une erreur est survenue lors du paiement: ${error instanceof Error ? error.message : 'Unknown error'}. Veuillez réessayer.`);
            setLoadingPlan(null);
        }
    };


    return (
        <section id="pricing" className={styles.pricing}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2>Start creating <span className="gradient-text-red">today</span></h2>
                    <p>Choose the best plan for your needs</p>
                </div>

                <div className={styles.pricingToggle}>
                    <button
                        className={`${styles.toggleBtn} ${plan === 'monthly' ? styles.active : ''}`}
                        onClick={() => setPlan('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${plan === 'annual' ? styles.active : ''}`}
                        onClick={() => setPlan('annual')}
                    >
                        Yearly
                        <span className={styles.discountBadge}>-20%</span>
                    </button>
                </div>

                <div className={styles.pricingGrid}>
                    {/* Startup Plan */}
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h3>Startup</h3>
                            <p>For creators getting started</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            {plan === 'annual' && 'originalPrice' in currentPricing.startup && (
                                <span className={styles.originalPrice}>${currentPricing.startup.originalPrice}</span>
                            )}
                            <span className={styles.price}>${currentPricing.startup.price}</span>
                            <span className={styles.period}>USD / monthly</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.startup.videoCredits} video credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Generate up to {currentPricing.startup.videos} videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.startup.actorCredits} actor credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35 languages</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product holding</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Outfit swapping</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout('startup')}
                            disabled={loadingPlan !== null}
                            className={styles.btnSecondary}
                        >
                            {loadingPlan === `startup-${plan}` ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>

                    {/* Growth Plan */}
                    <div className={`${styles.pricingCard} ${styles.featured}`}>
                        <div className={styles.popularBadge}>Best value 🔥</div>
                        <div className={styles.pricingHeader}>
                            <h3>Growth</h3>
                            <p>Testing many creatives a month</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            {plan === 'annual' && 'originalPrice' in currentPricing.growth && (
                                <span className={styles.originalPrice}>${currentPricing.growth.originalPrice}</span>
                            )}
                            <span className={styles.price}>${currentPricing.growth.price}</span>
                            <span className={styles.period}>USD / monthly</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.growth.videoCredits} video credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Generate up to {currentPricing.growth.videos} videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.growth.actorCredits} actor credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35 languages</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product holding</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Outfit swapping</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout('growth')}
                            disabled={loadingPlan !== null}
                            className={styles.btnPrimary}
                        >
                            {loadingPlan === `growth-${plan}` ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h3>Pro</h3>
                            <p>For growing teams and power users</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            {plan === 'annual' && 'originalPrice' in currentPricing.pro && (
                                <span className={styles.originalPrice}>${currentPricing.pro.originalPrice}</span>
                            )}
                            <span className={styles.price}>${currentPricing.pro.price}</span>
                            <span className={styles.period}>USD / monthly</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.pro.videoCredits} video credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Generate up to {currentPricing.pro.videos} videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.pro.actorCredits} actor credits{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35 languages</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product holding</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Outfit swapping</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout('pro')}
                            disabled={loadingPlan !== null}
                            className={styles.btnSecondary}
                        >
                            {loadingPlan === `pro-${plan}` ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
