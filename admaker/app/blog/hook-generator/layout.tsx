import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Hook Generator Tools for Video Ads in 2025 | AdMaker AI',
    description: 'Discover the best hook generator tools for video ads. Compare AI platforms, templates, and proven strategies to create scroll-stopping hooks that boost CTR by 300%.',
    keywords: 'hook generator, video hooks, video ad hooks, scroll-stopping hooks, CTR optimization, hook templates',
    alternates: {
        canonical: 'https://admakerai.app/blog/hook-generator',
        languages: {
            'x-default': 'https://admakerai.app/blog/hook-generator',
            'en': 'https://admakerai.app/blog/hook-generator',
        },
    },
    openGraph: {
        type: 'article',
        title: 'Best Hook Generator Tools for Video Ads in 2025',
        description: 'Discover the best hook generator tools for video ads. Compare AI platforms for scroll-stopping hooks.',
        url: 'https://admakerai.app/blog/hook-generator',
        siteName: 'AdMaker AI',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Hook Generator Tools for Video Ads in 2025',
        description: 'Discover the best hook generator tools for video ads.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
