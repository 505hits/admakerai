'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function JapaneseBlogPage() {
    return (
        <main>
            <Navbar lang="ja" />

            <section className="blog-hero" style={{ padding: '120px 0 80px', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
                        AdMaker AI <span style={{ background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ブログ</span>
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        AI動画作成、マーケティング戦略、UGCコンテンツに関する最新のインサイトとヒント
                    </p>
                </div>
            </section>

            <section className="blog-posts" style={{ padding: '80px 0', background: '#000' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

                        {/* Blog Post Card */}
                        <Link href="/ja/blog/best-ugc-video-creation-service-real-estate-marketing" style={{ textDecoration: 'none' }}>
                            <article style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                height: '100%'
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
                                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                                    <img
                                        src={getMediaUrl('Actors/2.jpg')}
                                        alt="不動産マーケティング向けUGC動画作成"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)',
                                        padding: '6px 16px',
                                        borderRadius: '50px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#fff'
                                    }}>
                                        不動産
                                    </div>
                                </div>
                                <div style={{ padding: '30px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px', lineHeight: '1.3' }}>
                                        不動産マーケティングに最適なUGC動画作成サービス
                                    </h2>
                                    <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '20px' }}>
                                        不動産マーケティングに最適なUGC動画作成サービスを発見。トッププラットフォーム、価格、機能を比較。AIで45秒でプロフェッショナルな不動産動画を生成。
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff0844', fontSize: '14px', fontWeight: '600' }}>
                                        続きを読む
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" style={{ padding: '60px 0', background: '#000', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
                                AdMaker<span style={{ background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
                            </span>
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>
                            数分でAI動画広告を作成するナンバーワンプラットフォーム
                        </p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px' }}>
                            © 2024 AdMaker AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
