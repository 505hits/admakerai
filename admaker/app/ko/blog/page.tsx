'use client';

import Navbar from '@/components/Navbar';
import styles from '../../blog/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPageKO() {
    return (
        <>
            <Navbar lang="ko" />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>블로그</h1>
                    <p className={styles.subtitle}>AdMaker AI의 최신 뉴스 및 인사이트</p>

                    <div className={styles.blogGrid}>
                        <Link href="/ko/blog/top-rated-ugc-video-makers-social-ads" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop"
                                    alt="소셜 광고를 위한 최고의 UGC 비디오 제작 도구"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>소셜 광고</span>
                                <h2 className={styles.cardTitle}>소셜 광고를 위한 최고의 UGC 비디오 제작 도구 (2025 리뷰)</h2>
                                <p className={styles.cardExcerpt}>
                                    사용자 리뷰, 성과 데이터 및 ROI를 기반으로 한 소셜 광고용 최고의 UGC 비디오 제작 도구를 알아보세요.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>2025년 1월</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/ko/blog/ugc-video-production-tools-pricing-comparison" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop"
                                    alt="UGC 비디오 제작 도구 가격 비교"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>가격 가이드</span>
                                <h2 className={styles.cardTitle}>UGC 비디오 제작 도구 가격 비교 (2025 가이드)</h2>
                                <p className={styles.cardExcerpt}>
                                    15개 이상의 플랫폼에서 UGC 비디오 제작 도구의 가격을 비교하세요. 상세 비용 내역, 숨겨진 수수료 및 ROI 분석.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>2025년 1월</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/ko/blog/best-ugc-video-creation-service-real-estate-marketing" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>부동산 마케팅</span>
                                <h2 className={styles.cardTitle}>부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스</h2>
                                <p className={styles.cardExcerpt}>
                                    부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스를 알아보세요. 최고의 플랫폼, 가격 및 기능을 비교하세요. 45초 만에 부동산 비디오를 생성하세요.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>2024년 12월</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/ko/blog/brand-ugc-video-ai-platforms" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="브랜드 UGC 비디오를 위한 최고의 AI 플랫폼"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>AI 비디오 플랫폼</span>
                                <h2 className={styles.cardTitle}>브랜드 UGC 비디오 제작을 위한 최고의 AI 플랫폼 (2025 가이드)</h2>
                                <p className={styles.cardExcerpt}>
                                    진정한 브랜드 UGC 비디오를 만들기 위한 최고의 AI 플랫폼을 알아보세요. AdMaker AI, Synthesia, HeyGen 등 최고의 솔루션의 기능, 가격 및 기능을 비교하세요.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>2024년 12월</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
