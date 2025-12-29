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
        canonical: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
        languages: {
            'en': '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'fr': '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            'es': '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            'x-default': '/blog/best-ugc-video-creation-service-for-real-estate-marketing'
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
