'use client';

import Navbar from '@/components/Navbar';
import styles from '../../blog/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPageES() {
    return (
        <>
            <Navbar lang="es" />
            <div className={styles.blogContainer}>
                <div className="container">
                    <h1 className={styles.pageTitle}>Blog</h1>
                    <p className={styles.subtitle}>Últimas noticias e información de AdMaker AI</p>

                    <div className={styles.blogGrid}>
                        <Link href="/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg"
                                    alt="Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Marketing Inmobiliario</span>
                                <h2 className={styles.cardTitle}>Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubre el mejor servicio de creación de video UGC para marketing inmobiliario. Compara las mejores plataformas, precios y características. Genera videos inmobiliarios en 45 segundos.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Diciembre 2024</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
