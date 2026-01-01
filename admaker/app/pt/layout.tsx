import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Crie Anúncios IA em Minutos",
    description: "A plataforma #1 para criar anúncios de vídeo com IA. Escreva seu script, escolha seus atores e gere seu vídeo em 2 minutos.",
    alternates: {
        canonical: "https://admakerai.app/pt",
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

export default function PortugueseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LangUpdater lang="pt" />
            {children}
        </>
    );
}
