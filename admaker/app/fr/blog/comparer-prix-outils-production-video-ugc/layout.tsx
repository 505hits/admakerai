import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Comparer les Prix des Outils de Production Vidéo UGC (2025) | AdMaker AI',
    description: 'Comparez les prix des outils de production vidéo UGC. Trouvez la meilleure plateforme pour votre budget.',
    alternates: {
        canonical: 'https://admakerai.app/fr/blog/comparer-prix-outils-production-video-ugc',
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
        title: 'Comparer les Prix des Outils de Production Vidéo UGC (2025)',
        description: 'Comparez les prix des outils de production vidéo UGC.',
        url: 'https://admakerai.app/fr/blog/comparer-prix-outils-production-video-ugc',
        siteName: 'AdMaker AI',
        locale: 'fr_FR',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
