import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AdMaker AI | Erstellen Sie KI-Anzeigen in Minuten",
    description: "Die #1 Plattform zur Erstellung von KI-Videoanzeigen. Schreiben Sie Ihr Skript, wählen Sie Ihre Schauspieler und generieren Sie Ihr Video in 2 Minuten.",
};

export default function GermanLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
            <head>
                {/* Canonical URL */}
                <link rel="canonical" href="https://admakerai.vercel.app/de" />

                {/* Hreflang tags for multilingual SEO */}
                <link rel="alternate" hrefLang="en" href="https://admakerai.vercel.app/" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.vercel.app/fr" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.vercel.app/es" />
                <link rel="alternate" hrefLang="pt" href="https://admakerai.vercel.app/pt" />
                <link rel="alternate" hrefLang="ko" href="https://admakerai.vercel.app/ko" />
                <link rel="alternate" hrefLang="de" href="https://admakerai.vercel.app/de" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.vercel.app/" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
