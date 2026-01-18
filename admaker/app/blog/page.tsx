'use client';

import Navbar from '@/components/Navbar';
import styles from './Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Latest news and insights from AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <Link href="/blog/emotion-generator" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=500&fit=crop"
                                    alt="Top 10 Emotion Generator Tools for Video Marketing in 2026"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Video Marketing</span>
                                <h2 className={styles.cardTitle}>Top 10 Emotion Generator Tools for Video Marketing in 2026</h2>
                                <p className={styles.cardExcerpt}>
                                    After testing 23 emotion generator tools with $18K spend, I reveal which tools actually boost video engagement. Real performance data included.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2026</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/best-ugc-video-software-for-ad-campaign-testing" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=500&fit=crop"
                                    alt="Best UGC Video Software for Ad Campaign Testing in 2026"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Ad Testing</span>
                                <h2 className={styles.cardTitle}>Best UGC Video Software for Ad Campaign Testing in 2026</h2>
                                <p className={styles.cardExcerpt}>
                                    After running 1,200+ A/B tests with $82K spend, I reveal the best UGC video software. Real data from 6-month systematic testing program.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2026</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/ugc-video-ads-ai" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=500&fit=crop"
                                    alt="UGC Video Ads AI Complete Creation Guide for 2026"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Ad Strategy</span>
                                <h2 className={styles.cardTitle}>UGC Video Ads AI Complete Creation Guide for 2026</h2>
                                <p className={styles.cardExcerpt}>
                                    After creating 500+ AI-generated UGC video ads with $45K spend, we reveal what actually works. Complete guide with real performance data and tested workflows.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2026</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/best-rated-platforms-quick-ugc-product-ad-videos" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                                    alt="Best Rated Platforms for Quick UGC Product Ad Videos"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Platform Comparison</span>
                                <h2 className={styles.cardTitle}>Best Rated Platforms for Quick UGC Product Ad Videos</h2>
                                <p className={styles.cardExcerpt}>
                                    After testing 15 platforms with $12K budget, we ranked the fastest UGC video tools. Create product ads in under 2 minutes. Real speed tests included.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/hook-generator" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                                    alt="Best Hook Generator Tools for Video Ads"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Hook Generator</span>
                                <h2 className={styles.cardTitle}>Best Hook Generator Tools for Video Ads in 2025</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover the best hook generator tools for video ads. Compare AI platforms, templates, and proven strategies to create scroll-stopping hooks that boost CTR by 300%.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/startup-video-tools" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
                                    alt="Best AI-Driven UGC Video Platforms for Startups"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Startup Guide</span>
                                <h2 className={styles.cardTitle}>Best AI-Driven UGC Video Platforms for Startups (2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Find the best AI-driven UGC video platforms for startups. Compare pricing, features, and scalability. Optimize your video marketing budget from day one.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/best-mobile-apps-creating-ugc-videos-tiktok" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/article1.png"
                                    alt="Best Mobile Apps for Creating UGC Videos for TikTok"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Mobile Tools</span>
                                <h2 className={styles.cardTitle}>Best Mobile Apps for Creating UGC Videos for TikTok (2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover the best mobile apps for creating UGC videos for TikTok. Compare features, editing tools, and performance. Create viral-ready content on your phone.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/top-rated-ugc-video-makers-for-social-ads" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop"
                                    alt="Top-Rated UGC Video Makers for Social Ads"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Social Ads</span>
                                <h2 className={styles.cardTitle}>Top-Rated UGC Video Makers for Social Ads (2025 Reviews)</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover top-rated UGC video makers for social ads based on user reviews, performance data, and ROI. Compare features, ratings, and real campaign results.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="/blog/compare-pricing-ugc-video-production-tools" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop"
                                    alt="Compare Pricing for UGC Video Production Tools"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Pricing Guide</span>
                                <h2 className={styles.cardTitle}>Compare Pricing for UGC Video Production Tools (2025 Guide)</h2>
                                <p className={styles.cardExcerpt}>
                                    Compare pricing for UGC video production tools across 15+ platforms. Detailed cost breakdown, hidden fees, and ROI analysis. Find the right tool for your budget.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/compare-free-vs-paid-ugc-video-creation-tools" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                                    alt="Compare Free vs Paid UGC Video Creation Tools"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Tool Comparison</span>
                                <h2 className={styles.cardTitle}>Compare Free vs Paid UGC Video Creation Tools (2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Compare free vs paid UGC video creation tools. Detailed analysis of features, limitations, and when each option makes sense. Make the right choice for your needs.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/best-ugc-video-creation-service-for-real-estate-marketing" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="Best UGC Video Creation Service for Real Estate Marketing"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Real Estate Marketing</span>
                                <h2 className={styles.cardTitle}>Best UGC Video Creation Service for Real Estate Marketing</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover the best UGC video creation service for real estate marketing. Compare top platforms, pricing, and features. Generate property videos in 45 seconds.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>December 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/top-ai-platforms-creating-ugc-brand-videos" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="Top AI Platforms for Creating UGC Brand Videos"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>AI Video Platforms</span>
                                <h2 className={styles.cardTitle}>Top AI Platforms for Creating UGC Brand Videos (2025 Guide)</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover the best AI platforms for creating authentic UGC brand videos. Compare features, pricing, and capabilities of top solutions including AdMaker AI, Synthesia, HeyGen, and more.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>December 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blog/best-software-creating-ugc-testimonial-videos" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop"
                                    alt="Best Software for Creating UGC Testimonial Videos"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Testimonial Software</span>
                                <h2 className={styles.cardTitle}>Best Software for Creating UGC Testimonial Videos (2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Find the best software for creating UGC testimonial videos. Compare tools, features, and pricing. Create authentic customer testimonials in minutes.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>January 2025</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
