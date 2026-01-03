'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumModal from './PremiumModal';
import SEOContent from './SEOContent';
import StickyHookCTA from './StickyHookCTA';
import styles from '../../hook-generator/HookGenerator.module.css';
import { secureFetch } from '@/lib/api/client';
import { createClient } from '@/lib/supabase/client';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function HookGenerator() {
    const [videoIdea, setVideoIdea] = useState('');
    const [hooks, setHooks] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hooksRemaining, setHooksRemaining] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
        };
        checkAuth();
    }, []);

    const handleGenerate = async () => {
        if (!videoIdea.trim()) {
            setError('動画のアイデアを入力してください');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setHooks([]);

        try {
            const response = await secureFetch('/api/generate-hook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoIdea }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.limitReached) {
                    setHooksRemaining(0);
                    setShowPremiumModal(true);
                } else {
                    throw new Error(data.error || 'フック生成中にエラーが発生しました');
                }
                return;
            }

            setHooks(data.hooks);
            setHooksRemaining(data.hooksRemaining);
            setIsAuthenticated(data.isAuthenticated);

            setTimeout(() => {
                resultsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);

        } catch (err) {
            console.error('Error generating hooks:', err);
            setError(err instanceof Error ? err.message : 'フック生成中にエラーが発生しました。もう一度お試しください。');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async (hook: string, index: number) => {
        try {
            await navigator.clipboard.writeText(hook);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleUpgrade = () => {
        router.push('/ja/payment');
    };

    return (
        <main>
            <Navbar lang="ja" />

            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.socialProof}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            20,000以上のEコマースブランドから信頼されています
                        </div>

                        <h1 className={styles.title}>
                            <span className="gradient-text-red">無料AI</span> フック生成ツール
                        </h1>
                        <p className={styles.subtitle}>
                            数秒で3つのバイラル動画フックを作成。TikTok、Instagram Reels、YouTube Shortsに最適です。
                        </p>

                        {isAuthenticated && hooksRemaining !== null && (
                            <div className={styles.hooksCounter}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                残り{hooksRemaining}回の無料生成
                            </div>
                        )}

                        <div className={styles.inputContainer}>
                            <label htmlFor="videoIdea" className={styles.label}>
                                動画の内容は何ですか？
                            </label>
                            <textarea
                                id="videoIdea"
                                className={styles.textarea}
                                placeholder="例：気が散るウェブサイトをブロックして集中力を高める生産性アプリ"
                                value={videoIdea}
                                onChange={(e) => setVideoIdea(e.target.value)}
                                maxLength={500}
                                rows={4}
                            />
                            <div className={styles.charCounter}>
                                {videoIdea.length}/500 文字
                            </div>

                            <button
                                className={styles.generateBtn}
                                onClick={handleGenerate}
                                disabled={isGenerating || !videoIdea.trim()}
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        フック生成中...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                        </svg>
                                        3つのフックを生成
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.resultsSection}>
                <div className="container">
                    {error && (
                        <div className={styles.errorBox}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p>{error}</p>
                                {hooksRemaining === 0 && (
                                    <button className={styles.upgradeBtn} onClick={handleUpgrade}>
                                        Proにアップグレード
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {hooks.length > 0 && (
                        <div ref={resultsRef} className={styles.resultsContainer}>
                            <h2 className={styles.resultsTitle}>あなたのバイラルフック</h2>
                            <div className={styles.hooksList}>
                                {hooks.map((hook, index) => (
                                    <div key={index} className={styles.hookCard}>
                                        <div className={styles.hookNumber}>{index + 1}</div>
                                        <p className={styles.hookText}>{hook}</p>
                                        <div className={styles.hookActions}>
                                            <button
                                                className={styles.copyBtn}
                                                onClick={() => handleCopy(hook, index)}
                                            >
                                                {copiedIndex === index ? (
                                                    <>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        コピーしました！
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        コピー
                                                    </>
                                                )}
                                            </button>
                                            <a href="/ja" className={styles.generateVideoBtn}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                動画を生成
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.howItWorks}>
                <div className="container">
                    <div className="section-header">
                        <h2>使い方</h2>
                    </div>
                    <div className={styles.stepsGrid}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>動画を説明</h3>
                            <p>動画の内容を簡単に説明してください</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>AIがフックを生成</h3>
                            <p>AIが3つのユニークで魅力的なフックを作成します</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>コピーして使用</h3>
                            <p>お気に入りを選んで動画で使用してください</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="examples-slider">
                <div className="slider-track">
                    {[...Array(18)].map((_, i) => {
                        const videoUrls = [
                            getMediaUrl('video  beauté.mp4'),
                            getMediaUrl('video  bleu.mp4'),
                            getMediaUrl('video canette.mp4'),
                            getMediaUrl('video podcast.mp4'),
                            getMediaUrl('video podcast 2.mp4'),
                            getMediaUrl('video sportif.mp4')
                        ];

                        const titles = [
                            '美容広告',
                            '製品発売',
                            '飲料キャンペーン',
                            'UGCポッドキャスト',
                            '顧客レビュー',
                            'フィットネス＆スポーツ'
                        ];

                        const stats = [
                            'コンバージョン率 +250%',
                            '再生回数 10M+',
                            'ROI x5',
                            'エンゲージメント +180%',
                            'CTR +320%',
                            'リーチ x3'
                        ];

                        const videoIndex = i % 6;

                        return (
                            <div key={i} className="slide">
                                <div className="example-card has-gif">
                                    <video
                                        src={videoUrls[videoIndex]}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="example-gif"
                                    />
                                    <div className="example-info-overlay">
                                        <h4>{titles[videoIndex]}</h4>
                                        <p>{stats[videoIndex]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <SEOContent />

            <section className={styles.examples}>
                <div className="container">
                    <div className="section-header">
                        <h2>フックの例</h2>
                    </div>
                    <div className={styles.examplesGrid}>
                        <div className={styles.exampleCard}>
                            <p className={styles.exampleHook}>"待って...これで動画編集の方法が完全に変わりました"</p>
                            <span className={styles.exampleType}>パターン中断</span>
                        </div>
                        <div className={styles.exampleCard}>
                            <p className={styles.exampleHook}>"誰もこれについて話していませんが、バイラル動画の90%がこのトリックを使っています"</p>
                            <span className={styles.exampleType}>好奇心ギャップ</span>
                        </div>
                        <div className={styles.exampleCard}>
                            <p className={styles.exampleHook}>"30日間午前3時に投稿してみたら..."</p>
                            <span className={styles.exampleType}>ストーリーテリング</span>
                        </div>
                    </div>
                </div>
            </section>

            {!isAuthenticated && (
                <section className={styles.cta}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>無制限の生成をご希望ですか？</h2>
                            <p>サインアップして10回の無料生成を取得し、無制限アクセスにアップグレードしてください</p>
                            <button className="btn-primary btn-large" onClick={() => router.push('/ja/login')}>
                                無料で始める
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <Footer />

            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
            />

            <StickyHookCTA />
        </main>
    );
}
