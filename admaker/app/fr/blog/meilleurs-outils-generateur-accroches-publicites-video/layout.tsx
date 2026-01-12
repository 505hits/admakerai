import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meilleurs Outils Générateur d\'Accroches pour Publicités Vidéo 2025 | AdMaker AI',
    description: 'Découvrez les meilleurs outils générateurs d\'accroches pour publicités vidéo. Comparez les plateformes IA, templates et stratégies pour créer des accroches qui augmentent le CTR de 300%.',
    alternates: {
        canonical: 'https://admakerai.app/fr/blog/meilleurs-outils-generateur-accroches-publicites-video',
        languages: {
            'x-default': 'https://admakerai.app/blog/hook-generator',
            'en': 'https://admakerai.app/blog/hook-generator',
            'fr': 'https://admakerai.app/fr/blog/meilleurs-outils-generateur-accroches-publicites-video',
        },
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
