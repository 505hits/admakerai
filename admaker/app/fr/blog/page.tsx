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

                    <div className={styles.blogGrid} >

                        <Link href="/fr/blog/meilleurs-outils-ia-ugc-publicites-video-authentiques" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="/blog-images/img-1770857313594-0.png"
                                    alt="Meilleurs outils IA UGC créant des publicités vidéo en 60 secondes"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>AdMaker AI</span>
                                <h2 className={styles.cardTitle}>Meilleurs outils IA UGC créant des publicités vidéo en 60 secondes</h2>
                                <p className={styles.cardExcerpt}>ai ugc</p>
                                <div className={styles.cardMeta}>
                                    <span>February 2026</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/fr/blog/arcads-alternatives" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="/blog-images/img-1770842617604-0.png"
                                    alt="Meilleures Alternatives à Arcads pour Publicités Vidéo IA 2026"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>AdMaker AI</span>
                                <h2 className={styles.cardTitle}>Meilleures Alternatives à Arcads pour Publicités Vidéo IA 2026</h2>
                                <p className={styles.cardExcerpt}>arcads alternatives</p>
                                <div className={styles.cardMeta}>
                                    <span>February 2026</span>
                                </div>
                            </div>
                        </Link>


                        <Link href="/fr/blog/meilleur-logiciel-video-ugc-test-campagne-publicitaire" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=500&fit=crop"
                                    alt="Meilleur Logiciel Vidéo UGC pour Tester vos Campagnes Publicitaires en 2026"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Tests Publicitaires</span>
                                <h2 className={styles.cardTitle}>Meilleur Logiciel Vidéo UGC pour Tester vos Campagnes Publicitaires en 2026</h2>
                                <p className={styles.cardExcerpt}>
                                    Après avoir mené 1 200+ tests A/B avec 82 000 $ de budget, je révèle les meilleurs logiciels vidéo UGC pour tester vos campagnes. Données réelles.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Janvier 2026</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="/fr/blog/meilleurs-createurs-video-ugc-pour-publicites-sociales" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop"
                                    alt="Meilleurs Créateurs Vidéo UGC pour Publicités Sociales"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Publicité Sociale</span>
                                <h2 className={styles.cardTitle}>Meilleurs Créateurs Vidéo UGC pour Publicités Sociales (Avis 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Découvrez les meilleurs créateurs de vidéos UGC pour publicités sociales basés sur les avis utilisateurs, les données de performance et le ROI.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Janvier 2025</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/fr/blog/comparer-prix-outils-production-video-ugc" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop"
                                    alt="Comparatif des Tarifs des Outils de Production Vidéo UGC"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Guide Tarifs</span>
                                <h2 className={styles.cardTitle}>Comparatif des Tarifs des Outils de Production Vidéo UGC (Guide 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Comparez les tarifs des outils de production vidéo UGC sur 15+ plateformes. Analyse détaillée des coûts, frais cachés et ROI. Trouvez l'outil adapté à votre budget.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Janvier 2025</span>
                                </div>
                            </div>
                        </Link>

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
