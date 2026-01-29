import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/blog/Blog.module.css'; // Reusing Blog styles for consistency

interface ArticleData {
    slug: string;
    title: string;
    image: string;
    category: string;
    date: string;
}

interface SimilarArticlesProps {
    locale?: 'en' | 'fr' | 'es' | 'de' | 'pt' | 'ja' | 'ko';
    currentSlug?: string;
    matches?: ArticleData[];
}

const articlesData: Record<string, ArticleData[]> = {
    en: [
        {
            slug: '/blog/compare-pricing-ugc-video-production-tools',
            title: 'Compare Pricing for UGC Video Production Tools (2025 Guide)',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Pricing Guide',
            date: 'January 2025'
        },
        {
            slug: '/blog/best-ugc-video-creation-service-for-real-estate-marketing',
            title: 'Best UGC Video Creation Service for Real Estate Marketing',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: 'Real Estate Marketing',
            date: 'December 2024'
        },
        {
            slug: '/blog/top-ai-platforms-creating-ugc-brand-videos',
            title: 'Top AI Platforms for Creating UGC Brand Videos (2025 Guide)',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'AI Video Platforms',
            date: 'December 2024'
        }
    ],
    fr: [
        {
            slug: '/fr/blog/comparer-prix-outils-production-video-ugc',
            title: 'Comparatif des Tarifs des Outils de Production Vidéo UGC (Guide 2025)',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Guide Tarifs',
            date: 'Janvier 2025'
        },
        {
            slug: '/fr/blog/meilleur-service-creation-video-ugc-marketing-immobilier',
            title: 'Meilleur Service de Création de Vidéo UGC pour le Marketing Immobilier',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: 'Marketing Immobilier',
            date: 'Décembre 2024'
        },
        {
            slug: '/fr/blog/meilleures-plateformes-ia-creation-videos-ugc-marque',
            title: 'Meilleures Plateformes IA pour Créer des Vidéos UGC de Marque (Guide 2025)',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'Plateformes IA Vidéo',
            date: 'Décembre 2024'
        }
    ],
    es: [
        {
            slug: '/es/blog/comparar-precios-herramientas-produccion-video-ugc',
            title: 'Comparativa de Precios de Herramientas de Producción de Video UGC',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Producción de Video',
            date: 'Enero 2025'
        },
        {
            slug: '/es/blog/mejor-servicio-creacion-video-ugc-marketing-inmobiliario',
            title: 'Mejor Servicio de Creación de Video UGC para Marketing Inmobiliario',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: 'Marketing Inmobiliario',
            date: 'Diciembre 2024'
        },
        {
            slug: '/es/blog/mejores-plataformas-ia-crear-videos-ugc-marca',
            title: 'Mejores Plataformas de IA para Crear Videos UGC de Marca',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'Plataformas de Video IA',
            date: 'Diciembre 2024'
        }
    ],
    de: [
        {
            slug: '/de/blog/preise-vergleichen-ugc-video-produktionstools',
            title: 'Preisvergleich für UGC-Videoproduktionstools',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Videoproduktion',
            date: 'Januar 2025'
        },
        {
            slug: '/de/blog/bester-ugc-video-erstellungsservice-immobilienmarketing',
            title: 'Bester UGC-Video-Erstellungsservice für Immobilienmarketing',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: 'Immobilienmarketing',
            date: 'Dezember 2024'
        },
        {
            slug: '/de/blog/beste-ki-plattformen-ugc-markenvideos',
            title: 'Beste KI-Plattformen für UGC-Markenvideos (2025 Leitfaden)',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'KI-Video-Plattformen',
            date: 'Dezember 2024'
        }
    ],
    pt: [
        {
            slug: '/pt/blog/melhor-servico-criacao-video-ugc-marketing-imobiliario',
            title: 'Melhor Serviço de Criação de Vídeo UGC para Marketing Imobiliário',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: 'Marketing Imobiliário',
            date: 'Dezembro 2024'
        },
        {
            slug: '/pt/blog/melhores-plataformas-ia-criar-videos-ugc-marca',
            title: 'Melhores Plataformas de IA para Criar Vídeos UGC de Marca',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'Plataformas de IA de Vídeo',
            date: 'Dezembro 2024'
        }
    ],
    ja: [
        {
            slug: '/ja/blog/best-ugc-video-creation-service-real-estate-marketing',
            title: '不動産マーケティングに最適なUGC動画作成サービス',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: '不動産マーケティング',
            date: '2024年12月'
        },
        {
            slug: '/ja/blog/brand-ugc-video-ai-platforms',
            title: 'ブランドUGC動画作成のためのトップAIプラットフォーム',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'AI動画プラットフォーム',
            date: '2024年12月'
        }
    ],
    ko: [
        {
            slug: '/ko/blog/best-ugc-video-creation-service-real-estate-marketing',
            title: '부동산 마케팅을 위한 최고의 UGC 비디오 제작 서비스',
            image: 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/2.jpg',
            category: '부동산 마케팅',
            date: '2024년 12월'
        },
        {
            slug: '/ko/blog/brand-ugc-video-ai-platforms',
            title: '브랜드 UGC 비디오 제작을 위한 최고의 AI 플랫폼',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
            category: 'AI 비디오 플랫폼',
            date: '2024년 12월'
        }
    ]
};

const sectionTitles = {
    en: 'Similar Articles',
    fr: 'Articles Similaires',
    es: 'Artículos Similares',
    de: 'Ähnliche Artikel',
    pt: 'Artigos Semelhantes',
    ja: '関連記事',
    ko: '관련 기사'
};

export default function SimilarArticles({ locale = 'en', currentSlug = '', matches }: SimilarArticlesProps) {
    const articles = articlesData[locale] || articlesData['en'];

    const similarArticles = matches || articles
        .filter(article => !currentSlug.includes(article.slug) && article.slug !== currentSlug)
        .slice(0, 3);

    if (similarArticles.length === 0) return null;

    return (
        <section className={styles.similarArticlesSection} style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
                {sectionTitles[locale] || sectionTitles['en']}
            </h2>
            <div className={styles.blogGrid}>
                {similarArticles.map((article) => (
                    <Link key={article.slug} href={article.slug} className={styles.blogCard}>
                        <div className={styles.cardImage}>
                            <Image
                                src={article.image}
                                alt={article.title}
                                width={400}
                                height={250}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <span className={styles.category}>{article.category}</span>
                            <h3 className={styles.cardTitle} style={{ fontSize: '1.25rem' }}>{article.title}</h3>
                            <div className={styles.cardMeta}>
                                <span>{article.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
