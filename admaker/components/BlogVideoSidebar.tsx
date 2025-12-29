'use client';

import { useState, useEffect } from 'react';
import { getMediaUrl } from '@/lib/cloudflare-config';
import styles from './BlogVideoSidebar.module.css';

interface BlogVideoSidebarProps {
    locale?: string;
}

// Helper function to get the login URL based on locale
function getLoginUrl(locale: string = 'en'): string {
    const loginUrls: Record<string, string> = {
        'en': '/login',
        'es': '/es/iniciar-sesion',
        'fr': '/fr/connexion',
        'de': '/de/anmelden',
        'ko': '/ko/로그인',
        'pt': '/pt/entrar'
    };
    return loginUrls[locale] || '/login';
}

export default function BlogVideoSidebar({ locale = 'en' }: BlogVideoSidebarProps) {
    const [currentVideo, setCurrentVideo] = useState(0);

    const videos = [
        getMediaUrl('influ page auth 1.mp4'),
        getMediaUrl('influ page auth 2.mp4'),
        getMediaUrl('influ auth 3.mp4')
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.stickyContent}>
                <h3 className={styles.title}>See What You Can Create</h3>

                <div className={styles.videoContainer}>
                    <div className={styles.aiGeneratedBadge}>AI Generated</div>
                    {videos.map((video, index) => (
                        <video
                            key={index}
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`${styles.video} ${index === currentVideo ? styles.active : ''}`}
                        />
                    ))}
                </div>

                <div className={styles.videoDots}>
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentVideo ? styles.activeDot : ''}`}
                            onClick={() => setCurrentVideo(index)}
                            aria-label={`View video ${index + 1}`}
                        />
                    ))}
                </div>

                <a href={getLoginUrl(locale)} className={styles.ctaButton}>
                    Start Creating Videos Free
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>

                <p className={styles.ctaSubtext}>
                    No credit card required • 3 free videos
                </p>
            </div>
        </div>
    );
}
