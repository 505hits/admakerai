import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AdMaker AI | AI UGC 광고를 몇 분 안에 제작",
    description: "AI 비디오 광고를 만드는 #1 플랫폼. 스크립트를 작성하고, 액터를 선택하고, 2분 안에 비디오를 생성하세요.",
};

export default function KoreanLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                {/* Canonical URL */}
                <link rel="canonical" href="https://admakerai.vercel.app/ko" />

                {/* Hreflang tags for multilingual SEO */}
                <link rel="alternate" hrefLang="en" href="https://admakerai.vercel.app/" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.vercel.app/fr" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.vercel.app/es" />
                <link rel="alternate" hrefLang="pt" href="https://admakerai.vercel.app/pt" />
                <link rel="alternate" hrefLang="ko" href="https://admakerai.vercel.app/ko" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.vercel.app/" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
