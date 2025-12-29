'use client';

import Navbar from '@/components/Navbar';
import styles from '../../blog/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPageFR() {
    return (
        <>
            <Navbar lang="fr" />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Dernières actualités et insights d'AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <Link href="/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Marketing Immobilier</span>
                                <h2 className={styles.cardTitle}>Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier</h2>
                                <p className={styles.cardExcerpt}>
                                    Découvrez le meilleur service de création de vidéo UGC pour le marketing immobilier. Comparez les meilleures plateformes, tarifs et fonctionnalités. Générez des vidéos immobilières en 45 secondes.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Décembre 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/fr/blog/meilleures-plateformes-ia-creation-videos-ugc-marque" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="Meilleures Plateformes IA pour Créer des Vidéos UGC de Marque"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Plateformes IA Vidéo</span>
                                <h2 className={styles.cardTitle}>Meilleures Plateformes IA pour Créer des Vidéos UGC de Marque (Guide 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Découvrez les meilleures plateformes IA pour créer des vidéos UGC de marque authentiques. Comparez les fonctionnalités, les prix et les capacités des meilleures solutions incluant AdMaker AI, Synthesia, HeyGen et plus.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Décembre 2024</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
