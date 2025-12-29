import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best UGC Video Creation Service for Real Estate Marketing | AdMaker AI',
    description: 'Discover the best UGC video creation service for real estate marketing. Compare top platforms, pricing, and features. Generate property videos in 45 seconds. Try free.',
    keywords: 'UGC video creation, real estate marketing, property videos, AI video generator, real estate content, listing videos',
    alternates: {
        canonical: "https://admakerai.vercel.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
        languages: {
            'en': "https://admakerai.vercel.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
            'fr': "https://admakerai.vercel.app/fr",
            'es': "https://admakerai.vercel.app/es",
            'pt': "https://admakerai.vercel.app/pt",
            'ko': "https://admakerai.vercel.app/ko",
            'de': "https://admakerai.vercel.app/de",
            'x-default': "https://admakerai.vercel.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
        }
    },
    openGraph: {
        title: 'Best UGC Video Creation Service for Real Estate Marketing',
        description: 'Discover the best UGC video creation service for real estate marketing. Compare top platforms, pricing, and features. Generate property videos in 45 seconds. Try free.',
        type: 'article',
        images: [{
            url: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            width: 1200,
            height: 630,
            alt: 'Professional real estate agent for video marketing'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best UGC Video Creation Service for Real Estate Marketing',
        description: 'Compare top platforms, pricing, and features. Generate property videos in 45 seconds.',
    }
};

export default function BlogArticleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
