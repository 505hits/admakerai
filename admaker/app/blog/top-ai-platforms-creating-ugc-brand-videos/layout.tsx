import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top AI Platforms for Creating UGC Brand Videos (2025) | AdMaker AI',
    description: 'Discover the best AI platforms for creating UGC brand videos. Compare features, pricing, and find the perfect tool for your brand video needs.',
    keywords: 'AI UGC platforms, brand video creation, UGC video tools, AI video marketing, brand content creation',
    alternates: {
        canonical: 'https://admakerai.app/blog/top-ai-platforms-creating-ugc-brand-videos',
        languages: {
            'x-default': 'https://admakerai.app/blog/top-ai-platforms-creating-ugc-brand-videos',
            'en': 'https://admakerai.app/blog/top-ai-platforms-creating-ugc-brand-videos',
            'fr': 'https://admakerai.app/fr/blog/meilleures-plateformes-ia-creation-videos-ugc-marque',
            'es': 'https://admakerai.app/es/blog/mejores-plataformas-ia-crear-videos-ugc-marca',
            'pt': 'https://admakerai.app/pt/blog/melhores-plataformas-ia-criar-videos-ugc-marca',
            'de': 'https://admakerai.app/de/blog/beste-ki-plattformen-ugc-markenvideos',
            'ko': 'https://admakerai.app/ko/blog/brand-ugc-video-ai-platforms',
            'ja': 'https://admakerai.app/ja/blog/brand-ugc-video-ai-platforms',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Top AI Platforms for Creating UGC Brand Videos (2025)',
        description: 'Discover the best AI platforms for creating UGC brand videos.',
        url: 'https://admakerai.app/blog/top-ai-platforms-creating-ugc-brand-videos',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Top AI Platforms for Creating UGC Brand Videos (2025)',
        description: 'Discover the best AI platforms for creating UGC brand videos.',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
