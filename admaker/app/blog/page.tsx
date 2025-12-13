'use client';

import Navbar from '@/components/Navbar';
import styles from './Blog.module.css';

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Latest news and insights from AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <article className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <div className={styles.imagePlaceholder}>📝</div>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Product Updates</span>
                                <h2 className={styles.cardTitle}>Welcome to AdMaker AI Blog</h2>
                                <p className={styles.cardExcerpt}>
                                    Stay tuned for the latest updates, tips, and insights on creating amazing AI-powered video ads.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Coming Soon</span>
                                </div>
                            </div>
                        </article>

                        <article className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <div className={styles.imagePlaceholder}>🎬</div>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Tips & Tricks</span>
                                <h2 className={styles.cardTitle}>How to Create Engaging UGC Videos</h2>
                                <p className={styles.cardExcerpt}>
                                    Learn the best practices for creating user-generated content that converts.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Coming Soon</span>
                                </div>
                            </div>
                        </article>

                        <article className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <div className={styles.imagePlaceholder}>🚀</div>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Industry News</span>
                                <h2 className={styles.cardTitle}>The Future of AI in Video Marketing</h2>
                                <p className={styles.cardExcerpt}>
                                    Discover how AI is transforming the video marketing landscape.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Coming Soon</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
