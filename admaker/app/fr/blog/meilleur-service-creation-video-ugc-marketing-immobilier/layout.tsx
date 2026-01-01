import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier | AdMaker AI',
    description: 'Découvrez le meilleur service de création de vidéo UGC pour le marketing immobilier. Comparez les meilleures plateformes, tarifs et fonctionnalités. Générez des vidéos immobilières en 45 secondes. Essai gratuit.',
    keywords: 'création vidéo UGC, marketing immobilier, vidéos immobilières, générateur vidéo IA, contenu immobilier, vidéos annonces',
    alternates: {
        canonical: "https://admakerai.app/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier",
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
        title: 'Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier',
        description: 'Découvrez le meilleur service de création de vidéo UGC pour le marketing immobilier. Comparez les meilleures plateformes, tarifs et fonctionnalités. Générez des vidéos immobilières en 45 secondes. Essai gratuit.',
        type: 'article',
        images: [{
            url: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            width: 1200,
            height: 630,
            alt: 'Agent immobilier professionnel pour le marketing vidéo'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier',
        description: 'Comparez les meilleures plateformes, tarifs et fonctionnalités. Générez des vidéos immobilières en 45 secondes.',
    }
};

export default function BlogArticleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
