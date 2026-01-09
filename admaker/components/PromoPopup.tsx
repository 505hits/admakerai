'use client';

import { useState, useEffect } from 'react';
import styles from './PromoPopup.module.css';

interface PromoPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PromoPopup({ isOpen, onClose }: PromoPopupProps) {
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClaim = () => {
        window.location.href = '/pricing';
    };

    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className={styles.header}>
                    <div className={styles.badge}>🎉 LIMITED TIME OFFER</div>
                    <h2 className={styles.title}>
                        Get <span className={styles.highlight}>20% OFF</span> Your First Month!
                    </h2>
                </div>

                <div className={styles.timer}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Offer expires in <span className={styles.countdown}>{formatTime(timeLeft)}</span>
                </div>

                <div className={styles.pricing}>
                    <div className={styles.oldPrice}>$49/month</div>
                    <div className={styles.newPrice}>$39/month</div>
                    <div className={styles.savings}>Save $10/month</div>
                </div>

                <div className={styles.features}>
                    <h3>What You Get:</h3>
                    <ul>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span><strong>Unlimited Hooks</strong> - Generate viral hooks anytime</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span><strong>440+ Video Credits</strong> - Create professional UGC videos</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span><strong>440+ Actor Credits</strong> - Access AI actors</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span><strong>35+ Languages</strong> - Create in any language</span>
                        </li>
                    </ul>
                </div>

                <button className={styles.ctaBtn} onClick={handleClaim}>
                    <span>Claim 20% Off Now</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <p className={styles.guarantee}>
                    🔒 30-day money-back guarantee • Cancel anytime
                </p>
            </div>
        </div>
    );
}
