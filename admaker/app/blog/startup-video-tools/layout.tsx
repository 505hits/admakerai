import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best AI-Driven UGC Video Platforms for Startups (2025) | AdMaker AI',
    description: 'Discover the best AI-driven UGC video platforms for startups. Compare features, pricing, and find the perfect tool for your startup video marketing.',
    keywords: 'AI video platforms startups, UGC platforms startups, startup video marketing, AI video tools',
    alternates: {
        canonical: 'https://admakerai.app/blog/startup-video-tools',
        languages: {
            'x-default': 'https://admakerai.app/blog/startup-video-tools',
            'en': 'https://admakerai.app/blog/startup-video-tools',
            'fr': 'https://admakerai.app/fr/blog/meilleures-plateformes-video-ugc-ia-startups',
            'es': 'https://admakerai.app/es/blog/mejores-plataformas-video-ugc-ia-startups',
            'pt': 'https://admakerai.app/pt/blog/melhores-plataformas-video-ugc-ia-startups',
            'de': 'https://admakerai.app/de/blog/beste-ki-ugc-video-plattformen-startups',
            'ko': 'https://admakerai.app/ko/blog/ai-ugc-video-platforms-startups',
            'ja': 'https://admakerai.app/ja/blog/ai-ugc-video-platforms-startups',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Best AI-Driven UGC Video Platforms for Startups (2025)',
        description: 'Discover the best AI-driven UGC video platforms for startups.',
        url: 'https://admakerai.app/blog/startup-video-tools',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best AI-Driven UGC Video Platforms for Startups (2025)',
        description: 'Discover the best AI-driven UGC video platforms for startups.',
        images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
