'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingCTA.module.css';

interface FloatingCTAProps {
    text: string;
    href: string;
}

export default function FloatingCTA({ text, href }: FloatingCTAProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <a
            href={href}
            className={`${styles.floatingCTA} ${isVisible ? styles.visible : ''}`}
            aria-label={text}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 10 10)" />
            </svg>
            <span>{text}</span>
        </a>
    );
}
