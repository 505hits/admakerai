import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AdMaker AI - Crea Videos UGC con IA en Minutos',
    description: 'La plataforma #1 para crear anuncios de video profesionales con actores IA. Sin cámara, sin actores, sin edición.',
    keywords: 'videos ugc ia, actores ia, generador avatares ia, videos publicitarios ia, contenido ugc',
};

export default function SpanishLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <head>
                {/* Hreflang tags for SEO */}
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.co/es" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.co/" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/login" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/connexion" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.co/es/iniciar-sesion" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/payment" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/paiement" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.co/es/pago" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.co/dashboard" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.co/fr/tableau-de-bord" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.co/es/panel" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
