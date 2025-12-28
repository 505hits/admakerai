import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AdMaker AI | Crie Anúncios IA em Minutos",
    description: "A plataforma #1 para criar anúncios de vídeo com IA. Escreva seu script, escolha seus atores e gere seu vídeo em 2 minutos.",
};

export default function PortugueseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt">
            <head>
                {/* Canonical URL */}
                <link rel="canonical" href="https://admakerai.vercel.app/pt" />

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
