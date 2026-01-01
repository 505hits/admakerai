import type { Metadata } from "next";
import LangUpdater from "@/components/LangUpdater";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Créez des Publicités IA en Minutes",
    description: "La plateforme n°1 pour créer des publicités vidéo IA. Écrivez votre script, choisissez vos acteurs et générez votre vidéo en 2 minutes.",
    alternates: {
        canonical: "https://admakerai.app/fr",
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

export default function FrenchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LangUpdater lang="fr" />
            {children}
        </>
    );
}
