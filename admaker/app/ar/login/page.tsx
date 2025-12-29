'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../login/Auth.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

export default function LoginPageAr() {
    return (
        <Suspense fallback={<div className={styles.authContainer}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>جاري التحميل...</div></div>}>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError(`فشل المصادقة: ${errorParam}. يرجى المحاولة مرة أخرى.`);
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleCodeExchange = async () => {
            const code = searchParams.get('code');
            if (code) {
                try {
                    setLoading(true);
                    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
                    if (error) {
                        setError('فشل المصادقة. يرجى المحاولة مرة أخرى.');
                        setLoading(false);
                        return;
                    }
                    if (data.session) {
                        window.history.replaceState(null, '', '/ar/login');
                        router.push('/ar/payment');
                    }
                } catch (err) {
                    setError('فشل المصادقة. يرجى المحاولة مرة أخرى.');
                    setLoading(false);
                }
            }
        };
        handleCodeExchange();
    }, [searchParams, router]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push('/ar/payment');
            }
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                router.push('/ar/payment');
            }
        });
        return () => subscription.unsubscribe();
    }, [router]);

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
        } catch (err) {
            setError('فشل تسجيل الدخول باستخدام Google. يرجى المحاولة مرة أخرى.');
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
            setError('فشل إرسال الرابط السحري. يرجى التحقق من بريدك الإلكتروني والمحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    if (isEmailSent) {
        return (
            <div className={styles.authContainer} dir="rtl">
                <div className={styles.authSplitLayout}>
                    <div className={styles.authLeft}>
                        <div className={styles.authCard}>
                            <div className={styles.authLogo}>
                                <img src={getMediaUrl('logo.png')} alt="AdMaker AI" />
                            </div>
                            <div className={styles.verifyEmail}>
                                <h1>تحقق من بريدك الإلكتروني</h1>
                                <p>لقد أرسلنا لك رابطًا مؤقتًا.</p>
                                <p>يرجى التحقق من صندوق الوارد الخاص بك على</p>
                                <p className={styles.emailAddress}>{email}</p>
                                <button onClick={() => setIsEmailSent(false)} className={styles.backBtn}>
                                    رجوع
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
        <div className={styles.authContainer} dir="rtl">
            <div className={styles.authSplitLayout}>
                <div className={styles.authLeft}>
                    <div className={styles.authCard}>
                        <div className={styles.authLogo}>
                            <img src={getMediaUrl('logo.png')} alt="AdMaker AI" />
                        </div>
                        <div className={styles.authSocialProof}>
                            <div className={styles.avatarGroup}>
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="User" className={styles.avatar} />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" alt="User" className={styles.avatar} />
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" alt="User" className={styles.avatar} />
                            </div>
                            <span className={styles.socialProofText}>انضم إلى أكثر من 50,000 منشئ محتوى</span>
                        </div>
                        {error && (
                            <div style={{ padding: '12px', backgroundColor: '#ff4444', color: 'white', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}
                        <button onClick={handleGoogleLogin} className={styles.googleBtn} disabled={loading}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                            </svg>
                            {loading ? 'جاري التحميل...' : 'المتابعة باستخدام Google'}
                        </button>
                        <div className={styles.divider}><span>أو</span></div>
                        <form onSubmit={handleEmailSubmit} className={styles.authForm}>
                            <input
                                type="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.emailInput}
                                required
                                disabled={loading}
                            />
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'جاري الإرسال...' : 'متابعة'}
                            </button>
                        </form>
                        <p className={styles.authFooter}>
                            بالنقر على "متابعة" أو "المتابعة باستخدام Google"، فإنك توافق على <a href="#">شروط الاستخدام</a> و <a href="#">سياسة الخصوصية</a>.
                        </p>
                        <div className={styles.testimonialsSection}>
                            <div className={styles.testimonialsScroller}>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"AdMaker AI غيّر طريقة إنشاء المحتوى لدي. أنشئ الآن أكثر من 20 فيديو أسبوعيًا!"</p>
                                    <p className={styles.testimonialAuthor}>- سارة م.، منشئة محتوى</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"الممثلون بالذكاء الاصطناعي واقعيون بشكل لا يصدق. زاد تفاعلي بنسبة 300%!"</p>
                                    <p className={styles.testimonialAuthor}>- مايك ر.، صاحب متجر إلكتروني</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"أفضل استثمار لعملي. كان عائد الاستثمار إيجابيًا في الشهر الأول!"</p>
                                    <p className={styles.testimonialAuthor}>- جيسيكا ل.، مديرة تسويق</p>
                                </div>
                            </div>
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
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.videoShowcase}>
            <h2 className={styles.showcaseTitle}>أكثر من 50,000 منشئ محتوى يستخدمون AdMaker AI يوميًا</h2>
            <div className={styles.videoSlider}>
                <div className={styles.aiGeneratedBadge}>مُنشأ بالذكاء الاصطناعي</div>
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
