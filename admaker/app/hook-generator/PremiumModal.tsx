import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './PremiumModal.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

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
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleUpgrade = () => {
        router.push('/payment');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className={styles.content}>
                    {/* Left side - Videos */}
                    <div className={styles.videosSection}>
                        <div className={styles.videoSlider}>
                            {[
                                getMediaUrl('video  beauté.mp4'),
                                getMediaUrl('video  bleu.mp4'),
                                getMediaUrl('video canette.mp4'),
                                getMediaUrl('video podcast.mp4'),
                                getMediaUrl('video podcast 2.mp4'),
                                getMediaUrl('video sportif.mp4')
                            ].map((videoUrl, index) => (
                                <div key={index} className={styles.videoCard}>
                                    <video
                                        src={videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={styles.video}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Message & CTA */}
                    <div className={styles.messageSection}>
                        <div className={styles.badge}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                            Limited Time Offer
                        </div>

                        <h2 className={styles.title}>
                            You've Used All Your <span className="gradient-text-red">Free Hooks!</span>
                        </h2>

                        <p className={styles.subtitle}>
                            Upgrade to Pro and unlock unlimited access to:
                        </p>

                        <ul className={styles.features}>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span><strong>Unlimited</strong> hook generations</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span><strong>AI UGC videos</strong> with 300+ actors</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span><strong>AI script enhancer</strong> for viral content</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span><strong>Winning ad replicator</strong></span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span><strong>Priority support</strong></span>
                            </li>
                        </ul>

                        {/* Discount Badge */}
                        <div className={styles.discountBadge}>
                            <div className={styles.discountText}>
                                <span className={styles.discountPercent}>-20%</span>
                                <span className={styles.discountLabel}>Special Offer</span>
                            </div>
                            <div className={styles.countdown}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>{formatTime(timeLeft)}</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className={styles.pricing}>
                            <div className={styles.oldPrice}>$36/month</div>
                            <div className={styles.newPrice}>
                                <span className={styles.currency}>$</span>
                                <span className={styles.amount}>29</span>
                                <span className={styles.period}>/month</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className={styles.upgradeBtn} onClick={handleUpgrade}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                            Upgrade to Pro Now
                        </button>

                        <p className={styles.guarantee}>
                            🔒 30-day money-back guarantee • Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
