import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Mobile Apps for Creating UGC Videos for TikTok (2025) | AdMaker AI',
    description: 'Discover the best mobile apps for creating UGC videos for TikTok. Compare features, pricing, and find the perfect tool for your TikTok content strategy.',
    keywords: 'TikTok video apps, UGC mobile apps, TikTok content creation, mobile video editing, UGC videos TikTok',
    alternates: {
        canonical: 'https://admakerai.app/blog/best-mobile-apps-creating-ugc-videos-tiktok',
        languages: {
            'x-default': 'https://admakerai.app/blog/best-mobile-apps-creating-ugc-videos-tiktok',
            'en': 'https://admakerai.app/blog/best-mobile-apps-creating-ugc-videos-tiktok',
            'fr': 'https://admakerai.app/fr/blog/meilleures-apps-mobiles-creation-videos-ugc-tiktok',
            'es': 'https://admakerai.app/es/blog/mejores-apps-moviles-crear-videos-ugc-tiktok',
            'pt': 'https://admakerai.app/pt/blog/melhores-apps-moveis-criar-videos-ugc-tiktok',
            'de': 'https://admakerai.app/de/blog/beste-mobile-apps-ugc-videos-tiktok',
            'ko': 'https://admakerai.app/ko/blog/best-mobile-apps-ugc-videos-tiktok',
            'ja': 'https://admakerai.app/ja/blog/best-mobile-apps-ugc-videos-tiktok',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Best Mobile Apps for Creating UGC Videos for TikTok (2025)',
        description: 'Discover the best mobile apps for creating UGC videos for TikTok.',
        url: 'https://admakerai.app/blog/best-mobile-apps-creating-ugc-videos-tiktok',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Mobile Apps for Creating UGC Videos for TikTok (2025)',
        description: 'Discover the best mobile apps for creating UGC videos for TikTok.',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
