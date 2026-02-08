import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best UGC Video Creation Service for Real Estate Marketing (2025) | AdMaker AI',
    description: 'Discover the best UGC video creation services for real estate marketing. Create compelling property videos that convert.',
    keywords: 'real estate video marketing, UGC real estate, property video creation, real estate UGC content',
    alternates: {
        canonical: 'https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing',
        languages: {
            'x-default': 'https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'en': 'https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'fr': 'https://admakerai.app/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            'es': 'https://admakerai.app/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            'pt': 'https://admakerai.app/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
            'de': 'https://admakerai.app/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
            'ko': 'https://admakerai.app/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
            'ja': 'https://admakerai.app/ja/blog/best-ugc-video-creation-service-real-estate-marketing',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Best UGC Video Creation Service for Real Estate Marketing (2025)',
        description: 'Discover the best UGC video creation services for real estate marketing.',
        url: 'https://admakerai.app/blog/best-ugc-video-creation-service-for-real-estate-marketing',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best UGC Video Creation Service for Real Estate Marketing (2025)',
        description: 'Discover the best UGC video creation services for real estate marketing.',
        images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
