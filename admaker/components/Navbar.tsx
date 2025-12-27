'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { getMediaUrl } from '../lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

interface NavbarProps {
    lang?: 'en' | 'fr' | 'es';
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
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
        }
    };

    const t = translations[lang] || translations['en'];
    const langPrefix = lang === 'fr' ? '/fr' : lang === 'es' ? '/es' : '';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        // Check login status with Supabase
        const checkLoginStatus = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        checkLoginStatus();
        window.addEventListener('scroll', handleScroll);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px' }}>
                            <a href="/" style={{ color: lang === 'en' ? '#fff' : 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>EN</a>
                            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
                            <a href="/fr" style={{ color: lang === 'fr' ? '#fff' : 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>FR</a>
                        </div>

                        {!isLoggedIn ? (
                            <>
                                <a href={lang === 'fr' ? '/fr/connexion' : '/login'} className={styles.btnSecondary}>{t.signIn}</a>
                                <a href={lang === 'fr' ? '/fr/connexion' : '/login'} className={styles.btnPrimary}>{t.getStarted}</a>
                            </>
                        ) : (
                            <div className={styles.userMenu}>
                                <button
                                    className={styles.userBtn}
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    {t.user}
                                </button>
                                {showUserDropdown && (
                                    <div className={styles.dropdown}>
                                        <a href={`${langPrefix}/profile`} className={styles.dropdownItem}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            {t.profile}
                                        </a>
                                        <a href={lang === 'fr' ? '/fr/tableau-de-bord' : '/dashboard'} className={styles.dropdownItem}>
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
