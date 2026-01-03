'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import styles from '@/app/blog/compare-pricing-ugc-video-production-tools/Article.module.css';
import Image from 'next/image';

// Helper function to get the landing page URL based on locale
function getLandingPageUrl(locale: string = 'ko'): string {
    if (locale === 'en') return '/';
    return `/${locale}`;
}

export default function ComparePricingUGCArticleKo() {
    const locale = 'ko';
    const landingPageUrl = getLandingPageUrl(locale);
    const [showStickyCta, setShowStickyCta] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCta(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>UGC 비디오 제작 도구 가격 비교 (2025 가이드) | AdMaker AI</title>
                <meta name="description" content="15개 이상의 플랫폼에서 UGC 비디오 제작 도구 가격을 비교합니다. 상세 비용 분석, 숨겨진 비용 및 ROI 분석. 예산에 맞는 도구를 찾으세요." />
                <meta name="keywords" content="UGC 비디오 가격, 비디오 제작 도구 비용, UGC 플랫폼 비교, 비디오 제작 가격, AI 비디오 도구 비용, UGC 도구 비교" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://admakerai.app/ko/blog/ugc-video-production-tools-pricing-comparison" />

                {/* Hreflang Tags */}
                <link rel="alternate" hrefLang="en" href="https://admakerai.app/blog/compare-pricing-ugc-video-production-tools" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.app/fr/blog/comparer-prix-outils-production-video-ugc" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.app/es/blog/comparar-precios-herramientas-produccion-video-ugc" />
                <link rel="alternate" hrefLang="de" href="https://admakerai.app/de/blog/preise-vergleichen-ugc-video-produktionstools" />
                <link rel="alternate" hrefLang="ko" href="https://admakerai.app/ko/blog/ugc-video-production-tools-pricing-comparison" />
                <link rel="alternate" hrefLang="ja" href="https://admakerai.app/ja/blog/ugc-video-production-tools-pricing-comparison" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.app/blog/compare-pricing-ugc-video-production-tools" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content="UGC 비디오 제작 도구 가격 비교 (2025 가이드)" />
                <meta property="og:description" content="15개 이상의 플랫폼에서 UGC 비디오 제작 도구 가격을 비교합니다. 상세 비용 분석, 숨겨진 비용 및 ROI 분석." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&h=720&fit=crop" />
                <meta property="og:url" content="https://admakerai.app/ko/blog/ugc-video-production-tools-pricing-comparison" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:site_name" content="AdMaker AI" />
                <meta property="article:published_time" content="2025-01-02T00:00:00Z" />
                <meta property="article:modified_time" content="2025-01-02T00:00:00Z" />
                <meta property="article:author" content="AdMaker AI" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="UGC 비디오 제작 도구 가격 비교 (2025 가이드)" />
                <meta name="twitter:description" content="15개 이상의 플랫폼에서 UGC 비디오 제작 도구 가격을 비교합니다. 상세 비용 분석, 숨겨진 비용 및 ROI 분석." />
                <meta name="twitter:image" content="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&h=720&fit=crop" />
            </Head>
            <Navbar lang="ko" />
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    <article className={styles.articleContent}>
                        <header className={styles.articleHeader}>
                            <h1 className={styles.mainTitle}>
                                UGC 비디오 제작 도구 가격 비교
                            </h1>
                            <div className={styles.heroImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&h=720&fit=crop"
                                    alt="pricing comparison charts and calculator on desk"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                        </header>

                        <div className={styles.contentBody}>
                            <p>Content is being translated to Korean...</p>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
