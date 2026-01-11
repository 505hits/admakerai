import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Comparar Preços das Ferramentas de Produção de Vídeo UGC (2025) | AdMaker AI',
    alternates: {
        canonical: 'https://admakerai.app/pt/blog/comparar-precos-ferramentas-producao-video-ugc',
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
    openGraph: { type: 'article', locale: 'pt_BR', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
