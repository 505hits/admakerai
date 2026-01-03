import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../hook-generator/PremiumModal.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useEffect(() => {
        if (!isOpen) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev <= 1 ? 0 : prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className={styles.modalBody}>
                    <div className={styles.videosSection}>
                        <div className={styles.videoScroll}>
                            {['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4'].map((video, index) => (
                                <div key={index} className={styles.videoWrapper}>
                                    <video autoPlay loop muted playsInline className={styles.video}>
                                        <source src={getMediaUrl(`examples/${video}`)} type="video/mp4" />
                                    </video>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.offerSection}>
                        <div className={styles.countdown}>
                            <div className={styles.countdownLabel}>⏰ 한정 제안 종료까지</div>
                            <div className={styles.countdownTime}>{formatTime(timeLeft)}</div>
                        </div>

                        <h2 className={styles.title}>
                            <span className="gradient-text-red">무제한 훅</span> 잠금 해제
                        </h2>

                        <p className={styles.subtitle}>
                            무료 한도에 도달했습니다. Pro로 업그레이드하여 무제한 훅 생성과 전환율 높은 비디오를 만드세요.
                        </p>

                        <div className={styles.priceBox}>
                            <div className={styles.oldPrice}>36€/월</div>
                            <div className={styles.newPrice}>
                                <span className={styles.currency}>€</span>
                                <span className={styles.amount}>29</span>
                                <span className={styles.period}>/월</span>
                            </div>
                            <div className={styles.discount}>-20% 오늘만</div>
                        </div>

                        <div className={styles.features}>
                            {['무제한 훅 생성', 'AI 배우로 비디오 제작', '무제한 HD 내보내기', '우선 지원'].map((feature, i) => (
                                <div key={i} className={styles.feature}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17L4 12" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className={styles.upgradeBtn} onClick={() => router.push('/ko/payment')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                            지금 Pro로 업그레이드
                        </button>

                        <div className={styles.guarantee}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>30일 환불 보장 • 언제든지 취소 가능</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
