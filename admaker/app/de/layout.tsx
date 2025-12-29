import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Erstellen Sie KI-Anzeigen in Minuten",
    description: "Die #1 Plattform zur Erstellung von KI-Videoanzeigen. Schreiben Sie Ihr Skript, wählen Sie Ihre Schauspieler und generieren Sie Ihr Video in 2 Minuten.",
    alternates: {
        canonical: "https://admakerai.vercel.app/de",
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

export default function GermanLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LangUpdater lang="de" />
            {children}
        </>
    );
}
