
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BlogVideoSidebar from '@/components/BlogVideoSidebar';
import styles from './Article.module.css'; // Assuming this exists in the root or a standard import is possible. 
// Wait, if we are creating file in app/blog/[slug]/page.tsx, then relative path is ../Article.module.css? 
// No, previously it was import styles from './Article.module.css'; which means it was in SAME folder.
// Since we are creating a new folder, we won't have the CSS file there.
// We MUST either inject styles or assume global styles/tailwind.
// To fix "Missing CSS", I will use a path assuming it's in a shared location, OR just comment out styles import and rely on Tailwind.
// The user's code relies on Tailwind mostly now.
// I will REMOVE the css module import to prevent build errors and rely on Tailwind classes used in the JSX.
// import styles from './Article.module.css'; << REMOVED

export default function BlogPost() {
    const [showStickyCta, setShowStickyCta] = useState(false);
    useEffect(() => {
        const handleScroll = () => setShowStickyCta(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jsonLd = {"@context":"https://schema.org","@type":"Article","headline":"2026년 최고의 아크애드 AI 사용법: 전문가의 포괄적인 가이드","image":"https://placehold.co/800x450?text=Gen+Failed","author":{"@type":"Organization","name":"AdMaker AI"},"mainEntity":{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"아크애드 AI는 무엇인가요?","acceptedAnswer":{"@type":"Answer","text":"아크애드 AI는 인공지능 기반의 디지털 광고 제작 및 관리 플랫폼입니다. UGC 광고부터 전문적인 마케팅 캠페인까지 다양한 광고 제작을 지원합니다."}},{"@type":"Question","name":"AdMaker AI와 아크애드 AI를 함께 사용할 수 있나요?","acceptedAnswer":{"@type":"Answer","text":"네, 두 플랫폼은 상호 보완적으로 사용할 수 있습니다. AdMaker AI의 UGC 제작 도구와 아크애드 AI의 캠페인 관리 기능을 통합하여 사용하면 더욱 효과적입니다."}},{"@type":"Question","name":"초보자도 쉽게 사용할 수 있나요?","acceptedAnswer":{"@type":"Answer","text":"네, 직관적인 인터페이스와 AI 기반 가이드를 제공하여 초보자도 쉽게 시작할 수 있습니다."}},{"@type":"Question","name":"무료로 사용할 수 있나요?","acceptedAnswer":{"@type":"Answer","text":"기본적인 기능은 무료로 제공되며, 고급 기능은 유료 구독제로 이용할 수 있습니다."}},{"@type":"Question","name":"어떤 광고 포맷을 지원하나요?","acceptedAnswer":{"@type":"Answer","text":"이미지, 비디오, 캐러셀, 스토리 등 다양한 소셜 미디어 광고 포맷을 지원합니다."}},{"@type":"Question","name":"실시간 성과 분석이 가능한가요?","acceptedAnswer":{"@type":"Answer","text":"네, 실시간 대시보드를 통해 광고 성과를 즉시 확인하고 최적화할 수 있습니다."}},{"@type":"Question","name":"다른 마케팅 도구와 연동이 가능한가요?","acceptedAnswer":{"@type":"Answer","text":"네, 주요 마케팅 플랫폼 및 분석 도구와의 API 연동을 지원합니다."}},{"@type":"Question","name":"자동화 기능은 어떤 것이 있나요?","acceptedAnswer":{"@type":"Answer","text":"광고 제작, 게재 일정 관리, 성과 분석, 예산 조정 등 다양한 자동화 기능을 제공합니다."}},{"@type":"Question","name":"데이터 보안은 안전한가요?","acceptedAnswer":{"@type":"Answer","text":"최신 보안 프로토콜을 적용하여 사용자 데이터를 안전하게 보호합니다."}},{"@type":"Question","name":"지원되는 언어는 무엇인가요?","acceptedAnswer":{"@type":"Answer","text":"한국어를 포함한 주요 글로벌 언어를 지원합니다."}},{"@type":"Question","name":"기술 지원은 어떻게 받을 수 있나요?","acceptedAnswer":{"@type":"Answer","text":"24/7 고객 지원 센터와 온라인 헬프 센터를 통해 기술 지원을 받을 수 있습니다."}},{"@type":"Question","name":"AI 학습 데이터는 어떻게 관리되나요?","acceptedAnswer":{"@type":"Answer","text":"사용자 프라이버시를 보호하면서 지속적인 성능 개선을 위한 데이터 학습을 진행합니다."}},{"@type":"Question","name":"모바일 앱이 있나요?","acceptedAnswer":{"@type":"Answer","text":"iOS와 Android용 모바일 앱을 제공하여 언제 어디서나 캠페인을 관리할 수 있습니다."}},{"@type":"Question","name":"결제 방식은 어떻게 되나요?","acceptedAnswer":{"@type":"Answer","text":"월간 구독제와 사용량 기반 과금 방식 중 선택할 수 있습니다."}},{"@type":"Question","name":"광고 성과 향상을 위한 팁이 있나요?","acceptedAnswer":{"@type":"Answer","text":"A/B 테스트 활용, 타겟 오디언스 분석, 크리에이티브 최적화 등 다양한 전략을 제공합니다."}}]}};

    return (
      <>
        <Head>
          <title>2026년 최고의 아크애드 AI 사용법: 전문가의 포괄적인 가이드 | AdMaker AI</title>
          <meta name="description" content="2026년 아크애드 AI의 완벽한 활용 가이드. UGC 광고 제작부터 고급 기능까지 상세히 알아보는 전문가의 포괄적인 안내서입니다." />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
        
        <Navbar lang="ko" />
        
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-[100px] px-4 overflow-x-hidden font-sans">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
                
                {/* Left: Article */}
                <article className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 break-words">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">2026년 최고의 아크애드 AI 사용법: 전문가의 포괄적인 가이드</h1>
                        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
                            <img src="https://placehold.co/800x450?text=Gen+Failed" alt="2026년 최고의 아크애드 AI 사용법: 전문가의 포괄적인 가이드" class="w-full object-cover" />
                        </div>
                    </header>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-8 rounded-2xl mb-12 shadow-lg">
                         <h3 className="text-[#ff0844] font-bold text-lg mb-4 uppercase tracking-wider flex items-center">
                            <span className="mr-2">⚡</span> Quick Answer
                         </h3>
                         <p className="text-blue-100 leading-relaxed text-lg font-medium">아크애드 AI(ArcAds AI)는 인공지능 기반 광고 제작 플랫폼으로, UGC 스타일의 광고부터 전문적인 마케팅 캠페인까지 제작할 수 있습니다. AdMaker AI와 같은 최신 도구를 활용하면 더욱 효과적인 광고 제작이 가능합니다.</p>
                    </div>

                    <div 
                        className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[#ff0844] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    />

                    {/* FAQ */}
                    <section className="mt-16 pt-10 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-8 flex items-center"><span className="mr-3">❓</span> FAQ</h2>
                        <div className="space-y-6">
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">아크애드 AI는 무엇인가요?</h3>
                                <p className="text-gray-400 leading-relaxed">아크애드 AI는 인공지능 기반의 디지털 광고 제작 및 관리 플랫폼입니다. UGC 광고부터 전문적인 마케팅 캠페인까지 다양한 광고 제작을 지원합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">AdMaker AI와 아크애드 AI를 함께 사용할 수 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">네, 두 플랫폼은 상호 보완적으로 사용할 수 있습니다. AdMaker AI의 UGC 제작 도구와 아크애드 AI의 캠페인 관리 기능을 통합하여 사용하면 더욱 효과적입니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">초보자도 쉽게 사용할 수 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">네, 직관적인 인터페이스와 AI 기반 가이드를 제공하여 초보자도 쉽게 시작할 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">무료로 사용할 수 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">기본적인 기능은 무료로 제공되며, 고급 기능은 유료 구독제로 이용할 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">어떤 광고 포맷을 지원하나요?</h3>
                                <p className="text-gray-400 leading-relaxed">이미지, 비디오, 캐러셀, 스토리 등 다양한 소셜 미디어 광고 포맷을 지원합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">실시간 성과 분석이 가능한가요?</h3>
                                <p className="text-gray-400 leading-relaxed">네, 실시간 대시보드를 통해 광고 성과를 즉시 확인하고 최적화할 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">다른 마케팅 도구와 연동이 가능한가요?</h3>
                                <p className="text-gray-400 leading-relaxed">네, 주요 마케팅 플랫폼 및 분석 도구와의 API 연동을 지원합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">자동화 기능은 어떤 것이 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">광고 제작, 게재 일정 관리, 성과 분석, 예산 조정 등 다양한 자동화 기능을 제공합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">데이터 보안은 안전한가요?</h3>
                                <p className="text-gray-400 leading-relaxed">최신 보안 프로토콜을 적용하여 사용자 데이터를 안전하게 보호합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">지원되는 언어는 무엇인가요?</h3>
                                <p className="text-gray-400 leading-relaxed">한국어를 포함한 주요 글로벌 언어를 지원합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">기술 지원은 어떻게 받을 수 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">24/7 고객 지원 센터와 온라인 헬프 센터를 통해 기술 지원을 받을 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">AI 학습 데이터는 어떻게 관리되나요?</h3>
                                <p className="text-gray-400 leading-relaxed">사용자 프라이버시를 보호하면서 지속적인 성능 개선을 위한 데이터 학습을 진행합니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">모바일 앱이 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">iOS와 Android용 모바일 앱을 제공하여 언제 어디서나 캠페인을 관리할 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">결제 방식은 어떻게 되나요?</h3>
                                <p className="text-gray-400 leading-relaxed">월간 구독제와 사용량 기반 과금 방식 중 선택할 수 있습니다.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">광고 성과 향상을 위한 팁이 있나요?</h3>
                                <p className="text-gray-400 leading-relaxed">A/B 테스트 활용, 타겟 오디언스 분석, 크리에이티브 최적화 등 다양한 전략을 제공합니다.</p>
                            </div>
                            
                        </div>
                    </section>
                </article>

                {/* Right: Sticky Sidebar */}
                <aside className="hidden lg:block sticky top-[120px]">
                    <BlogVideoSidebar lang="ko" />
                </aside>

            </div>
        </div>
        
        {/* Mobile Sticky CTA */}
        <a href="/ko" className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff0844] to-[#ff5478] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(255,8,68,0.4)] z-50 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 ${showStickyCta ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'}`}>
            Create your AI Ads now 👆
        </a>

      </>
    );
}
