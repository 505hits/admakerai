'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

export default function Pricing() {
    const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');

    const pricingData = {
        monthly: {
            startup: { price: 34.90, videos: 10, customActors: 10 },
            growth: { price: 59.90, videos: 30, customActors: 50 },
            pro: { price: 99.90, videos: 30, customActors: 30 }
        },
        annual: {
            startup: { price: 27.90, originalPrice: 34.90, videos: 200, customActors: 120, totalBilling: 334.80 },
            growth: { price: 47.90, originalPrice: 59.90, videos: 600, customActors: 600, totalBilling: 574.80 },
            pro: { price: 79.90, originalPrice: 99.90, videos: 600, customActors: 360, totalBilling: 958.80 }
        }
    };

    const currentPricing = pricingData[plan];

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
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.startup.videos} AI-generated videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI actors</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.startup.customActors} custom AI actors{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Fast 2-min processing</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Sora 2</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product-in-hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Choose this plan</a>
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
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.growth.videos} AI-generated videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI actors</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.growth.customActors} custom AI actors{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Fast 2-min processing</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Sora 2</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product-in-hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnPrimary}>Choose this plan</a>
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
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.pro.videos} AI-generated videos{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI actors</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentPricing.pro.customActors} custom AI actors{plan === 'annual' ? ' /year' : ' /month'}</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Fast 2-min processing</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Sora 2</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product-in-hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Choose this plan</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
