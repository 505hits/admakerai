'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../login/Auth.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';
import { createClient } from '@/lib/supabase/client';

export default function LoginPageJa() {
    return (
        <Suspense fallback={<div className={styles.authContainer}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>読み込み中...</div></div>}>
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
            setError(`認証に失敗しました: ${errorParam}。もう一度お試しください。`);
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
                        setError('認証に失敗しました。もう一度お試しください。');
                        setLoading(false);
                        return;
                    }
                    if (data.session) {
                        window.history.replaceState(null, '', '/ja/login');
                        router.push('/ja/payment');
                    }
                } catch (err) {
                    setError('認証に失敗しました。もう一度お試しください。');
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
                router.push('/ja/payment');
            }
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                router.push('/ja/payment');
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
            setError('Googleでのログインに失敗しました。もう一度お試しください。');
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
            setError('マジックリンクの送信に失敗しました。メールアドレスを確認してもう一度お試しください。');
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
                                <h1>メールを確認してください</h1>
                                <p>一時的なリンクを送信しました。</p>
                                <p>受信トレイを確認してください</p>
                                <p className={styles.emailAddress}>{email}</p>
                                <button onClick={() => setIsEmailSent(false)} className={styles.backBtn}>
                                    戻る
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
                            <span className={styles.socialProofText}>50,000人以上のクリエイターが参加</span>
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
                            {loading ? '読み込み中...' : 'Googleで続ける'}
                        </button>
                        <div className={styles.divider}><span>または</span></div>
                        <form onSubmit={handleEmailSubmit} className={styles.authForm}>
                            <input
                                type="email"
                                placeholder="メールアドレスを入力"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.emailInput}
                                required
                                disabled={loading}
                            />
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? '送信中...' : '続ける'}
                            </button>
                        </form>
                        <p className={styles.authFooter}>
                            「続ける」または「Googleで続ける」をクリックすることで、<a href="#">利用規約</a>と<a href="#">プライバシーポリシー</a>に同意したものとみなされます。
                        </p>
                        <div className={styles.testimonialsSection}>
                            <div className={styles.testimonialsScroller}>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"AdMaker AIでコンテンツ制作が変わりました。今では週に20本以上の動画を作成しています！"</p>
                                    <p className={styles.testimonialAuthor}>- サラ M.、コンテンツクリエイター</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"AIアクターは信じられないほどリアルです。エンゲージメントが300%増加しました！"</p>
                                    <p className={styles.testimonialAuthor}>- マイク R.、Eコマースオーナー</p>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                                    <p className={styles.testimonialText}>"ビジネスに最高の投資です。最初の月でROIがプラスになりました！"</p>
                                    <p className={styles.testimonialAuthor}>- ジェシカ L.、マーケティングマネージャー</p>
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
            <h2 className={styles.showcaseTitle}>50,000人以上のクリエイターが毎日AdMaker AIを使用しています</h2>
            <div className={styles.videoSlider}>
                <div className={styles.aiGeneratedBadge}>AI生成</div>
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
