// Configuration centralisée pour les URLs des médias Cloudflare R2
// Tous les médias sont maintenant servis depuis Cloudflare CDN pour de meilleures performances SEO

const CLOUDFLARE_PUBLIC_URL = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev';

// Helper function pour obtenir l'URL Cloudflare d'un média
export function getMediaUrl(localPath: string): string {
    // Nettoyer le chemin (enlever le / initial si présent)
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

    // Retourner l'URL complète Cloudflare
    return `${CLOUDFLARE_PUBLIC_URL}/${cleanPath}`;
}

// Export de l'URL de base pour usage direct
export const CDN_URL = CLOUDFLARE_PUBLIC_URL;
