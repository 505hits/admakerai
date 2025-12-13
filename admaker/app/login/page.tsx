'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/Auth.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleGoogleLogin = () => {
        // Handle Google OAuth
        console.log('Google login');
        // After successful Google auth, redirect to payment
        router.push('/payment');
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Send magic link email
        console.log('Sending magic link to:', email);
        setIsEmailSent(true);
    };

    if (isEmailSent) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.authSplitLayout}>
                    <div className={styles.authLeft}>
                        <div className={styles.authCard}>
                            <div className={styles.authLogo}>
                                <img src="/logo.png" alt="AdMaker AI" />
                            </div>

                            <div className={styles.verifyEmail}>
                                <h1>Verify your Email</h1>
                                <p>We've sent you a temporary link.</p>
                                <p>Please, check your inbox at</p>
                                <p className={styles.emailAddress}>{email}</p>
                                <button
                                    onClick={() => setIsEmailSent(false)}
                                    className={styles.backBtn}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.authRight}>
                        <VideoShowcase />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authSplitLayout}>
                {/* Left Side - Auth Form */}
                <div className={styles.authLeft}>
                    <div className={styles.authCard}>
                        <div className={styles.authLogo}>
                            <img src="/logo.png" alt="AdMaker AI" />
                        </div>

                        {/* Social Proof */}
                        <div className={styles.authSocialProof}>
                            <div className={styles.avatarGroup}>
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                    alt="User"
                                    className={styles.avatar}
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                                    alt="User"
                                    className={styles.avatar}
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                                    alt="User"
                                    className={styles.avatar}
                                />
                            </div>
                            <span className={styles.socialProofText}>Join 50,000+ creators</span>
                        </div>

                        <button onClick={handleGoogleLogin} className={styles.googleBtn}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className={styles.divider}>
                            <span>OR</span>
                        </div>

                        <form onSubmit={handleEmailSubmit} className={styles.authForm}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.emailInput}
                                required
                            />

                            <button type="submit" className={styles.submitBtn}>
                                Continue
                            </button>
                        </form>

                        <p className={styles.authFooter}>
                            By clicking "Continue" or "Continue with Google", you agree to our <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                {/* Right Side - Video Showcase */}
                <div className={styles.authRight}>
                    <VideoShowcase />
                </div>
            </div>
        </div>
    );
}

// Video Showcase Component
function VideoShowcase() {
    const [currentVideo, setCurrentVideo] = useState(0);

    const videos = [
        '/influ page auth 1.mp4',
        '/influ page auth 2.mp4',
        '/influ auth 3.mp4'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000); // Change video every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.videoShowcase}>
            <h2 className={styles.showcaseTitle}>
                Over 50,000 creators use AdMaker AI daily
            </h2>
            <div className={styles.videoSlider}>
                <div className={styles.aiGeneratedBadge}>AI Generated</div>
                {videos.map((video, index) => (
                    <video
                        key={index}
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${styles.showcaseVideo} ${index === currentVideo ? styles.active : ''}`}
                    />
                ))}
            </div>
            <div className={styles.videoDots}>
                {videos.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentVideo ? styles.activeDot : ''}`}
                        onClick={() => setCurrentVideo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
