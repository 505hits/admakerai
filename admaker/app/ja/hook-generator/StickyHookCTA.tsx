import { useState, useEffect } from 'react';
import styles from '../../hook-generator/StickyHookCTA.module.css';

export default function StickyHookCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${styles.stickyContainer} ${isVisible ? styles.visible : ''}`}>
            <button className={styles.ctaButton} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
                AIフックを生成
            </button>
        </div>
    );
}
