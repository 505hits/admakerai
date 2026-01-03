import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gerador de Ganchos IA Grátis | Crie Ganchos Virais em Segundos | AdMakerAI",
    description: "Crie 3 ganchos de vídeo virais em segundos com nosso gerador IA. Perfeito para TikTok, Instagram Reels e YouTube Shorts. Otimizado para anúncios UGC e marketing de e-commerce.",
    keywords: [
        "gerador de ganchos",
        "hook generator",
        "gerador de ganchos de vídeo",
        "criação de vídeo UGC",
        "ganchos publicitários IA",
        "vídeos de marketing imobiliário",
        "anúncios TikTok",
        "gerador de emoções",
        "ferramentas de vídeo UGC",
        "atores IA para e-commerce"
    ],
    alternates: {
        canonical: 'https://admakerai.app/pt/gerador-ganchos',
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
        title: "Gerador de Ganchos IA Grátis | AdMakerAI",
        description: "Crie 3 ganchos de vídeo virais em segundos. Perfeito para TikTok, Instagram Reels e YouTube Shorts.",
        url: 'https://admakerai.app/pt/gerador-ganchos',
        siteName: 'AdMakerAI',
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Gerador de Ganchos IA Grátis | AdMakerAI",
        description: "Crie 3 ganchos de vídeo virais em segundos com IA.",
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
