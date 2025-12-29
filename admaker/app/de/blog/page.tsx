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
                    </div>
                </div>
            </div>
        </>
    );
}
