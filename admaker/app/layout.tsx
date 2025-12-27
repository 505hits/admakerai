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
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href="https://admakerai.co/" />
        <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr" />
        <link rel="alternate" hrefLang="x-default" href="https://admakerai.co/" />
      </head>
      <body className={inter.className}>
        {/* Temporarily removed AuthProvider for testing */}
        {children}
      </body>
    </html>
  );
}
