'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../login/Auth.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

// Wrapper component with Suspense
export default function LoginPage() {
    return (
        <Suspense fallback={<div className={styles.authContainer}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading...</div></div>}>
            <LoginContent />
        </Suspense>
    );
}

// Main login component that uses useSearchParams
function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    // Check for error in URL params
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError(`Authentication failed: ${errorParam}. Please try again.`);
            setLoading(false);
        }
    }, [searchParams]);

    // Handle PKCE code exchange on client side
    useEffect(() => {
        const handleCodeExchange = async () => {
            const code = searchParams.get('code');

            if (code) {
                try {
                    setLoading(true);
                    console.log('Exchanging code for session...');

                    // Supabase client will automatically exchange the code using stored verifier
                    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

                    if (error) {
                        console.error('Exchange error:', error);
                        setError('Authentication failed. Please try again.');
                        setLoading(false);
                        return;
                    }

                    if (data.session) {
                        console.log('Session created, redirecting...');

                        // Detect language from URL param or referrer
                        const lang = searchParams.get('lang');
                        const paymentUrl = lang === 'fr' ? '/fr/paiement' :
                            lang === 'es' ? '/es/pago' :
                                lang === 'pt' ? '/pt/pagamento' :
                                    lang === 'de' ? '/de/zahlung' :
                                        lang === 'ja' ? '/ja/payment' :
                                            lang === 'ko' ? '/ko/payment' :
                                                '/payment';

                        // Clear URL params
                        window.history.replaceState(null, '', '/login');
                        router.push(paymentUrl);
                    }
                } catch (err) {
                    console.error('Code exchange error:', err);
                    setError('Authentication failed. Please try again.');
                    setLoading(false);
                }
            }
        };

        handleCodeExchange();
    }, [searchParams, router]);

    // Check if already logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log('Already logged in, redirecting to dashboard');
                const lang = searchParams.get('lang');
                const paymentUrl = lang === 'fr' ? '/fr/paiement' :
                    lang === 'es' ? '/es/pago' :
                        lang === 'pt' ? '/pt/pagamento' :
                            lang === 'de' ? '/de/zahlung' :
                                lang === 'ja' ? '/ja/payment' :
                                    lang === 'ko' ? '/ko/payment' :
                                        '/payment';
                router.push(paymentUrl);
            }
        };

        checkAuth();
    }, [router, searchParams]);

    // Listen for auth state changes
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth event:', event);

            if (event === 'SIGNED_IN' && session) {
                console.log('User signed in:', session.user.email);
                const lang = searchParams.get('lang');
                const paymentUrl = lang === 'fr' ? '/fr/paiement' :
                    lang === 'es' ? '/es/pago' :
                        lang === 'pt' ? '/pt/pagamento' :
                            lang === 'de' ? '/de/zahlung' :
                                lang === 'ja' ? '/ja/payment' :
                                    lang === 'ko' ? '/ko/payment' :
                                        '/payment';
                router.push(paymentUrl);
            }
        });

        return () => subscription.unsubscribe();
    }, [router, searchParams]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError(null);

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            // User will be redirected by Supabase
        } catch (err) {
            console.error('Google login error:', err);
            setError('Failed to sign in with Google. Please try again.');
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setIsEmailSent(true);
        } catch (err) {
            console.error('Email login error:', err);
            setError('Failed to send magic link. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isEmailSent) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.authSplitLayout}>
                    <div className={styles.authLeft}>
                        <div className={styles.authCard}>
                            <div className={styles.authLogo}>
                                <img src={getMediaUrl('logo.png')} alt="AdMaker AI" />
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
                            <img src={getMediaUrl('logo.png')} alt="AdMaker AI" />
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

                        {/* Error Message */}
                        {error && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                fontSize: '14px'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleGoogleLogin}
                            className={styles.googleBtn}
                            disabled={loading}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                            </svg>
                            {loading ? 'Loading...' : 'Continue with Google'}
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
                                disabled={loading}
                            />

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Sending...' : 'Continue'}
                            </button>
                        </form>

                        <p className={styles.authFooter}>
                            By clicking "Continue" or "Continue with Google", you agree to our <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
                        </p>

                        {/* Customer Testimonials */}
                        <div className={styles.testimonialsSection}>
                            <div className={styles.testimonialsScroller}>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"AdMaker AI transformed my content creation. I generate 20+ videos per week now!"</p>
                                    <p className={styles.testimonialAuthor}>- Sarah M., Content Creator</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"The AI actors are incredibly realistic. My engagement increased by 300%!"</p>
                                    <p className={styles.testimonialAuthor}>- Mike R., E-commerce Owner</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"Best investment for my business. ROI was positive in the first month!"</p>
                                    <p className={styles.testimonialAuthor}>- Jessica L., Marketing Manager</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"So easy to use! I created my first video in under 5 minutes."</p>
                                    <p className={styles.testimonialAuthor}>- David K., Small Business Owner</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"The quality is amazing. My clients think I hired professional actors!"</p>
                                    <p className={styles.testimonialAuthor}>- Emma T., Freelancer</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"Game changer for UGC content. I can test multiple creatives daily!"</p>
                                    <p className={styles.testimonialAuthor}>- Alex P., Digital Marketer</p>
                                </div>
                                {/* Duplicate for seamless loop */}
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"AdMaker AI transformed my content creation. I generate 20+ videos per week now!"</p>
                                    <p className={styles.testimonialAuthor}>- Sarah M., Content Creator</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"The AI actors are incredibly realistic. My engagement increased by 300%!"</p>
                                    <p className={styles.testimonialAuthor}>- Mike R., E-commerce Owner</p>
                                </div>
                            </div>
                        </div>
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
        getMediaUrl('influ page auth 1.mp4'),
        getMediaUrl('influ page auth 2.mp4'),
        getMediaUrl('influ auth 3.mp4')
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
