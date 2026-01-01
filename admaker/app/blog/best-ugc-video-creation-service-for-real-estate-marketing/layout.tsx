import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best UGC Video Creation Service for Real Estate Marketing | AdMaker AI',
    description: 'Discover the best UGC video creation service for real estate marketing. Compare top platforms, pricing, and features. Generate property videos in 45 seconds. Try free.',
    keywords: 'UGC video creation, real estate marketing, property videos, AI video generator, real estate content, listing videos',
    alternates: {
        canonical: "https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
        languages: {
            'en': "https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
            'fr': "https://admakerai.app/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier",
            'es': "https://admakerai.app/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario",
            'pt': "https://admakerai.app/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario",
            'de': "https://admakerai.app/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing",
            'ko': "https://admakerai.app/ko/blog/best-ugc-video-creation-service-real-estate-marketing",
            'ja': "https://admakerai.app/ja/blog/best-ugc-video-creation-service-real-estate-marketing",
            'x-default': "https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing",
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
