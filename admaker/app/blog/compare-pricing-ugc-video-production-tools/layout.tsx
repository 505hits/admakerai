import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compare Pricing for UGC Video Production Tools (2025) | AdMaker AI',
    description: 'Compare pricing for UGC video production tools. Find the best value platform for your budget and content creation needs.',
    keywords: 'UGC video pricing, video production tools comparison, UGC platform costs, video marketing budget',
    alternates: {
        canonical: 'https://admakerai.app/blog/compare-pricing-ugc-video-production-tools',
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
    openGraph: {
        type: 'article',
        title: 'Compare Pricing for UGC Video Production Tools (2025)',
        description: 'Compare pricing for UGC video production tools.',
        url: 'https://admakerai.app/blog/compare-pricing-ugc-video-production-tools',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Compare Pricing for UGC Video Production Tools (2025)',
        description: 'Compare pricing for UGC video production tools.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
