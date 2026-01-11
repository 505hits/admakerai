import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UGC 비디오 제작 도구 가격 비교 (2025) | AdMaker AI',
    alternates: {
        canonical: 'https://admakerai.app/ko/blog/ugc-video-production-tools-pricing-comparison',
        languages: {
            'x-default': 'https://admakerai.app/blog/compare-pricing-ugc-video-production-tools',
            'en': 'https://admakerai.app/blog/compare-pricing-ugc-video-production-tools',
            'fr': 'https://admakerai.app/fr/blog/comparer-prix-outils-production-video-ugc',
            'es': 'https://admakerai.app/es/blog/comparar-precios-herramientas-produccion-video-ugc',
            'pt': 'https://admakerai.app/pt/blog/comparar-precos-ferramentas-producao-video-ugc',
            'de': 'https://admakerai.app/de/blog/preise-vergleichen-ugc-video-produktionstools',
            'ko': 'https://admakerai.app/ko/blog/ugc-video-production-tools-pricing-comparison',
            'ja': 'https://admakerai.app/ja/blog/ugc-video-production-tools-pricing-comparison',
        },
    },
    openGraph: { type: 'article', locale: 'ko_KR', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
