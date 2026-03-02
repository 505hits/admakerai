'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/blog/compare-pricing-ugc-video-production-tools/Article.module.css';

interface StickyCtaProps {
    locale: string;
}

export default function StickyCta({ locale }: StickyCtaProps) {
    const [showStickyCta, setShowStickyCta] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCta(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case they loaded scrolled down
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLandingPageUrl = (loc: string) => {
        if (loc === 'en') return '/';
        return `/${loc}`;
    };

    const landingPageUrl = getLandingPageUrl(locale);

    return (
        <a
            href={landingPageUrl}
            className={`${styles.stickyCta} ${showStickyCta ? styles.stickyCtaVisible : ''}`}
            aria-label="Create your AI Ads now"
        >
            Create your AI Ads now <span className={styles.emojiPointer}>👉</span>
        </a>
    );
}
