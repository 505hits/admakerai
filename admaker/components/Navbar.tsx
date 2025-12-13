'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        // Check login status
        const checkLoginStatus = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        checkLoginStatus();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContent}>
                    <a href="/" className={styles.logo}>
                        <img src="/logo.png" alt="AdMaker AI" style={{ height: '70px', width: 'auto' }} />
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
