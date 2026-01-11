import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mejores Creadores de Video UGC para Anuncios Sociales (2025) | AdMaker AI',
    description: 'Descubre los mejores creadores de videos UGC para tus anuncios en redes sociales.',
    alternates: {
        canonical: 'https://admakerai.app/es/blog/mejores-creadores-video-ugc-para-anuncios-sociales',
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
    openGraph: { type: 'article', locale: 'es_ES', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
