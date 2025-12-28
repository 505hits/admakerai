'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import IndustryTabs from '@/components/IndustryTabs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function HomeKo() {
    return (
        <>
            <Navbar lang="ko" />
            <Hero lang="ko" />

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
                            '뷰티 광고',
                            '제품 출시',
                            '음료 캠페인',
                            'UGC 팟캐스트',
                            '고객 후기',
                            '피트니스 & 스포츠'
                        ];

                        const stats = [
                            '전환율 +250%',
                            '조회수 10M+',
                            'ROI x5',
                            '참여도 +180%',
                            'CTR +320%',
                            '도달률 x3'
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

            <IndustryTabs lang="ko" />

            {/* Winning Ad Replicator Section */}
            <section className="replicator-feature" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)', border: '1px solid rgba(255, 8, 68, 0.3)', borderRadius: '50px', padding: '8px 20px', fontSize: '13px', fontWeight: '700', color: '#ff0844', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>✨ 신규 기능</div>
                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>성공한 광고 <span className="gradient-text-red">복제기</span></h2>
                        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>성공한 광고를 업로드하고 다른 AI 배우로 복제하세요. 동일한 스크립트와 스타일을 유지하면서 새로운 얼굴을 테스트하기에 완벽합니다.</p>
                    </div>
                    <div className="animate-fade-in-up stagger-1" style={{ display: 'flex', flexDirection: 'row', gap: '40px', maxWidth: '1100px', margin: '0 auto', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px', textAlign: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '20px', maxWidth: '280px', width: '100%' }}>
                                <video src={getMediaUrl('landing winning 1.mp4')} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff' }}>원본</div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>성공한 광고</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>성과가 좋은 비디오를 업로드하세요</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', color: '#ff0844', fontSize: '32px', fontWeight: '800' }}>→</div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px', textAlign: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '20px', maxWidth: '280px', width: '100%' }}>
                                <video src={getMediaUrl('landing winning 2.mp4')} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #ff0844, #ff6b6b)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff' }}>복제됨</div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>AI 배우 새 버전</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>동일한 스크립트, 다른 얼굴, 즉각적인 결과</p>
                        </div>
                    </div>
                </div>
            </section>

            <Pricing lang="ko" />
            <Testimonials lang="ko" />

            {/* Why AdMaker AI Section */}
            <section className="features" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#000' }}>
                <div className="container">
                    <div className="section-header"><h2 style={{ fontSize: '48px', marginBottom: '20px' }}>AI UGC 비디오 제작이 이렇게 쉬울 수 없었습니다</h2></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '60px', maxWidth: '1200px', margin: '60px auto 0' }}>
                        <div className="animate-scale-in stagger-1" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>YouTube Shorts 제작</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>AI로 생성된 콘텐츠로 YouTube Shorts를 만드세요. 녹화할 필요가 없습니다.</p></div>
                        <div className="animate-scale-in stagger-2" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>바이럴 TikTok 비디오 제작</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>바이럴한 TikTok 비디오를 만드세요. 춤추거나 립싱크할 필요가 없습니다.</p></div>
                        <div className="animate-scale-in stagger-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>TikTok & YouTube에 게시</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>앱에서 직접 비디오를 게시하세요.</p></div>
                        <div className="animate-scale-in stagger-4" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>100% AI 기반</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>최신의 가장 강력한 모델을 사용하여 관련성 있고 매력적인 콘텐츠를 생성합니다.</p></div>
                        <div className="animate-scale-in stagger-5" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>AI 생성 보이스오버</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>최신 AI 모델을 사용하여 비디오용 보이스오버를 생성합니다.</p></div>
                        <div className="animate-scale-in stagger-6" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>배경 음악</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>비디오에 배경 음악을 추가하세요. 수천 곡의 라이브러리가 있습니다.</p></div>
                        <div className="animate-scale-in stagger-7" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>다중 형식 내보내기</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>TikTok, Instagram Reels, YouTube용 9:16, 1:1 또는 16:9로 내보내기하세요.</p></div>
                        <div className="animate-scale-in stagger-8" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>그리고 훨씬 더...</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>AdMaker AI는 계속 발전하고 있습니다. 매주 새로운 기능을 추가하고 있습니다.</p></div>
                    </div>
                </div>
            </section>

            <Pricing lang="ko" />
            <IndustryTabs lang="ko" />
            <Testimonials lang="ko" />
            <FAQ lang="ko" />
        </>
    );
}
