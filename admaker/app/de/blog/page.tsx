'use client';

import Navbar from '@/components/Navbar';
import styles from '../../blog/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPageDE() {
    return (
        <>
            <Navbar lang="de" />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Neueste Nachrichten und Einblicke von AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <Link href="/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="Bester UGC-Video-Erstellungsservice für Immobilienmarketing"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Immobilienmarketing</span>
                                <h2 className={styles.cardTitle}>Bester UGC-Video-Erstellungsservice für Immobilienmarketing</h2>
                                <p className={styles.cardExcerpt}>
                                    Entdecken Sie den besten UGC-Video-Erstellungsservice für Immobilienmarketing. Vergleichen Sie Top-Plattformen, Preise und Funktionen. Erstellen Sie Immobilienvideos in 45 Sekunden.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Dezember 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/de/blog/beste-ki-plattformen-ugc-markenvideos" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="Beste KI-Plattformen für UGC-Markenvideos"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>KI-Video-Plattformen</span>
                                <h2 className={styles.cardTitle}>Beste KI-Plattformen für UGC-Markenvideos (2025 Leitfaden)</h2>
                                <p className={styles.cardExcerpt}>
                                    Entdecken Sie die besten KI-Plattformen zur Erstellung authentischer UGC-Markenvideos. Vergleichen Sie Funktionen, Preise und Fähigkeiten der Top-Lösungen einschließlich AdMaker AI, Synthesia, HeyGen und mehr.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Dezember 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/de/blog/preise-vergleichen-ugc-video-produktionstools" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop"
                                    alt="Preisvergleich für UGC-Videoproduktionstools"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Videoproduktion</span>
                                <h2 className={styles.cardTitle}>Preisvergleich für UGC-Videoproduktionstools</h2>
                                <p className={styles.cardExcerpt}>
                                    Entdecken Sie den ultimativen Preisvergleich für UGC-Videoproduktionstools. Wir analysieren Kosten, versteckte Gebühren und den ROI von 15 führenden Plattformen.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Januar 2025</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
