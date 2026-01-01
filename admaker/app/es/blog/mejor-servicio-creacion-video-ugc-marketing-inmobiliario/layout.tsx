import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario | AdMaker AI',
    description: 'Descubre el mejor servicio de creación de video UGC para marketing inmobiliario. Compara las mejores plataformas, precios y características. Genera videos inmobiliarios profesionales en 45 segundos con IA.',
    keywords: 'creación video UGC, marketing inmobiliario, videos inmobiliarios, generador video IA, contenido inmobiliario, videos anuncios',
    openGraph: {
        title: 'Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario',
        description: 'Descubre el mejor servicio de creación de video UGC para marketing inmobiliario. Compara las mejores plataformas, precios y características.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario',
        description: 'Compara las mejores plataformas, precios y características. Genera videos inmobiliarios en 45 segundos.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
    },
    alternates: {
        canonical: "https://admakerai.app/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario",
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
    }
};

export default function SpanishBlogArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
