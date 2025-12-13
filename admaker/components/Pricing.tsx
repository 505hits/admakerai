'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

export default function Pricing() {
    const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');

    const pricingData = {
        monthly: {
            startup: { price: 49, videos: 5 },
            growth: { price: 69, videos: 10 },
            pro: { price: 119, videos: 20 }
        },
        annual: {
            startup: { price: 39, originalPrice: 49, videos: 60 },
            growth: { price: 59, originalPrice: 69, videos: 120 },
            pro: { price: 99, originalPrice: 119, videos: 240 }
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
                                <span>{currentPricing.startup.videos} AI-generated videos</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI creators</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35+ language available</span>
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
                                <span>Bulk content creation</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>B-roll generator</span>
                            </li>
                            <li className={styles.disabled}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M6 6L14 14M6 14L14 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>Product-in-hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Choose this plan</a>
                    </div>

                    {/* Growth Plan */}
                    <div className={styles.pricingCard}>
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
                                <span>{currentPricing.growth.videos} AI-generated videos</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI creators</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35+ language available</span>
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
                                <span>Bulk content creation</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>B-roll generator</span>
                            </li>
                            <li className={styles.disabled}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M6 6L14 14M6 14L14 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>Product-in-hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Choose this plan</a>
                    </div>

                    {/* Pro Plan */}
                    <div className={`${styles.pricingCard} ${styles.featured}`}>
                        <div className={styles.popularBadge}>Best value 🔥</div>
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
                                <span>{currentPricing.pro.videos} AI-generated videos</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>300+ realistic AI creators</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>35+ language available</span>
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
                                <span>Bulk content creation</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>B-roll generator</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Product in hand</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnPrimary}>Choose this plan</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
