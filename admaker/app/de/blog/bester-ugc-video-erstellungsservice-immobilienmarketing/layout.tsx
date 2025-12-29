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
        canonical: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
        languages: {
            'en': '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            'fr': '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            'es': '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            'de': '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
            'x-default': '/blog/best-ugc-video-creation-service-for-real-estate-marketing'
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
