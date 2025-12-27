import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AdMaker AI | Créez des Publicités IA en Minutes",
    description: "La plateforme n°1 pour créer des publicités vidéo IA. Écrivez votre script, choisissez vos acteurs et générez votre vidéo en 2 minutes.",
};

export default function FrenchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                {/* Hreflang tags for SEO */}
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.co/" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/login" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/connexion" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/payment" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/paiement" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/dashboard" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/tableau-de-bord" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
