import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "무료 AI 훅 생성기 | 몇 초 만에 바이럴 훅 생성 | AdMakerAI",
    description: "AI 생성기로 몇 초 만에 3개의 바이럴 비디오 훅을 생성하세요. TikTok, Instagram Reels, YouTube Shorts에 완벽합니다. UGC 광고 및 전자상거래 마케팅에 최적화되어 있습니다.",
    keywords: [
        "훅 생성기",
        "hook generator",
        "비디오 훅 생성기",
        "UGC 비디오 제작",
        "AI 광고 훅",
        "부동산 마케팅 비디오",
        "틱톡 광고",
        "감정 생성기",
        "UGC 비디오 도구",
        "전자상거래용 AI 배우"
    ],
    alternates: {
        canonical: 'https://admakerai.app/ko/hook-generator',
        languages: {
            'x-default': 'https://admakerai.app/hook-generator',
            'en': 'https://admakerai.app/hook-generator',
            'fr': 'https://admakerai.app/fr/generateur-accroches',
            'es': 'https://admakerai.app/es/generador-ganchos',
            'pt': 'https://admakerai.app/pt/gerador-ganchos',
            'de': 'https://admakerai.app/de/hook-generator',
            'ko': 'https://admakerai.app/ko/hook-generator',
        }
    },
    openGraph: {
        title: "무료 AI 훅 생성기 | AdMakerAI",
        description: "몇 초 만에 3개의 바이럴 비디오 훅을 생성하세요. TikTok, Instagram Reels, YouTube Shorts에 완벽합니다.",
        url: 'https://admakerai.app/ko/hook-generator',
        siteName: 'AdMakerAI',
        locale: 'ko_KR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "무료 AI 훅 생성기 | AdMakerAI",
        description: "AI로 몇 초 만에 3개의 바이럴 비디오 훅을 생성하세요.",
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
