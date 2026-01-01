import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário | AdMaker AI',
    description: 'Descubra o melhor serviço de criação de vídeo UGC para marketing imobiliário. Compare as melhores plataformas, preços e recursos. Gere vídeos imobiliários profissionais em 45 segundos com IA.',
    keywords: 'criação vídeo UGC, marketing imobiliário, vídeos imobiliários, gerador vídeo IA, conteúdo imobiliário, vídeos anúncios',
    openGraph: {
        title: 'Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário',
        description: 'Descubra o melhor serviço de criação de vídeo UGC para marketing imobiliário. Compare as melhores plataformas, preços e recursos.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário',
        description: 'Compare as melhores plataformas, preços e recursos. Gere vídeos imobiliários em 45 segundos.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
    },
    alternates: {
        canonical: "https://admakerai.app/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario",
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

export default function PortugueseBlogArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
