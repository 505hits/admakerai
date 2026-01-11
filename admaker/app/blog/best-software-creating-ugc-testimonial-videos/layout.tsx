import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Software for Creating UGC Testimonial Videos (2025) | AdMaker AI',
    description: 'Discover the best software for creating UGC testimonial videos. Build trust with authentic customer testimonials.',
    keywords: 'UGC testimonial videos, testimonial software, customer video testimonials, social proof videos',
    alternates: {
        canonical: 'https://admakerai.app/blog/best-software-creating-ugc-testimonial-videos',
        languages: {
            'x-default': 'https://admakerai.app/blog/best-software-creating-ugc-testimonial-videos',
            'en': 'https://admakerai.app/blog/best-software-creating-ugc-testimonial-videos',
            'fr': 'https://admakerai.app/fr/blog/meilleur-logiciel-creation-videos-temoignages-ugc',
            'es': 'https://admakerai.app/es/blog/mejor-software-crear-videos-testimonios-ugc',
            'pt': 'https://admakerai.app/pt/blog/melhor-software-criar-videos-depoimentos-ugc',
            'de': 'https://admakerai.app/de/blog/beste-software-ugc-testimonial-videos-erstellen',
            'ko': 'https://admakerai.app/ko/blog/best-software-creating-ugc-testimonial-videos',
            'ja': 'https://admakerai.app/ja/blog/best-software-creating-ugc-testimonial-videos',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Best Software for Creating UGC Testimonial Videos (2025)',
        description: 'Discover the best software for creating UGC testimonial videos.',
        url: 'https://admakerai.app/blog/best-software-creating-ugc-testimonial-videos',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1552581234-26160f608093?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Software for Creating UGC Testimonial Videos (2025)',
        description: 'Discover the best software for creating UGC testimonial videos.',
        images: ['https://images.unsplash.com/photo-1552581234-26160f608093?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
