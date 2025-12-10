'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContent}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="AdMaker AI" style={{ height: '90px', width: 'auto' }} />
                    </div>
                    <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#faq">FAQ</a>
                        <a href="#" className={styles.btnSecondary}>Sign in</a>
                        <a href="#" className={styles.btnPrimary}>Get started</a>
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
