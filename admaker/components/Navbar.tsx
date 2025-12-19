'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { getMediaUrl } from '../lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const router = useRouter();
    const supabase = createClient();

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
        router.push('/');
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContent}>
                    <a href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={getMediaUrl('admaker_ai_logo-removebg-preview.png')} alt="AdMaker AI Logo" style={{ height: '40px', width: 'auto' }} />
                        <span className={styles.logoText} style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
                            AdMaker<span style={{ background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
                        </span>
                    </a>
                    <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="/blog">Blog</a>
                        {!isLoggedIn ? (
                            <>
                                <a href="/login" className={styles.btnSecondary}>Sign in</a>
                                <a href="/login" className={styles.btnPrimary}>Get started</a>
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
                                    User
                                </button>
                                {showUserDropdown && (
                                    <div className={styles.dropdown}>
                                        <a href="/profile" className={styles.dropdownItem}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            Profile
                                        </a>
                                        <a href="/dashboard" className={styles.dropdownItem}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                                <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            Dashboard
                                        </a>
                                        <button onClick={handleLogout} className={styles.dropdownItem}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Logout
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
