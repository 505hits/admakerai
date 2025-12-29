import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "AdMaker AI | Créez des Publicités IA en Minutes",
    description: "La plateforme n°1 pour créer des publicités vidéo IA. Écrivez votre script, choisissez vos acteurs et générez votre vidéo en 2 minutes.",
    alternates: {
        canonical: "https://admakerai.vercel.app/fr",
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

export default function FrenchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
