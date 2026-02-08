import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Crea Anuncios IA en Minutos",
    description: "La plataforma #1 para crear anuncios de video con IA. Escribe tu guión, elige tus actores y genera tu video en 2 minutos.",
    alternates: {
        canonical: "https://admakerai.app/es",
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

export default function SpanishLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LangUpdater lang="es" />
            {children}
        </>
    );
}
