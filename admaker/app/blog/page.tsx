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
                    </div>
                </div>
            </div>
        </>
    );
}
