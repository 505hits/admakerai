import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스 | AdMaker AI',
    description: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스를 알아보세요. 최고의 플랫폼, 가격 및 기능을 비교하세요. AI로 45초 만에 전문 부동산 비디오를 생성하세요.',
    keywords: 'UGC 비디오 제작, 부동산 마케팅, 부동산 비디오, AI 비디오 생성기, 부동산 콘텐츠, 광고 비디오',
    openGraph: {
        title: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스',
        description: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스를 알아보세요. 최고의 플랫폼, 가격 및 기능을 비교하세요.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스',
        description: '최고의 플랫폼, 가격 및 기능을 비교하세요. 45초 만에 부동산 비디오를 생성하세요.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
    },
    alternates: {
        canonical: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
        languages: {
            'en': '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'fr': '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            'es': '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            'de': '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
            'ko': '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
            'x-default': '/blog/best-ugc-video-creation-service-for-real-estate-marketing'
        }
    }
};

export default function KoreanBlogArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
