import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bester UGC-Video-Erstellungsservice für Immobilienmarketing | AdMaker AI',
    description: 'Entdecken Sie den besten UGC-Video-Erstellungsservice für Immobilienmarketing. Vergleichen Sie Top-Plattformen, Preise und Funktionen. Erstellen Sie professionelle Immobilienvideos in 45 Sekunden mit KI.',
    keywords: 'UGC-Video-Erstellung, Immobilienmarketing, Immobilienvideos, KI-Video-Generator, Immobilieninhalte, Anzeigenvideos',
    openGraph: {
        title: 'Bester UGC-Video-Erstellungsservice für Immobilienmarketing',
        description: 'Entdecken Sie den besten UGC-Video-Erstellungsservice für Immobilienmarketing. Vergleichen Sie Top-Plattformen, Preise und Funktionen.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bester UGC-Video-Erstellungsservice für Immobilienmarketing',
        description: 'Vergleichen Sie Top-Plattformen, Preise und Funktionen. Erstellen Sie Immobilienvideos in 45 Sekunden.',
        images: ['https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg'],
    },
    alternates: {
        canonical: "https://admakerai.app/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing",
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

export default function GermanBlogArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
