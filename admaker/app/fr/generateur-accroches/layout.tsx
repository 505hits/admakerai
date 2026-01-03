import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Générateur d'Accroches IA Gratuit | Créez des Hooks Viraux en Secondes | AdMakerAI",
    description: "Créez 3 accroches vidéo virales en quelques secondes avec notre générateur IA. Parfait pour TikTok, Instagram Reels et YouTube Shorts. Optimisé pour les publicités UGC et le marketing e-commerce.",
    keywords: [
        "générateur d'accroches",
        "hook generator",
        "générateur de hooks vidéo",
        "création vidéo UGC",
        "accroches publicitaires IA",
        "marketing immobilier vidéo",
        "publicités TikTok",
        "générateur d'émotions",
        "outils vidéo UGC",
        "acteurs IA e-commerce"
    ],
    alternates: {
        canonical: 'https://admakerai.app/fr/generateur-accroches',
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
        title: "Générateur d'Accroches IA Gratuit | AdMakerAI",
        description: "Créez 3 accroches vidéo virales en quelques secondes. Parfait pour TikTok, Instagram Reels et YouTube Shorts.",
        url: 'https://admakerai.app/fr/generateur-accroches',
        siteName: 'AdMakerAI',
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Générateur d'Accroches IA Gratuit | AdMakerAI",
        description: "Créez 3 accroches vidéo virales en quelques secondes avec l'IA.",
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
