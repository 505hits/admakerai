import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compare Free vs Paid UGC Video Creation Tools (2025) | AdMaker AI',
    description: 'Compare free vs paid UGC video creation tools. Discover which option is best for your budget and content needs.',
    keywords: 'free vs paid UGC tools, UGC video comparison, free video creation, paid video tools',
    alternates: {
        canonical: 'https://admakerai.app/blog/compare-free-vs-paid-ugc-video-creation-tools',
        languages: {
            'x-default': 'https://admakerai.app/blog/compare-free-vs-paid-ugc-video-creation-tools',
            'en': 'https://admakerai.app/blog/compare-free-vs-paid-ugc-video-creation-tools',
            'fr': 'https://admakerai.app/fr/blog/comparer-outils-creation-video-ugc-gratuits-payants',
            'es': 'https://admakerai.app/es/blog/comparar-herramientas-creacion-video-ugc-gratis-pago',
            'pt': 'https://admakerai.app/pt/blog/comparar-ferramentas-criacao-video-ugc-gratis-pagas',
            'de': 'https://admakerai.app/de/blog/vergleich-kostenlose-kostenpflichtige-ugc-video-tools',
            'ko': 'https://admakerai.app/ko/blog/compare-free-paid-ugc-video-tools',
            'ja': 'https://admakerai.app/ja/blog/compare-free-paid-ugc-video-tools',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Compare Free vs Paid UGC Video Creation Tools (2025)',
        description: 'Compare free vs paid UGC video creation tools.',
        url: 'https://admakerai.app/blog/compare-free-vs-paid-ugc-video-creation-tools',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Compare Free vs Paid UGC Video Creation Tools (2025)',
        description: 'Compare free vs paid UGC video creation tools.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
