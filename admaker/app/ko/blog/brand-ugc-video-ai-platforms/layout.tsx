import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '브랜드 UGC 비디오를 위한 최고의 AI 플랫폼 (2025) | AdMaker AI',
    alternates: {
        canonical: 'https://admakerai.app/ko/blog/brand-ugc-video-ai-platforms',
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
    openGraph: { type: 'article', locale: 'ko_KR', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
