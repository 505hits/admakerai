import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Temporarily disabled for testing
// import { AuthProvider } from "@/components/AuthProvider";

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
      <body className={inter.className}>
        {/* Temporarily removed AuthProvider for testing */}
        {children}
      </body>
    </html>
  );
}
