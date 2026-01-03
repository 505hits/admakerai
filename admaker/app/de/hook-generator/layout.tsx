import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Kostenloser KI Hook-Generator | Erstelle virale Hooks in Sekunden | AdMakerAI",
    description: "Erstelle 3 virale Video-Hooks in Sekunden mit unserem KI-Generator. Perfekt für TikTok, Instagram Reels und YouTube Shorts. Optimiert für UGC-Anzeigen und E-Commerce-Marketing.",
    keywords: [
        "hook generator",
        "hook-generator",
        "video hook generator",
        "UGC-Video-Erstellung",
        "KI-Werbe-Hooks",
        "Immobilien-Marketing-Videos",
        "TikTok-Anzeigen",
        "Emotions-Generator",
        "UGC-Video-Tools",
        "KI-Schauspieler für E-Commerce"
    ],
    alternates: {
        canonical: 'https://admakerai.app/de/hook-generator',
        languages: {
            'x-default': 'https://admakerai.app/hook-generator',
            'en': 'https://admakerai.app/hook-generator',
            'fr': 'https://admakerai.app/fr/generateur-accroches',
            'es': 'https://admakerai.app/es/generador-ganchos',
            'pt': 'https://admakerai.app/pt/gerador-ganchos',
            'de': 'https://admakerai.app/de/hook-generator',
        }
    },
    openGraph: {
        title: "Kostenloser KI Hook-Generator | AdMakerAI",
        description: "Erstelle 3 virale Video-Hooks in Sekunden. Perfekt für TikTok, Instagram Reels und YouTube Shorts.",
        url: 'https://admakerai.app/de/hook-generator',
        siteName: 'AdMakerAI',
        locale: 'de_DE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Kostenloser KI Hook-Generator | AdMakerAI",
        description: "Erstelle 3 virale Video-Hooks in Sekunden mit KI.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
