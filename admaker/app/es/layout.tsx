import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Crea Anuncios IA en Minutos",
    description: "La plataforma #1 para crear anuncios de video con IA. Escribe tu guión, elige tus actores y genera tu video en 2 minutos.",
    alternates: {
        canonical: "https://admakerai.vercel.app/es",
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
