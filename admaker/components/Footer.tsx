'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

interface FooterProps {
    lang?: string; // Optional, can be derived from path
}

export default function Footer({ lang }: FooterProps) {
    const pathname = usePathname();

    // Logic to hide footer on specific routes
    const isDashboard = pathname?.includes('/dashboard');
    const isLogin = pathname?.includes('/login');
    const isAuth = pathname?.includes('/auth');
    const isPayment = pathname?.includes('/payment');

    if (isDashboard || isLogin || isAuth || isPayment) {
        return null;
    }

    // Determine language from path if not provided prop
    const getLangFromPath = () => {
        if (!pathname) return 'en';
        if (pathname.startsWith('/fr')) return 'fr';
        if (pathname.startsWith('/es')) return 'es';
        if (pathname.startsWith('/pt')) return 'pt';
        if (pathname.startsWith('/de')) return 'de';
        if (pathname.startsWith('/ko')) return 'ko';
        if (pathname.startsWith('/ja')) return 'ja';
        return 'en';
    };

    const currentLang = lang || getLangFromPath();
    const langPrefix = currentLang === 'en' ? '' : `/${currentLang}`;

    // Helper to get localized links
    // Slugs must match exactly what is in Navbar.tsx
    const getLinks = (l: string) => {
        const links = {
            en: {
                hookGenerator: '/hook-generator',
                topRated: '/blog/top-rated-ugc-video-makers-for-social-ads',
                pricing: '/blog/compare-pricing-ugc-video-production-tools',
                realEstate: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                aiPlatforms: '/blog/top-ai-platforms-creating-ugc-brand-videos'
            },
            fr: {
                hookGenerator: '/fr/generateur-accroches',
                topRated: '/fr/blog/meilleurs-createurs-video-ugc-pour-publicites-sociales',
                pricing: '/fr/blog/comparatif-prix-outils-production-video-ugc',
                realEstate: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                aiPlatforms: '/fr/blog/meilleures-plateformes-ia-creation-videos-ugc-marque'
            },
            es: {
                hookGenerator: '/es/generador-ganchos',
                topRated: '/es/blog/mejores-creadores-video-ugc-para-anuncios-sociales',
                pricing: '/es/blog/comparar-precios-herramientas-produccion-video-ugc',
                realEstate: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                aiPlatforms: '/es/blog/mejores-plataformas-ia-crear-videos-ugc-marca'
            },
            pt: {
                hookGenerator: '/pt/gerador-ganchos',
                topRated: '/pt/blog/melhores-criadores-video-ugc-para-anuncios-sociais',
                pricing: '/pt/blog/comparar-precos-ferramentas-producao-video-ugc',
                realEstate: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                aiPlatforms: '/pt/blog/melhores-plataformas-ia-criar-videos-ugc-marca'
            },
            de: {
                hookGenerator: '/de/hook-generator',
                topRated: '/de/blog/beste-ugc-video-macher-fuer-social-ads',
                pricing: '/de/blog/preise-vergleichen-ugc-video-produktionstools',
                realEstate: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
                aiPlatforms: '/de/blog/beste-ki-plattformen-ugc-markenvideos'
            },
            ko: {
                hookGenerator: '/ko/hook-generator',
                topRated: '/ko/blog/top-rated-ugc-video-makers-social-ads',
                pricing: '/ko/blog/ugc-video-production-tools-pricing-comparison',
                realEstate: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                aiPlatforms: '/ko/blog/brand-ugc-video-ai-platforms'
            },
            ja: {
                hookGenerator: '/ja/hook-generator',
                topRated: '/ja/blog/top-rated-ugc-video-makers-social-ads',
                pricing: '/ja/blog/ugc-video-production-tools-pricing-comparison',
                realEstate: '/ja/blog/best-ugc-video-creation-service-real-estate-marketing',
                aiPlatforms: '/ja/blog/brand-ugc-video-ai-platforms'
            }
        };
        return links[l as keyof typeof links] || links.en;
    };

    const linkUrls = getLinks(currentLang);

    const translations = {
        en: {
            tagline: 'The #1 platform to create AI video ads in minutes.',
            features: 'Features',
            pricing: 'Pricing',
            blog: 'Blog',
            resources: 'Resources',
            legal: 'Legal',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            contact: 'Contact',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Follow Us',
            copyright: '© 2026 AdMaker AI. All rights reserved.',
            links: {
                hookGen: 'Viral Hook Generator',
                topRated: 'Top Rated UGC Video Makers',
                pricing: 'UGC Video Tools Pricing',
                realEstate: 'Real Estate UGC',
                aiPlatforms: 'Top AI Video Platforms'
            }
        },
        fr: {
            tagline: 'La plateforme n°1 pour créer des publicités vidéo IA en quelques minutes.',
            features: 'Fonctionnalités',
            pricing: 'Tarifs',
            blog: 'Blog',
            resources: 'Ressources',
            legal: 'Légal',
            terms: 'Conditions d\'utilisation',
            privacy: 'Politique de confidentialité',
            contact: 'Contact',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Suivez-nous',
            copyright: '© 2026 AdMaker AI. Tous droits réservés.',
            links: {
                hookGen: 'Générateur d\'Accroches Virales',
                topRated: 'Meilleurs Créateurs UGC',
                pricing: 'Prix Outils Vidéo UGC',
                realEstate: 'UGC Immobilier',
                aiPlatforms: 'Meilleures Plateformes IA'
            }
        },
        es: {
            tagline: 'La plataforma n°1 para crear anuncios de video con IA en minutos.',
            features: 'Características',
            pricing: 'Precios',
            blog: 'Blog',
            resources: 'Recursos',
            legal: 'Legal',
            terms: 'Términos de servicio',
            privacy: 'Política de privacidad',
            contact: 'Contacto',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Síguenos',
            copyright: '© 2026 AdMaker AI. Todos los derechos reservados.',
            links: {
                hookGen: 'Generador de Ganchos Virales',
                topRated: 'Mejores Creadores UGC',
                pricing: 'Precios Herramientas UGC',
                realEstate: 'UGC Inmobiliario',
                aiPlatforms: 'Mejores Plataformas IA'
            }
        },
        pt: {
            tagline: 'A plataforma nº1 para criar anúncios de vídeo com IA em minutos.',
            features: 'Recursos',
            pricing: 'Preços',
            blog: 'Blog',
            resources: 'Recursos Úteis',
            legal: 'Legal',
            terms: 'Termos de serviço',
            privacy: 'Política de privacidade',
            contact: 'Contato',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Siga-nos',
            copyright: '© 2026 AdMaker AI. Todos os direitos reservados.',
            links: {
                hookGen: 'Gerador de Ganchos Virais',
                topRated: 'Melhores Criadores UGC',
                pricing: 'Preços Ferramentas UGC',
                realEstate: 'UGC Imobiliário',
                aiPlatforms: 'Melhores Plataformas IA'
            }
        },
        ko: {
            tagline: '몇 분 만에 AI 비디오 광고를 만드는 1위 플랫폼.',
            features: '기능',
            pricing: '가격',
            blog: '블로그',
            resources: '리소스',
            legal: '법적 고지',
            terms: '서비스 약관',
            privacy: '개인정보 보호정책',
            contact: '연락처',
            email: 'contact.admakerai@gmail.com',
            followUs: '팔로우',
            copyright: '© 2026 AdMaker AI. 모든 권리 보유.',
            links: {
                hookGen: '바이럴 훅 생성기',
                topRated: '최고 평점 UGC 제작자',
                pricing: 'UGC 도구 가격 비교',
                realEstate: '부동산 UGC 서비스',
                aiPlatforms: '최고의 AI 비디오 플랫폼'
            }
        },
        de: {
            tagline: 'Die #1 Plattform zur Erstellung von KI-Videoanzeigen in Minuten.',
            features: 'Funktionen',
            pricing: 'Preise',
            blog: 'Blog',
            resources: 'Ressourcen',
            legal: 'Rechtliches',
            terms: 'Nutzungsbedingungen',
            privacy: 'Datenschutz',
            contact: 'Kontakt',
            email: 'contact.admakerai@gmail.com',
            followUs: 'Folgen Sie uns',
            copyright: '© 2026 AdMaker AI. Alle Rechte vorbehalten.',
            links: {
                hookGen: 'Viraler Hook Generator',
                topRated: 'Beste UGC Video Macher',
                pricing: 'UGC Tools Preise',
                realEstate: 'Immobilien UGC',
                aiPlatforms: 'Top KI Plattformen'
            }
        },
        ja: {
            tagline: '数分でAIビデオ広告を作成する#1プラットフォーム。',
            features: '機能',
            pricing: '価格',
            blog: 'ブログ',
            resources: 'リソース',
            legal: '法的情報',
            terms: '利用規約',
            privacy: 'プライバシーポリシー',
            contact: 'お問い合わせ',
            email: 'contact.admakerai@gmail.com',
            followUs: 'フォロー',
            copyright: '© 2026 AdMaker AI. 無断転載を禁じます。',
            links: {
                hookGen: 'バイラルフック生成ツール',
                topRated: '最高評価のUGCクリエイター',
                pricing: 'UGCツール価格比較',
                realEstate: '不動産UGCサービス',
                aiPlatforms: 'トップAIビデオ動画プラットフォーム'
            }
        }
    };

    const t = translations[currentLang as keyof typeof translations] || translations['en'];

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
                            <a href={currentLang === 'en' ? '/#features' : `${langPrefix}#features`}>{t.features}</a>
                            <a href={currentLang === 'en' ? '/#pricing' : `${langPrefix}#pricing`}>{t.pricing}</a>
                            <a href={`${langPrefix}/blog`}>{t.blog}</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>{t.resources}</h4>
                            <a href={linkUrls.hookGenerator}>{t.links.hookGen}</a>
                            <a href={linkUrls.topRated}>{t.links.topRated}</a>
                            <a href={linkUrls.pricing}>{t.links.pricing}</a>
                            <a href={linkUrls.realEstate}>{t.links.realEstate}</a>
                            <a href={linkUrls.aiPlatforms}>{t.links.aiPlatforms}</a>
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
