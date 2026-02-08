'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndustryTabs from '@/components/IndustryTabs';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import TypedText from '@/components/TypedText';
import Testimonials from '@/components/Testimonials';
import FloatingCTA from '@/components/FloatingCTA';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function HomeJa() {
    useEffect(() => {
        const handleScroll = () => {
            const tiltImage = document.querySelector('.feature-image-tilt img') as HTMLElement;
            if (!tiltImage) return;

            const rect = tiltImage.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const imageCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            const distanceFromCenter = (imageCenter - viewportCenter) / viewportCenter;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const rotateY = distanceFromCenter * 15;
                const rotateX = distanceFromCenter * -5;
                const scale = 1 - Math.abs(distanceFromCenter) * 0.05;

                tiltImage.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
                tiltImage.style.transition = 'transform 0.1s ease-out';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            <Navbar lang="ja" />
            <Hero lang="ja" />

            {/* Examples Slider Section */}
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
                            '製品ローンチ',
                            '飲料キャンペーン',
                            'UGCポッドキャスト',
                            '顧客の声',
                            'フィットネス＆スポーツ'
                        ];

                        const stats = [
                            'コンバージョン+250%',
                            '1000万回以上の視聴',
                            'ROI x5',
                            'エンゲージメント+180%',
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

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="feature-row">
                        <div className="feature-content">
                            <h3>あなたの<TypedText />に最適なAI動画を取得</h3>
                            <p>2分以内にプロフェッショナルな動画広告を作成。当社の高度なAIがスクリプトを瞬時にバイラルコンテンツに変換します。</p>
                            <ul className="feature-list">
                                <li>✓ 300以上のアクターテンプレート利用可能</li>
                                <li>✓ 2分以内に動画を生成</li>
                                <li>✓ AIによるスクリプト最適化</li>
                                <li>✓ バイラルコンテンツの即時作成</li>
                            </ul>
                        </div>
                        <div className="feature-image feature-image-tilt">
                            <img src={getMediaUrl('ultra-fast-generation.jpg')} alt="UGC動画の例" />
                        </div>
                    </div>

                    {/* Step by Step Guide */}
                    <div className="section-header" style={{ marginTop: '80px' }}>
                        <h2><span className="gradient-text-red">3つの簡単なステップ</span>でAI UGC動画を作成する方法</h2>
                        <p>当社のスクリプトからAI動画作成ツールを使用すれば、数分でプロフェッショナルなUGC動画広告を簡単に生成できます。</p>
                    </div>

                    <div className="steps-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '50px' }}>
                        {/* Step 1 */}
                        <div className="step-card animate-fade-in-up stagger-1" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 8, 68, 0.15)', color: '#ff0844', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                ステップ1
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>アクターを選択</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>ライブラリを使用するか、画像をアップロードするか、リアルなAI画像生成ツールを使用します。</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step1.jpg')} alt="AIアクターを選択" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step-card animate-fade-in-up stagger-2" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 107, 107, 0.15)', color: '#ff6b6b', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                ステップ2
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>スクリプトを書く</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>スマートなAIライティングでアイデアを撮影準備完了の広告に変換します。</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('Step2.png')} alt="スクリプトを書く" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step-card animate-fade-in-up stagger-3" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 26, 90, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 26, 90, 0.15)', color: '#ff1a5a', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                ステップ3
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>動画を生成</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>数分で驚くほどリアルなUGCに命を吹き込みます。</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step3.jpg')} alt="動画を生成" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry Tabs Section */}
            <IndustryTabs lang="ja" />

            {/* Winning Ad Replicator Section */}
            <section className="replicator-feature" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
                            border: '1px solid rgba(255, 8, 68, 0.3)',
                            borderRadius: '50px',
                            padding: '8px 20px',
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#ff0844',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '24px'
                        }}>
                            ✨ 新機能
                        </div>
                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
                            <span className="gradient-text-red">勝利広告</span>レプリケーター
                        </h2>
                        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                            勝利広告をアップロードして、別のAIアクターで複製します。実証済みのスクリプトとスタイルを維持しながら、新しい顔をテストするのに最適です。
                        </p>
                    </div>

                    <div className="animate-fade-in-up stagger-1" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '40px',
                        maxWidth: '1100px',
                        margin: '0 auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '24px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                position: 'relative',
                                aspectRatio: '9/16',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: '#000',
                                marginBottom: '20px',
                                maxWidth: '280px',
                                width: '100%'
                            }}>
                                <video
                                    src={getMediaUrl('landing winning 1.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>
                                    オリジナル
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                                あなたの勝利広告
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                パフォーマンスの高い動画をアップロード
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            color: '#ff0844',
                            fontSize: '32px',
                            fontWeight: '800'
                        }}>
                            →
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '24px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                position: 'relative',
                                aspectRatio: '9/16',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: '#000',
                                marginBottom: '20px',
                                maxWidth: '280px',
                                width: '100%'
                            }}>
                                <video
                                    src={getMediaUrl('landing winning 2.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    background: 'linear-gradient(135deg, #ff0844, #ff6b6b)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>
                                    複製済み
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                                AIアクターによる新バージョン
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                同じスクリプト、異なる顔、即座に結果
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <Pricing lang="ja" />

            {/* Testimonials Section */}
            <Testimonials lang="ja" />

            {/* Why AdMaker AI Section */}
            <section className="features" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#000' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>
                            AI UGC動画作成がこれまでになく簡単に
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                        marginTop: '60px',
                        maxWidth: '1200px',
                        margin: '60px auto 0'
                    }}>
                        {/* Card 1 - YouTube */}
                        <div className="animate-scale-in stagger-1" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                YouTubeショート動画を作成
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                AI生成コンテンツでYouTubeショート動画を作成。何も録画する必要はありません。
                            </p>
                        </div>

                        {/* Card 2 - TikTok */}
                        <div className="animate-scale-in stagger-2" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                バイラルTikTok動画を作成
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                バイラルになるTikTok動画を作成。ダンスやリップシンクは不要です。
                            </p>
                        </div>

                        {/* Card 3 - Publish */}
                        <div className="animate-scale-in stagger-3" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                TikTokとYouTubeに公開
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                アプリから直接動画を公開します。
                            </p>
                        </div>

                        {/* Card 4 - AI Powered */}
                        <div className="animate-scale-in stagger-4" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                100% AI駆動
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                最新かつ最も強力なモデルを使用して、関連性の高い魅力的なコンテンツを生成します。
                            </p>
                        </div>

                        {/* Card 5 - AI Voiceovers */}
                        <div className="animate-scale-in stagger-5" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                    <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                AI生成ボイスオーバー
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                最新のAIモデルを使用して動画のボイスオーバーを生成します。
                            </p>
                        </div>

                        {/* Card 6 - Background Music */}
                        <div className="animate-scale-in stagger-6" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                バックグラウンドミュージック
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                動画にバックグラウンドミュージックを追加。数千曲のライブラリがあります。
                            </p>
                        </div>

                        {/* Card 7 - Multi-Format */}
                        <div className="animate-scale-in stagger-7" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                    <polyline points="17 2 12 7 7 2" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                マルチフォーマット出力
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                TikTok、Instagram Reels、YouTube用に9:16、1:1、16:9で出力。
                            </p>
                        </div>

                        {/* Card 8 - And much more */}
                        <div className="animate-scale-in stagger-8" style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                その他多数...
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                                AdMaker AIは常に進化しています。毎週新機能を追加しています。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ lang="ja" />

            {/* CTA Section */}
            <section className="cta" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="cta-glow"></div>
                <div className="container">
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '32px',
                        padding: '80px 60px',
                        textAlign: 'center',
                        position: 'relative',
                        backdropFilter: 'blur(10px)'
                    }} className="animate-fade-in-up">
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 56px)',
                            fontWeight: '800',
                            marginBottom: '24px',
                            lineHeight: '1.2'
                        }}>
                            退屈な動画にさようなら 👋
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '40px',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            lineHeight: '1.6'
                        }}>
                            今すぐAdMaker AIを始めて、TikTok、Instagram Reels、YouTube用の魅力的なUGC動画を自動操縦で作成しましょう。
                        </p>
                        <a
                            href="/ja/login"
                            className="btn-primary btn-large"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '18px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)',
                                color: '#fff',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 30px rgba(255, 8, 68, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 8, 68, 0.4)';
                            }}
                        >
                            始める
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="logo">
                                <span className="logo-text">AdMaker<span className="gradient-text">AI</span></span>
                            </div>
                            <p>数分でAI動画広告を作成するナンバーワンプラットフォーム。</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 AdMaker AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Floating CTA Button */}
            <FloatingCTA text="今すぐAIビデオを作成" href="/ja/login" />
        </main>
    );
}
