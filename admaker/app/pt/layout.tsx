import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Crie Anúncios IA em Minutos",
    description: "A plataforma #1 para criar anúncios de vídeo com IA. Escreva seu script, escolha seus atores e gere seu vídeo em 2 minutos.",
    alternates: {
        canonical: "https://admakerai.vercel.app/pt",
        languages: {
            'en': "https://admakerai.vercel.app/",
            'fr': "https://admakerai.vercel.app/fr",
            'es': "https://admakerai.vercel.app/es",
            'pt': "https://admakerai.vercel.app/pt",
            'ko': "https://admakerai.vercel.app/ko",
            'de': "https://admakerai.vercel.app/de",
            'x-default': "https://admakerai.vercel.app/",
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
