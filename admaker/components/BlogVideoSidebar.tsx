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

    // Translations
    const translations: Record<string, { title: string; badge: string; cta: string; subtext: string }> = {
        'en': {
            title: 'See What You Can Create',
            badge: 'AI Generated',
            cta: 'Start Creating Videos Free',
            subtext: 'No credit card required • 3 free videos'
        },
        'fr': {
            title: 'Voyez Ce Que Vous Pouvez Créer',
            badge: 'Généré par IA',
            cta: 'Commencez à Créer des Vidéos Gratuitement',
            subtext: 'Aucune carte bancaire requise • 3 vidéos gratuites'
        },
        'es': {
            title: 'Mira Lo Que Puedes Crear',
            badge: 'Generado por IA',
            cta: 'Comienza a Crear Videos Gratis',
            subtext: 'No se requiere tarjeta de crédito • 3 videos gratis'
        },
        'de': {
            title: 'Sehen Sie, Was Sie Erstellen Können',
            badge: 'KI-Generiert',
            cta: 'Kostenlos Videos Erstellen',
            subtext: 'Keine Kreditkarte erforderlich • 3 kostenlose Videos'
        },
        'pt': {
            title: 'Veja O Que Você Pode Criar',
            badge: 'Gerado por IA',
            cta: 'Comece a Criar Vídeos Grátis',
            subtext: 'Sem cartão de crédito • 3 vídeos grátis'
        },
        'ko': {
            title: '만들 수 있는 것을 확인하세요',
            badge: 'AI 생성',
            cta: '무료로 비디오 만들기 시작',
            subtext: '신용카드 불필요 • 무료 비디오 3개'
        }
    };

    const t = translations[locale] || translations['en'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.stickyContent}>
                <h3 className={styles.title}>{t.title}</h3>

                <div className={styles.videoContainer}>
                    <div className={styles.aiGeneratedBadge}>{t.badge}</div>
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

                <a href={locale === 'en' ? '/' : `/${locale}`} className={styles.ctaButton}>
                    {t.cta}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>

                <p className={styles.ctaSubtext}>
                    {t.subtext}
                </p>
            </div>
        </div>
    );
}
