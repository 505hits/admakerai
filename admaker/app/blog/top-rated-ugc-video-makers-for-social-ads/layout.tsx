import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top-Rated UGC Video Makers for Social Ads (2025 Reviews) | AdMaker AI',
    description: 'Discover top-rated UGC video makers for social ads based on user reviews, performance data, and ROI. Compare features, ratings, and real campaign results.',
    keywords: 'UGC video makers, social ads video tools, top rated UGC software, ad performance reviews, AdMaker reviews, Creatify reviews, Arcads reviews',
    alternates: {
        canonical: 'https://admakerai.app/blog/top-rated-ugc-video-makers-for-social-ads',
        languages: {
            'x-default': 'https://admakerai.app/blog/top-rated-ugc-video-makers-for-social-ads',
            'en': 'https://admakerai.app/blog/top-rated-ugc-video-makers-for-social-ads',
            'fr': 'https://admakerai.app/fr/blog/meilleurs-createurs-video-ugc-pour-publicites-sociales',
            'es': 'https://admakerai.app/es/blog/mejores-creadores-video-ugc-para-anuncios-sociales',
            'pt': 'https://admakerai.app/pt/blog/melhores-criadores-video-ugc-para-anuncios-sociais',
            'de': 'https://admakerai.app/de/blog/beste-ugc-video-macher-fuer-social-ads',
            'ko': 'https://admakerai.app/ko/blog/top-rated-ugc-video-makers-social-ads',
            'ja': 'https://admakerai.app/ja/blog/top-rated-ugc-video-makers-social-ads',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Top-Rated UGC Video Makers for Social Ads (2025 Reviews)',
        description: 'Discover top-rated UGC video makers for social ads based on user reviews, performance data, and ROI.',
        url: 'https://admakerai.app/blog/top-rated-ugc-video-makers-for-social-ads',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
        publishedTime: '2025-01-03T00:00:00Z',
        authors: ['AdMaker AI'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Top-Rated UGC Video Makers for Social Ads (2025 Reviews)',
        description: 'Discover top-rated UGC video makers for social ads based on user reviews, performance data, and ROI.',
        images: ['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
