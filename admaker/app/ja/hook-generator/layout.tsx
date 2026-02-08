import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "無料AIフック生成ツール | 数秒でバイラルフックを作成 | AdMakerAI",
    description: "AIジェネレーターで数秒で3つのバイラル動画フックを作成。TikTok、Instagram Reels、YouTube Shortsに最適。UGC広告とEコマースマーケティングに最適化。",
    keywords: [
        "フック生成ツール",
        "hook generator",
        "動画フック生成",
        "UGC動画制作",
        "AI広告フック",
        "不動産マーケティング動画",
        "TikTok広告",
        "感情ジェネレーター",
        "UGC動画ツール",
        "Eコマース用AI俳優"
    ],
    alternates: {
        canonical: 'https://admakerai.app/ja/hook-generator',
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
        title: "無料AIフック生成ツール | AdMakerAI",
        description: "数秒で3つのバイラル動画フックを作成。TikTok、Instagram Reels、YouTube Shortsに最適。",
        url: 'https://admakerai.app/ja/hook-generator',
        siteName: 'AdMakerAI',
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "無料AIフック生成ツール | AdMakerAI",
        description: "AIで数秒で3つのバイラル動画フックを作成。",
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
