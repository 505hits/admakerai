'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogArticlesSection.module.css';

interface BlogArticle {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    imageAlt: string;
}

const blogArticles: BlogArticle[] = [
    {
        slug: 'emotion-generator',
        title: 'Top 10 Emotion Generator Tools for Video Marketing in 2026',
        excerpt: 'After testing 23 emotion generator tools with $18K spend, I reveal which tools actually boost video engagement. Real performance data included.',
        category: 'Video Marketing',
        date: 'January 2026',
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=500&fit=crop',
        imageAlt: 'Top 10 Emotion Generator Tools for Video Marketing in 2026'
    },
    {
        slug: 'best-ugc-video-software-for-ad-campaign-testing',
        title: 'Best UGC Video Software for Ad Campaign Testing in 2026',
        excerpt: 'After running 1,200+ A/B tests with $82K spend, I reveal the best UGC video software. Real data from 6-month systematic testing program.',
        category: 'Ad Testing',
        date: 'January 2026',
        image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=500&fit=crop',
        imageAlt: 'Best UGC Video Software for Ad Campaign Testing in 2026'
    },
    {
        slug: 'ugc-video-ads-ai',
        title: 'UGC Video Ads AI Complete Creation Guide for 2026',
        excerpt: 'After creating 500+ AI-generated UGC video ads with $45K spend, we reveal what actually works. Complete guide with real performance data and tested workflows.',
        category: 'Ad Strategy',
        date: 'January 2026',
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=500&fit=crop',
        imageAlt: 'UGC Video Ads AI Complete Creation Guide for 2026'
    },
    {
        slug: 'best-rated-platforms-quick-ugc-product-ad-videos',
        title: 'Best Rated Platforms for Quick UGC Product Ad Videos',
        excerpt: 'After testing 15 platforms with $12K budget, we ranked the fastest UGC video tools. Create product ads in under 2 minutes. Real speed tests included.',
        category: 'Platform Comparison',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        imageAlt: 'Best Rated Platforms for Quick UGC Product Ad Videos'
    },
    {
        slug: 'hook-generator',
        title: 'Best Hook Generator Tools for Video Ads in 2025',
        excerpt: 'Discover the best hook generator tools for video ads. Compare AI platforms, templates, and proven strategies to create scroll-stopping hooks that boost CTR by 300%.',
        category: 'Hook Generator',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        imageAlt: 'Best Hook Generator Tools for Video Ads'
    },
    {
        slug: 'startup-video-tools',
        title: 'Best AI-Driven UGC Video Platforms for Startups (2025)',
        excerpt: 'Find the best AI-driven UGC video platforms for startups. Compare pricing, features, and scalability. Optimize your video marketing budget from day one.',
        category: 'Startup Guide',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
        imageAlt: 'Best AI-Driven UGC Video Platforms for Startups'
    },
    {
        slug: 'best-mobile-apps-creating-ugc-videos-tiktok',
        title: 'Best Mobile Apps for Creating UGC Videos for TikTok (2025)',
        excerpt: 'Discover the best mobile apps for creating UGC videos for TikTok. Compare features, editing tools, and performance. Create viral-ready content on your phone.',
        category: 'Mobile Tools',
        date: 'January 2025',
        image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/article1.png',
        imageAlt: 'Best Mobile Apps for Creating UGC Videos for TikTok'
    },
    {
        slug: 'top-rated-ugc-video-makers-for-social-ads',
        title: 'Top-Rated UGC Video Makers for Social Ads (2025 Reviews)',
        excerpt: 'Discover top-rated UGC video makers for social ads based on user reviews, performance data, and ROI. Compare features, ratings, and real campaign results.',
        category: 'Social Ads',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop',
        imageAlt: 'Top-Rated UGC Video Makers for Social Ads'
    },
    {
        slug: 'compare-pricing-ugc-video-production-tools',
        title: 'Compare Pricing for UGC Video Production Tools (2025 Guide)',
        excerpt: 'Compare pricing for UGC video production tools across 15+ platforms. Detailed cost breakdown, hidden fees, and ROI analysis. Find the right tool for your budget.',
        category: 'Pricing Guide',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
        imageAlt: 'Compare Pricing for UGC Video Production Tools'
    },
    {
        slug: 'compare-free-vs-paid-ugc-video-creation-tools',
        title: 'Compare Free vs Paid UGC Video Creation Tools (2025)',
        excerpt: 'Compare free vs paid UGC video creation tools. Detailed analysis of features, limitations, and when each option makes sense. Make the right choice for your needs.',
        category: 'Tool Comparison',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        imageAlt: 'Compare Free vs Paid UGC Video Creation Tools'
    },
    {
        slug: 'best-ugc-video-creation-service-for-real-estate-marketing',
        title: 'Best UGC Video Creation Service for Real Estate Marketing',
        excerpt: 'Discover the best UGC video creation service for real estate marketing. Compare top platforms, pricing, and features. Generate property videos in 45 seconds.',
        category: 'Real Estate Marketing',
        date: 'December 2024',
        image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
        imageAlt: 'Best UGC Video Creation Service for Real Estate Marketing'
    },
    {
        slug: 'top-ai-platforms-creating-ugc-brand-videos',
        title: 'Top AI Platforms for Creating UGC Brand Videos (2025 Guide)',
        excerpt: 'Discover the best AI platforms for creating authentic UGC brand videos. Compare features, pricing, and capabilities of top solutions including AdMaker AI, Synthesia, HeyGen, and more.',
        category: 'AI Video Platforms',
        date: 'December 2024',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
        imageAlt: 'Top AI Platforms for Creating UGC Brand Videos'
    },
    {
        slug: 'best-software-creating-ugc-testimonial-videos',
        title: 'Best Software for Creating UGC Testimonial Videos (2025)',
        excerpt: 'Find the best software for creating UGC testimonial videos. Compare tools, features, and pricing. Create authentic customer testimonials in minutes.',
        category: 'Testimonial Software',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
        imageAlt: 'Best Software for Creating UGC Testimonial Videos'
    }
];

export default function BlogArticlesSection() {
    return (
        <section className={styles.blogSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>
                        Explore Our <span className={styles.gradientText}>Articles</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Learn from real data, tested strategies, and proven workflows for video marketing success
                    </p>
                </div>

                <div className={styles.articlesGrid}>
                    {blogArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className={styles.articleCard}
                        >
                            <div className={styles.cardImage}>
                                <Image
                                    src={article.image}
                                    alt={article.imageAlt}
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>{article.category}</span>
                                <h3 className={styles.cardTitle}>{article.title}</h3>
                                <p className={styles.cardExcerpt}>{article.excerpt}</p>
                                <div className={styles.cardMeta}>
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.viewAllContainer}>
                    <Link href="/blog" className={styles.viewAllButton}>
                        View All Articles →
                    </Link>
                </div>
            </div>
        </section>
    );
}
