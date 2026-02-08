import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Erstellen Sie KI-Anzeigen in Minuten",
    description: "Die #1 Plattform zur Erstellung von KI-Videoanzeigen. Schreiben Sie Ihr Skript, wählen Sie Ihre Schauspieler und generieren Sie Ihr Video in 2 Minuten.",
    alternates: {
        canonical: "https://admakerai.app/de",
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
