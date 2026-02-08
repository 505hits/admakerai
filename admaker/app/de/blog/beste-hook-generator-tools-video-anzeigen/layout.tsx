import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Beste Hook-Generator-Tools für Video-Anzeigen 2025 | AdMaker AI',
    description: 'Entdecken Sie die besten Hook-Generator-Tools für Video-Anzeigen. Vergleichen Sie KI-Plattformen, Vorlagen und Strategien für Hooks, die die CTR um 300% steigern.',
    alternates: {
        canonical: 'https://admakerai.app/de/blog/beste-hook-generator-tools-video-anzeigen',
        languages: {
            'x-default': 'https://admakerai.app/blog/hook-generator',
            'en': 'https://admakerai.app/blog/hook-generator',
            'de': 'https://admakerai.app/de/blog/beste-hook-generator-tools-video-anzeigen',
        },
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
