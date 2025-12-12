'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

export default function Pricing() {
    const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');

    return (
        <section id="pricing" className={styles.pricing}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2>Start creating <span className="gradient-text-red">today</span></h2>
                    <p>Choose the plan that fits your needs</p>
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
                        Annual
                        <span className={styles.discountBadge}>-20%</span>
                    </button>
                </div>

                <div className={styles.pricingGrid}>
                    {/* Starter Plan */}
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h3>Starter</h3>
                            <p>For creators getting started</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            <span className={styles.price}>€29</span>
                            <span className={styles.period}>/month</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>10 videos per month</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>All avatars</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>HD 1080p</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Email support</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Choose this plan</a>
                    </div>

                    {/* Pro Plan */}
                    <div className={`${styles.pricingCard} ${styles.featured}`}>
                        <div className={styles.popularBadge}>Popular</div>
                        <div className={styles.pricingHeader}>
                            <h3>Pro</h3>
                            <p>For testing multiple creatives per month</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            <span className={styles.price}>€79</span>
                            <span className={styles.period}>/month</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>50 videos per month</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>All premium avatars</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>4K Ultra HD</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Priority support</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>API Access</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnPrimary}>Choose this plan</a>
                    </div>

                    {/* Enterprise Plan */}
                    <div className={styles.pricingCard}>
                        <div className={styles.pricingHeader}>
                            <h3>Enterprise</h3>
                            <p>For teams and power users</p>
                        </div>
                        <div className={styles.pricingPrice}>
                            <span className={styles.price}>€199</span>
                            <span className={styles.period}>/month</span>
                        </div>
                        <ul className={styles.pricingFeatures}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Unlimited videos</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Custom avatars</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>8K + RAW exports</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Dedicated 24/7 support</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Custom integrations</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnSecondary}>Contact us</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
