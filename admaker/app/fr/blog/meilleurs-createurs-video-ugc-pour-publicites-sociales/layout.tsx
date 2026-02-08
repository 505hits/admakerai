import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meilleurs Créateurs Vidéo UGC pour Publicités Sociales (2025) | AdMaker AI',
    description: 'Découvrez les meilleurs créateurs de vidéos UGC pour vos publicités sociales.',
    alternates: {
        canonical: 'https://admakerai.app/fr/blog/meilleurs-createurs-video-ugc-pour-publicites-sociales',
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
        title: 'Meilleurs Créateurs Vidéo UGC pour Publicités Sociales',
        url: 'https://admakerai.app/fr/blog/meilleurs-createurs-video-ugc-pour-publicites-sociales',
        siteName: 'AdMaker AI',
        locale: 'fr_FR',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
