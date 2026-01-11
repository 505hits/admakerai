import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ブランドUGCビデオ向け最高のAIプラットフォーム (2025) | AdMaker AI',
    alternates: {
        canonical: 'https://admakerai.app/ja/blog/brand-ugc-video-ai-platforms',
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
    openGraph: { type: 'article', locale: 'ja_JP', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
