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
  alternates: {
    canonical: "https://admakerai.vercel.app/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
