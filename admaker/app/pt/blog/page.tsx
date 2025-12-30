'use client';

import Navbar from '@/components/Navbar';
import styles from '../../blog/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPagePT() {
    return (
        <>
            <Navbar lang="pt" />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Últimas notícias e insights da AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <Link href="/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Marketing Imobiliário</span>
                                <h2 className={styles.cardTitle}>Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubra o melhor serviço de criação de vídeo UGC para marketing imobiliário. Compare as melhores plataformas, preços e recursos. Gere vídeos imobiliários em 45 segundos.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Dezembro 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/pt/blog/melhores-plataformas-ia-criar-videos-ugc-marca" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="Melhores Plataformas de IA para Criar Vídeos UGC de Marca"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Plataformas de IA de Vídeo</span>
                                <h2 className={styles.cardTitle}>Melhores Plataformas de IA para Criar Vídeos UGC de Marca (Guia 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubra as melhores plataformas de IA para criar vídeos UGC de marca autênticos. Compare recursos, preços e capacidades das melhores soluções, incluindo AdMaker AI, Synthesia, HeyGen e muito mais.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Dezembro 2024</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
