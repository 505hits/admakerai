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
        canonical: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
        languages: {
            'en': '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'fr': '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            'es': '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            'de': '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
            'ko': '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
            'pt': '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
            'x-default': '/blog/best-ugc-video-creation-service-for-real-estate-marketing'
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
