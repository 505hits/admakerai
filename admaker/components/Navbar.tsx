'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { getMediaUrl } from '../lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

interface NavbarProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja';
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const translations = {
        en: {
            features: 'Features',
            pricing: 'Pricing',
            blog: 'Blog',
            signIn: 'Sign in',
            getStarted: 'Get started',
            user: 'User',
            profile: 'Profile',
            dashboard: 'Dashboard',
            logout: 'Logout',
        },
        fr: {
            features: 'Fonctionnalités',
            pricing: 'Tarifs',
            blog: 'Blog',
            signIn: 'Se connecter',
            getStarted: 'Commencer',
            user: 'Utilisateur',
            profile: 'Profil',
            dashboard: 'Tableau de bord',
            logout: 'Déconnexion',
        },
        es: {
            features: 'Características',
            pricing: 'Precios',
            blog: 'Blog',
            signIn: 'Iniciar Sesión',
            getStarted: 'Comenzar',
            user: 'Usuario',
            profile: 'Perfil',
            dashboard: 'Panel',
            logout: 'Cerrar Sesión',
        },
        pt: {
            features: 'Recursos',
            pricing: 'Preços',
            blog: 'Blog',
            signIn: 'Entrar',
            getStarted: 'Começar',
            user: 'Usuário',
            profile: 'Perfil',
            dashboard: 'Painel',
            logout: 'Sair',
        },
        ko: {
            features: '기능',
            pricing: '가격',
            blog: '블로그',
            signIn: '로그인',
            getStarted: '시작하기',
            user: '사용자',
            profile: '프로필',
            dashboard: '대시보드',
            logout: '로그아웃',
        },
        de: {
            features: 'Funktionen',
            pricing: 'Preise',
            blog: 'Blog',
            signIn: 'Anmelden',
            getStarted: 'Loslegen',
            user: 'Benutzer',
            profile: 'Profil',
            dashboard: 'Dashboard',
            logout: 'Abmelden',
        },
        ja: {
            features: '機能',
            pricing: '価格',
            blog: 'ブログ',
            signIn: 'ログイン',
            getStarted: '始める',
            user: 'ユーザー',
            profile: 'プロフィール',
            dashboard: 'ダッシュボード',
            logout: 'ログアウト',
        }
    };

    const t = translations[lang] || translations['en'];
    const langPrefix = lang === 'fr' ? '/fr' : lang === 'es' ? '/es' : lang === 'pt' ? '/pt' : lang === 'ko' ? '/ko' : lang === 'de' ? '/de' : lang === 'ja' ? '/ja' : '';
    const pathname = usePathname();

    // Function to get the equivalent URL in a different language
    const getLanguageUrl = (targetLang: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja') => {
        if (!pathname) return targetLang === 'en' ? '/' : `/${targetLang}`;

        // Remove current language prefix
        let cleanPath = pathname;
        if (pathname.startsWith('/fr/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/es/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/pt/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/ko/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/de/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/ja/')) cleanPath = pathname.substring(3);
        else if (pathname.startsWith('/ja')) cleanPath = pathname.substring(3) || '/';

        // Map paths to their equivalents in different languages
        const pathMappings: { [key: string]: { [key: string]: string } } = {
            '/': { en: '/', fr: '/fr', es: '/es', pt: '/pt', ko: '/ko', de: '/de', ja: '/ja' },
            '/login': { en: '/login', fr: '/fr/connexion', es: '/es/iniciar-sesion', pt: '/pt/conexao', ko: '/ko/login', de: '/de/anmelden', ja: '/ja/login' },
            '/connexion': { en: '/login', fr: '/fr/connexion', es: '/es/iniciar-sesion', pt: '/pt/conexao', ko: '/ko/login', de: '/de/anmelden', ja: '/ja/login' },
            '/iniciar-sesion': { en: '/login', fr: '/fr/connexion', es: '/es/iniciar-sesion', pt: '/pt/conexao', ko: '/ko/login', de: '/de/anmelden', ja: '/ja/login' },
            '/conexao': { en: '/login', fr: '/fr/connexion', es: '/es/iniciar-sesion', pt: '/pt/conexao', ko: '/ko/login', de: '/de/anmelden', ja: '/ja/login' },
            '/anmelden': { en: '/login', fr: '/fr/connexion', es: '/es/iniciar-sesion', pt: '/pt/conexao', ko: '/ko/login', de: '/de/anmelden', ja: '/ja/login' },
            '/payment': { en: '/payment', fr: '/fr/paiement', es: '/es/pago', pt: '/pt/pagamento', ko: '/ko/payment', de: '/de/zahlung', ja: '/ja/payment' },
            '/paiement': { en: '/payment', fr: '/fr/paiement', es: '/es/pago', pt: '/pt/pagamento', ko: '/ko/payment', de: '/de/zahlung', ja: '/ja/payment' },
            '/pago': { en: '/payment', fr: '/fr/paiement', es: '/es/pago', pt: '/pt/pagamento', ko: '/ko/payment', de: '/de/zahlung', ja: '/ja/payment' },
            '/pagamento': { en: '/payment', fr: '/fr/paiement', es: '/es/pago', pt: '/pt/pagamento', ko: '/ko/payment', de: '/de/zahlung', ja: '/ja/payment' },
            '/zahlung': { en: '/payment', fr: '/fr/paiement', es: '/es/pago', pt: '/pt/pagamento', ko: '/ko/payment', de: '/de/zahlung', ja: '/ja/payment' },
            '/profile': { en: '/profile', fr: '/fr/profil', es: '/es/perfil', pt: '/pt/perfil', ko: '/ko/profile', de: '/de/profil', ja: '/ja/profile' },
            '/profil': { en: '/profile', fr: '/fr/profil', es: '/es/perfil', pt: '/pt/perfil', ko: '/ko/profile', de: '/de/profil', ja: '/ja/profile' },
            '/perfil': { en: '/profile', fr: '/fr/profil', es: '/es/perfil', pt: '/pt/perfil', ko: '/ko/profile', de: '/de/profil', ja: '/ja/profile' },
            '/dashboard': { en: '/dashboard', fr: '/fr/tableau-de-bord', es: '/es/panel', pt: '/pt/painel', ko: '/ko/dashboard', de: '/de/dashboard', ja: '/ja/dashboard' },
            '/tableau-de-bord': { en: '/dashboard', fr: '/fr/tableau-de-bord', es: '/es/panel', pt: '/pt/painel', ko: '/ko/dashboard', de: '/de/dashboard', ja: '/ja/dashboard' },
            '/panel': { en: '/dashboard', fr: '/fr/tableau-de-bord', es: '/es/panel', pt: '/pt/painel', ko: '/ko/dashboard', de: '/de/dashboard', ja: '/ja/dashboard' },
            '/painel': { en: '/dashboard', fr: '/fr/tableau-de-bord', es: '/es/panel', pt: '/pt/painel', ko: '/ko/dashboard', de: '/de/dashboard', ja: '/ja/dashboard' },
            '/blog': { en: '/blog', fr: '/fr/blog', es: '/es/blog', pt: '/pt/blog', ko: '/ko/blog', de: '/de/blog', ja: '/ja/blog' },
            // Blog article mappings
            '/blog/best-ugc-video-creation-service-for-real-estate-marketing': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
                ja: '/ja/blog/best-ugc-video-creation-service-real-estate-marketing'
            },
            '/blog/meilleur-service-creation-video-ugc-marketing-immobilier': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing'
            },
            '/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing'
            },
            '/blog/bester-ugc-video-erstellungsservice-immobilienmarketing': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing'
            },
            '/blog/best-ugc-video-creation-service-real-estate-marketing': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing'
            },
            '/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario': {
                en: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
                fr: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
                es: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
                pt: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
                ko: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
                de: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing'
            },
        };

        // Find the mapping for the current clean path
        const mapping = pathMappings[cleanPath];
        if (mapping && mapping[targetLang]) {
            return mapping[targetLang];
        }

        // Default: just add language prefix
        if (targetLang === 'en') {
            return cleanPath === '/' ? '/' : cleanPath;
        }
        return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        // Check login status with Supabase
        const checkLoginStatus = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
            if (session?.user) {
                setUserAvatar(session.user.user_metadata?.avatar_url || null);
            }
        };

        checkLoginStatus();
        window.addEventListener('scroll', handleScroll);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
            if (session?.user) {
                setUserAvatar(session.user.user_metadata?.avatar_url || null);
            } else {
                setUserAvatar(null);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
        };
    }, []);


    const handleLogout = async () => {
        await supabase.auth.signOut();
        setShowUserDropdown(false);
        router.push(langPrefix || '/');
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContent}>
                    <a href={langPrefix || '/'} className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={getMediaUrl('admaker_ai_logo-removebg-preview.png')} alt="AdMaker AI Logo" style={{ height: '40px', width: 'auto' }} />
                        <span className={styles.logoText} style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
                            AdMaker<span style={{ background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
                        </span>
                    </a>
                    <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
                        <a href="#features">{t.features}</a>
                        <a href="#pricing">{t.pricing}</a>
                        <a href={`${langPrefix}/blog`}>{t.blog}</a>

                        {/* Language Selector */}
                        <div
                            className={styles.languageSelector}
                            onMouseEnter={() => setShowLangDropdown(true)}
                            onMouseLeave={() => setShowLangDropdown(false)}
                        >
                            <button
                                className={styles.langBtn}
                                onClick={() => setShowLangDropdown(!showLangDropdown)}
                            >
                                {lang === 'fr' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="6.67" height="20" fill="#002395" />
                                        <rect x="6.67" width="6.67" height="20" fill="#FFFFFF" />
                                        <rect x="13.33" width="6.67" height="20" fill="#ED2939" />
                                    </svg>
                                ) : lang === 'es' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="20" height="5" fill="#AA151B" />
                                        <rect y="5" width="20" height="10" fill="#F1BF00" />
                                        <rect y="15" width="20" height="5" fill="#AA151B" />
                                    </svg>
                                ) : lang === 'pt' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="8" height="20" fill="#006600" />
                                        <rect x="8" width="12" height="20" fill="#FF0000" />
                                        <circle cx="8" cy="10" r="3" fill="#FFFF00" stroke="#0000FF" strokeWidth="0.5" />
                                    </svg>
                                ) : lang === 'ko' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="20" height="20" fill="#FFFFFF" />
                                        <circle cx="10" cy="10" r="6" fill="#CD2E3A" />
                                        <path d="M10 4 A6 6 0 0 1 10 16 A6 6 0 0 0 10 4" fill="#0047A0" />
                                        <g stroke="#000000" strokeWidth="0.8">
                                            <line x1="14" y1="6" x2="16" y2="4" />
                                            <line x1="14.5" y1="5" x2="16.5" y2="3" />
                                            <line x1="15" y1="6" x2="17" y2="4" />
                                            <line x1="4" y1="14" x2="6" y2="16" />
                                            <line x1="3" y1="14.5" x2="5" y2="16.5" />
                                            <line x1="4" y1="15" x2="6" y2="17" />
                                        </g>
                                    </svg>
                                ) : lang === 'de' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="20" height="6.67" fill="#000000" />
                                        <rect y="6.67" width="20" height="6.67" fill="#DD0000" />
                                        <rect y="13.33" width="20" height="6.67" fill="#FFCE00" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                        <rect width="20" height="20" fill="#012169" />
                                        <path d="M0 0l20 20M20 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
                                        <path d="M0 0l20 20M20 0L0 20" stroke="#C8102E" strokeWidth="2.4" />
                                        <path d="M10 0v20M0 10h20" stroke="#FFFFFF" strokeWidth="6.67" />
                                        <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="4" />
                                    </svg>
                                )}
                                <span className={styles.langCode}>
                                    {lang === 'fr' ? 'FR' : lang === 'es' ? 'ES' : lang === 'pt' ? 'PT' : lang === 'ko' ? 'KO' : lang === 'de' ? 'DE' : lang === 'ja' ? 'JA' : 'EN'}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {showLangDropdown && (
                                <div className={styles.langDropdown}>
                                    <a href={getLanguageUrl('en')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="20" height="20" fill="#012169" />
                                            <path d="M0 0l20 20M20 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
                                            <path d="M0 0l20 20M20 0L0 20" stroke="#C8102E" strokeWidth="2.4" />
                                            <path d="M10 0v20M0 10h20" stroke="#FFFFFF" strokeWidth="6.67" />
                                            <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="4" />
                                        </svg>
                                        <span>English</span>
                                    </a>
                                    <a href={getLanguageUrl('fr')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="6.67" height="20" fill="#002395" />
                                            <rect x="6.67" width="6.67" height="20" fill="#FFFFFF" />
                                            <rect x="13.33" width="6.67" height="20" fill="#ED2939" />
                                        </svg>
                                        <span>Français</span>
                                    </a>
                                    <a href={getLanguageUrl('es')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="20" height="5" fill="#AA151B" />
                                            <rect y="5" width="20" height="10" fill="#F1BF00" />
                                            <rect y="15" width="20" height="5" fill="#AA151B" />
                                        </svg>
                                        <span>Español</span>
                                    </a>
                                    <a href={getLanguageUrl('pt')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="8" height="20" fill="#006600" />
                                            <rect x="8" width="12" height="20" fill="#FF0000" />
                                            <circle cx="8" cy="10" r="3" fill="#FFFF00" stroke="#0000FF" strokeWidth="0.5" />
                                        </svg>
                                        <span>Português</span>
                                    </a>
                                    <a href={getLanguageUrl('ko')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="20" height="20" fill="#FFFFFF" />
                                            <circle cx="10" cy="10" r="6" fill="#CD2E3A" />
                                            <path d="M10 4 A6 6 0 0 1 10 16 A6 6 0 0 0 10 4" fill="#0047A0" />
                                            <g stroke="#000000" strokeWidth="0.8">
                                                <line x1="14" y1="6" x2="16" y2="4" />
                                                <line x1="14.5" y1="5" x2="16.5" y2="3" />
                                                <line x1="15" y1="6" x2="17" y2="4" />
                                                <line x1="4" y1="14" x2="6" y2="16" />
                                                <line x1="3" y1="14.5" x2="5" y2="16.5" />
                                                <line x1="4" y1="15" x2="6" y2="17" />
                                            </g>
                                        </svg>
                                        <span>한국어</span>
                                    </a>
                                    <a href={getLanguageUrl('de')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="20" height="6.67" fill="#000000" />
                                            <rect y="6.67" width="20" height="6.67" fill="#DD0000" />
                                            <rect y="13.33" width="20" height="6.67" fill="#FFCE00" />
                                        </svg>
                                        <span>Deutsch</span>
                                    </a>
                                    <a href={getLanguageUrl('ja')} className={styles.langOption}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" className={styles.flagIcon}>
                                            <rect width="20" height="20" fill="#FFFFFF" />
                                            <circle cx="10" cy="10" r="6" fill="#BC002D" />
                                        </svg>
                                        <span>日本語</span>
                                    </a>
                                </div>
                            )}
                        </div>

                        {!isLoggedIn ? (
                            <>
                                <a href={lang === 'fr' ? '/fr/connexion' : lang === 'es' ? '/es/iniciar-sesion' : lang === 'pt' ? '/pt/conexao' : lang === 'de' ? '/de/anmelden' : lang === 'ja' ? '/ja/login' : '/login'} className={styles.btnSecondary}>{t.signIn}</a>
                                <a href={lang === 'fr' ? '/fr/connexion' : lang === 'es' ? '/es/iniciar-sesion' : lang === 'pt' ? '/pt/conexao' : lang === 'de' ? '/de/anmelden' : lang === 'ja' ? '/ja/login' : '/login'} className={styles.btnPrimary}>{t.getStarted}</a>
                            </>
                        ) : (
                            <div className={styles.userMenu}>
                                <button
                                    className={styles.userBtn}
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                >
                                    {userAvatar ? (
                                        <img src={userAvatar} alt="User" className={styles.userAvatar} />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                    {t.user}
                                </button>
                                {showUserDropdown && (
                                    <div className={styles.dropdown}>
                                        <div className={styles.userDropdown}>
                                            <a href={`${langPrefix}/profile`} className={styles.dropdownItem}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor" />
                                                    <path d="M10 12.5C5.58172 12.5 2 14.5817 2 17.5V20H18V17.5C18 14.5817 14.4183 12.5 10 12.5Z" fill="currentColor" />
                                                </svg>
                                                {t.profile}
                                            </a>
                                            <a href={lang === 'fr' ? '/fr/tableau-de-bord' : lang === 'es' ? '/es/panel' : lang === 'pt' ? '/pt/painel' : lang === 'de' ? '/de/dashboard' : lang === 'ja' ? '/ja/dashboard' : '/dashboard'} className={styles.dropdownItem}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                                {t.dashboard}
                                            </a>
                                            <button onClick={handleLogout} className={styles.dropdownItem}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {t.logout}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
