import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | AI UGC 광고를 몇 분 안에 제작",
    description: "AI 비디오 광고를 만드는 #1 플랫폼. 스크립트를 작성하고, 액터를 선택하고, 2분 안에 비디오를 생성하세요.",
    alternates: {
        canonical: "https://admakerai.app/ko",
        languages: {
            'en': "https://admakerai.app/",
            'fr': "https://admakerai.app/fr",
            'es': "https://admakerai.app/es",
            'pt': "https://admakerai.app/pt",
            'ko': "https://admakerai.app/ko",
            'de': "https://admakerai.app/de",
            'ja': "https://admakerai.app/ja",
            'x-default': "https://admakerai.app/",
        }
    }
};

export default function KoreanLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LangUpdater lang="ko" />
            {children}
        </>
    );
}
