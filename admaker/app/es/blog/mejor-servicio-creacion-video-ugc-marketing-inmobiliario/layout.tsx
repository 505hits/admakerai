import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario (2025) | AdMaker AI',
    alternates: {
        canonical: 'https://admakerai.app/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
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
    openGraph: { type: 'article', locale: 'es_ES', siteName: 'AdMaker AI' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
