import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Free AI Hook Generator | Create Viral Video Hooks in Seconds | AdMakerAI",
    description: "Create 3 viral video hooks in seconds with our AI-powered hook generator. Perfect for TikTok, Instagram Reels, and YouTube Shorts. Optimized for UGC ads and e-commerce marketing.",
    keywords: [
        "hook generator",
        "AI hook generator",
        "video hook creator",
        "UGC video creation",
        "AI advertising hooks",
        "real estate marketing videos",
        "TikTok ads",
        "emotion generator",
        "UGC video tools",
        "AI actors for e-commerce"
    ],
    alternates: {
        canonical: 'https://admakerai.app/hook-generator',
        languages: {
            'x-default': 'https://admakerai.app/hook-generator',
            'en': 'https://admakerai.app/hook-generator',
            'fr': 'https://admakerai.app/fr/generateur-accroches',
        }
    },
    openGraph: {
        title: "Free AI Hook Generator | AdMakerAI",
        description: "Create 3 viral video hooks in seconds. Perfect for TikTok, Instagram Reels, and YouTube Shorts.",
        url: 'https://admakerai.app/hook-generator',
        siteName: 'AdMakerAI',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Free AI Hook Generator | AdMakerAI",
        description: "Create 3 viral video hooks in seconds with AI.",
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
