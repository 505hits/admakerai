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

                    <div className={styles.blogGrid} >


                        <Link href="/es/blog/mejores-creadores-video-ugc-para-anuncios-sociales" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop"
                                    alt="Mejores Creadores de Video UGC para Anuncios Sociales"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Publicidad Social</span>
                                <h2 className={styles.cardTitle}>Mejores Creadores de Video UGC para Anuncios Sociales (Reseñas 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubre los mejores creadores de videos UGC para anuncios sociales basados en reseñas de usuarios, datos de rendimiento y ROI.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Enero 2025</span>
                                </div>
                            </div>
                        </Link>

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

                        <Link href="/es/blog/mejores-plataformas-ia-crear-videos-ugc-marca" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
                                    alt="Mejores Plataformas de IA para Crear Videos UGC de Marca"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Plataformas de IA de Video</span>
                                <h2 className={styles.cardTitle}>Mejores Plataformas de IA para Crear Videos UGC de Marca (Guía 2025)</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubre las mejores plataformas de IA para crear videos UGC de marca auténticos. Compara características, precios y capacidades de las mejores soluciones, incluyendo AdMaker AI, Synthesia, HeyGen y más.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Diciembre 2024</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/es/blog/comparar-precios-herramientas-produccion-video-ugc" className={styles.blogCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop"
                                    alt="Comparativa de Precios de Herramientas de Producción de Video UGC"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>Producción de Video</span>
                                <h2 className={styles.cardTitle}>Comparativa de Precios de Herramientas de Producción de Video UGC</h2>
                                <p className={styles.cardExcerpt}>
                                    Descubre la comparativa definitiva de precios de herramientas de producción de video UGC. Analizamos costos, tarifas ocultas y el ROI de 15 plataformas líderes.
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>Enero 2025</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
