import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AdMaker AI - AIによる最高のUGC動画作成プラットフォーム',
    description: 'AIで数秒でプロフェッショナルなUGC動画を作成。マーケティングと広告のための最高の動画コンテンツ作成プラットフォーム。',
    keywords: 'AI動画作成, UGCコンテンツ, マーケティング動画, 人工知能, 動画広告',
    openGraph: {
        title: 'AdMaker AI - AIによる最高のUGC動画作成プラットフォーム',
        description: 'AIで数秒でプロフェッショナルなUGC動画を作成',
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AdMaker AI - AIによる最高のUGC動画作成プラットフォーム',
        description: 'AIで数秒でプロフェッショナルなUGC動画を作成',
    },
    alternates: {
        canonical: "https://admakerai.app/ja",
        languages: {
            'en': "https://admakerai.app/",
            'fr': "https://admakerai.app/fr",
            'es': "https://admakerai.app/es",
            'pt': "https://admakerai.app/pt",
            'ko': "https://admakerai.app/ko",
            'de': "https://admakerai.app/de",
            'ja': "https://admakerai.app/ja",
            'x-default': "https://admakerai.app/"
        }
    }
};

export default function JapaneseRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
