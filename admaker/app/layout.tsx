import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdMaker AI | Create AI Ads in Minutes",
  description: "The #1 platform to create AI video ads. Write your script, choose your actors, and generate your video in 2 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://admakerai.vercel.app/" />

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
        {/* Temporarily removed AuthProvider for testing */}
        {children}
      </body>
    </html>
  );
}
