import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Generador de Ganchos IA Gratis | Crea Ganchos Virales en Segundos | AdMakerAI",
    description: "Crea 3 ganchos de video virales en segundos con nuestro generador IA. Perfecto para TikTok, Instagram Reels y YouTube Shorts. Optimizado para anuncios UGC y marketing de e-commerce.",
    keywords: [
        "generador de ganchos",
        "hook generator",
        "generador de ganchos de video",
        "creación de video UGC",
        "ganchos publicitarios IA",
        "videos de marketing inmobiliario",
        "anuncios TikTok",
        "generador de emociones",
        "herramientas de video UGC",
        "actores IA para e-commerce"
    ],
    alternates: {
        canonical: 'https://admakerai.app/es/generador-ganchos',
        languages: {
            'x-default': 'https://admakerai.app/hook-generator',
            'en': 'https://admakerai.app/hook-generator',
            'fr': 'https://admakerai.app/fr/generateur-accroches',
            'es': 'https://admakerai.app/es/generador-ganchos',
            'pt': 'https://admakerai.app/pt/gerador-ganchos',
            'de': 'https://admakerai.app/de/hook-generator',
            'ko': 'https://admakerai.app/ko/hook-generator',
            'ja': 'https://admakerai.app/ja/hook-generator',
        }
    },
    openGraph: {
        title: "Generador de Ganchos IA Gratis | AdMakerAI",
        description: "Crea 3 ganchos de video virales en segundos. Perfecto para TikTok, Instagram Reels y YouTube Shorts.",
        url: 'https://admakerai.app/es/generador-ganchos',
        siteName: 'AdMakerAI',
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Generador de Ganchos IA Gratis | AdMakerAI",
        description: "Crea 3 ganchos de video virales en segundos con IA.",
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
