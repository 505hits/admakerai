'use client';

import styles from './Footer.module.css';

interface FooterProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja';
}

export default function Footer({ lang = 'en' }: FooterProps) {
    const translations = {
        en: {
            tagline: 'The #1 platform to create AI video ads in minutes.',
            features: 'Features',
            pricing: 'Pricing',
            blog: 'Blog',
            legal: 'Legal',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            contact: 'Contact',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Follow Us',
            copyright: '© 2026 AdMaker AI. All rights reserved.',
        },
        fr: {
            tagline: 'La plateforme n°1 pour créer des publicités vidéo IA en quelques minutes.',
            features: 'Fonctionnalités',
            pricing: 'Tarifs',
            blog: 'Blog',
            legal: 'Légal',
            terms: 'Conditions d\'utilisation',
            privacy: 'Politique de confidentialité',
            contact: 'Contact',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Suivez-nous',
            copyright: '© 2026 AdMaker AI. Tous droits réservés.',
        },
        es: {
            tagline: 'La plataforma n°1 para crear anuncios de video con IA en minutos.',
            features: 'Características',
            pricing: 'Precios',
            blog: 'Blog',
            legal: 'Legal',
            terms: 'Términos de servicio',
            privacy: 'Política de privacidad',
            contact: 'Contacto',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Síguenos',
            copyright: '© 2026 AdMaker AI. Todos los derechos reservados.',
        },
        pt: {
            tagline: 'A plataforma nº1 para criar anúncios de vídeo com IA em minutos.',
            features: 'Recursos',
            pricing: 'Preços',
            blog: 'Blog',
            legal: 'Legal',
            terms: 'Termos de serviço',
            privacy: 'Política de privacidade',
            contact: 'Contato',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Siga-nos',
            copyright: '© 2026 AdMaker AI. Todos os direitos reservados.',
        },
        ko: {
            tagline: '몇 분 만에 AI 비디오 광고를 만드는 1위 플랫폼.',
            features: '기능',
            pricing: '가격',
            blog: '블로그',
            legal: '법적 고지',
            terms: '서비스 약관',
            privacy: '개인정보 보호정책',
            contact: '연락처',
            email: 'contact.admakerai@gmail.com',
            followUs: '팔로우',
            copyright: '© 2026 AdMaker AI. 모든 권리 보유.',
        },
        de: {
            tagline: 'Die #1 Plattform zur Erstellung von KI-Videoanzeigen in Minuten.',
            features: 'Funktionen',
            pricing: 'Preise',
            blog: 'Blog',
            legal: 'Rechtliches',
            terms: 'Nutzungsbedingungen',
            privacy: 'Datenschutz',
            contact: 'Kontakt',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Folgen Sie uns',
            copyright: '© 2026 AdMaker AI. Alle Rechte vorbehalten.',
        },
        ja: {
            tagline: '数分でAIビデオ広告を作成する#1プラットフォーム。',
            features: '機能',
            pricing: '価格',
            blog: 'ブログ',
            legal: '法的情報',
            terms: '利用規約',
            privacy: 'プライバシーポリシー',
            contact: 'お問い合わせ',
            email: 'contact.admakerai@gmail.com',
            followUs: 'フォロー',
            copyright: '© 2026 AdMaker AI. 無断転載を禁じます。',
        }
    };

    const t = translations[lang] || translations['en'];
    const langPrefix = lang === 'fr' ? '/fr' : lang === 'es' ? '/es' : lang === 'pt' ? '/pt' : lang === 'ko' ? '/ko' : lang === 'de' ? '/de' : lang === 'ja' ? '/ja' : '';

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    {/* Brand Section */}
                    <div className={styles.footerBrand}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>
                                AdMaker<span className={styles.gradientText}>AI</span>
                            </span>
                        </div>
                        <p className={styles.tagline}>{t.tagline}</p>
                    </div>

                    {/* Navigation Links */}
                    <div className={styles.footerLinks}>
                        <div className={styles.linkColumn}>
                            <h4>{t.features}</h4>
                            <a href="#features">{t.features}</a>
                            <a href="#pricing">{t.pricing}</a>
                            <a href={`${langPrefix}/blog`}>{t.blog}</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>{t.legal}</h4>
                            <a href="/terms">{t.terms}</a>
                            <a href="/privacy">{t.privacy}</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>{t.contact}</h4>
                            <a href="mailto:contact.admakerai@gmail.com">{t.email}</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>{t.followUs}</h4>
                            <a
                                href="https://www.instagram.com/admaker_ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                @admaker_ai
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={styles.footerBottom}>
                    <p>{t.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
