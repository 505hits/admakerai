'use client';

import { useState } from 'react';
import styles from './IndustryTabs.module.css';
import { getMediaUrl } from '../lib/cloudflare-config';

interface Industry {
    id: string;
    name: string;
    title: string;
    description: string;
    features: string[];
}

interface IndustryTabsProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko';
}

export default function IndustryTabs({ lang = 'en' }: IndustryTabsProps) {
    const [activeTab, setActiveTab] = useState('ecommerce');

    const translations = {
        en: {
            badge: 'AI UGC Platform',
            title: 'Perfect for every industry',
            industries: [
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    title: 'Make your products go viral',
                    description: 'Select from hundreds of realistic actors or generate your own from scratch. Then, add your product in one click and describe how you want your actor to interact with it to get a full ad video in minutes.',
                    features: [
                        'One click product add',
                        'Works with any product, regardless of type',
                        'Consistent product size, shape and text'
                    ]
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: 'Scale your software marketing',
                    description: 'Create professional explainer videos and product demos with AI presenters. Generate authentic testimonials and feature announcements that build trust and accelerate your sales cycle.',
                    features: [
                        'Professional AI presenters for demos',
                        'Authentic testimonial generation',
                        'Multi-language support for global reach'
                    ]
                },
                {
                    id: 'agencies',
                    name: 'Agencies',
                    title: 'Deliver more campaigns faster',
                    description: 'Produce unlimited ad variations for your clients in minutes. Test multiple creative concepts, actors, and messaging without expensive production costs or lengthy timelines.',
                    features: [
                        'Rapid A/B testing capabilities',
                        'Unlimited creative variations',
                        'White-label ready outputs'
                    ]
                },
                {
                    id: 'influencer',
                    name: 'Influencer',
                    title: 'Create content at scale',
                    description: 'Generate consistent, high-quality UGC content for your brand partnerships. Create sponsored content, product reviews, and brand collaborations with AI actors that match your audience.',
                    features: [
                        'Diverse AI actors library',
                        'Authentic UGC-style content',
                        'Fast turnaround for brand deals'
                    ]
                }
            ]
        },
        fr: {
            badge: 'Plateforme UGC IA',
            title: 'Parfait pour chaque industrie',
            industries: [
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    title: 'Rendez vos produits viraux',
                    description: 'Sélectionnez parmi des centaines d\'acteurs réalistes ou générez le vôtre à partir de zéro. Ensuite, ajoutez votre produit en un clic et décrivez comment vous voulez que votre acteur interagisse avec pour obtenir une vidéo publicitaire complète en quelques minutes.',
                    features: [
                        'Ajout de produit en un clic',
                        'Fonctionne avec tout type de produit',
                        'Taille, forme et texte du produit cohérents'
                    ]
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: 'Développez votre marketing logiciel',
                    description: 'Créez des vidéos explicatives professionnelles et des démos de produits avec des présentateurs IA. Générez des témoignages authentiques et des annonces de fonctionnalités qui renforcent la confiance et accélèrent votre cycle de vente.',
                    features: [
                        'Présentateurs IA professionnels pour les démos',
                        'Génération de témoignages authentiques',
                        'Support multilingue pour une portée mondiale'
                    ]
                },
                {
                    id: 'agencies',
                    name: 'Agences',
                    title: 'Livrez plus de campagnes plus rapidement',
                    description: 'Produisez des variations publicitaires illimitées pour vos clients en quelques minutes. Testez plusieurs concepts créatifs, acteurs et messages sans coûts de production élevés ni délais prolongés.',
                    features: [
                        'Capacités de tests A/B rapides',
                        'Variations créatives illimitées',
                        'Sorties prêtes en marque blanche'
                    ]
                },
                {
                    id: 'influencer',
                    name: 'Influenceur',
                    title: 'Créez du contenu à grande échelle',
                    description: 'Générez du contenu UGC cohérent et de haute qualité pour vos partenariats de marque. Créez du contenu sponsorisé, des critiques de produits et des collaborations de marque avec des acteurs IA qui correspondent à votre audience.',
                    features: [
                        'Bibliothèque diversifiée d\'acteurs IA',
                        'Contenu de style UGC authentique',
                        'Livraison rapide pour les deals de marque'
                    ]
                }
            ]
        },
        es: {
            badge: 'Plataforma UGC IA',
            title: 'Perfecto para cada industria',
            industries: [
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    title: 'Impulsa tus ventas con videos UGC auténticos',
                    description: 'Crea videos de productos convincentes que conviertan navegadores en compradores',
                    features: [
                        'Demostraciones de productos',
                        'Testimonios de clientes',
                        'Videos de unboxing',
                        'Comparaciones de productos'
                    ]
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: 'Muestra tu software en acción',
                    description: 'Crea tutoriales atractivos y videos explicativos que simplifiquen características complejas',
                    features: [
                        'Tutoriales de productos',
                        'Videos de incorporación',
                        'Actualizaciones de características',
                        'Historias de éxito de clientes'
                    ]
                },
                {
                    id: 'agencies',
                    name: 'Agencias',
                    title: 'Escala la producción de contenido para clientes',
                    description: 'Produce videos de alta calidad para múltiples clientes sin los costos tradicionales de producción',
                    features: [
                        'Campañas de marca',
                        'Contenido de redes sociales',
                        'Anuncios de video',
                        'Narrativa de marca'
                    ]
                },
                {
                    id: 'influencer',
                    name: 'Influencer',
                    title: 'Amplifica tu alcance con contenido IA',
                    description: 'Crea contenido consistente y de alta calidad que resuene con tu audiencia',
                    features: [
                        'Contenido diario',
                        'Colaboraciones de marca',
                        'Reseñas de productos',
                        'Vlogs de estilo de vida'
                    ]
                }
            ]
        },
        pt: {
            badge: 'Plataforma UGC IA',
            title: 'Perfeito para cada indústria',
            industries: [
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    title: 'Torne seus produtos virais',
                    description: 'Selecione entre centenas de atores realistas ou gere o seu do zero. Em seguida, adicione seu produto com um clique e descreva como deseja que seu ator interaja com ele para obter um vídeo publicitário completo em minutos.',
                    features: [
                        'Adição de produto com um clique',
                        'Funciona com qualquer tipo de produto',
                        'Tamanho, forma e texto do produto consistentes'
                    ]
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: 'Escale seu marketing de software',
                    description: 'Crie vídeos explicativos profissionais e demos de produtos com apresentadores IA. Gere depoimentos autênticos e anúncios de recursos que constroem confiança e aceleram seu ciclo de vendas.',
                    features: [
                        'Apresentadores IA profissionais para demos',
                        'Geração de depoimentos autênticos',
                        'Suporte multilíngue para alcance global'
                    ]
                },
                {
                    id: 'agencies',
                    name: 'Agências',
                    title: 'Entregue mais campanhas mais rápido',
                    description: 'Produza variações ilimitadas de anúncios para seus clientes em minutos. Teste vários conceitos criativos, atores e mensagens sem custos de produção caros ou prazos longos.',
                    features: [
                        'Capacidades de teste A/B rápido',
                        'Variações criativas ilimitadas',
                        'Saídas prontas para marca branca'
                    ]
                },
                {
                    id: 'influencer',
                    name: 'Influenciador',
                    title: 'Crie conteúdo em escala',
                    description: 'Gere conteúdo UGC consistente e de alta qualidade para suas parcerias de marca. Crie conteúdo patrocinado, análises de produtos e colaborações de marca com atores IA que correspondem ao seu público.',
                    features: [
                        'Biblioteca diversificada de atores IA',
                        'Conteúdo autêntico estilo UGC',
                        'Entrega rápida para acordos de marca'
                    ]
                }
            ]
        },
        ko: {
            badge: 'UGC IA 플랫폼',
            title: '모든 산업에 완벽',
            industries: [
                {
                    id: 'ecommerce',
                    name: '전자상거래',
                    title: '제품을 바이럴로 만들기',
                    description: '수백 개의 사실적인 액터 중에서 선택하거나 처음부터 생성하세요. 그런 다음 클릭 한 번으로 제품을 추가하고 액터가 제품과 상호 작용하는 방식을 설명하여 몇 분 안에 완전한 광고 비디오를 얻으세요.',
                    features: [
                        '클릭 한 번으로 제품 추가',
                        '모든 제품 유형과 작동',
                        '일관된 제품 크기, 모양 및 텍스트'
                    ]
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: '소프트웨어 마케팅 확장',
                    description: 'AI 발표자와 함께 전문적인 설명 비디오 및 제품 데모를 만드세요. 신뢰를 구축하고 판매 주기를 가속화하는 진정한 추천 및 기능 발표를 생성하세요.',
                    features: [
                        '데모용 전문 AI 발표자',
                        '진정한 추천 생성',
                        '글로벌 도달을 위한 다국어 지원'
                    ]
                },
                {
                    id: 'agencies',
                    name: '에이전시',
                    title: '더 빠르게 더 많은 캠페인 제공',
                    description: '몇 분 안에 고객을 위한 무제한 광고 변형을 제작하세요. 비싼 제작 비용이나 긴 마감 시간 없이 여러 창의적 개념, 액터 및 메시지를 테스트하세요.',
                    features: [
                        '빠른 A/B 테스트 기능',
                        '무제한 창의적 변형',
                        '화이트 라벨 준비 출력'
                    ]
                },
                {
                    id: 'influencer',
                    name: '인플루언서',
                    title: '규모에 맞게 콘텐츠 제작',
                    description: '브랜드 파트너십을 위한 일관되고 고품질의 UGC 콘텐츠를 생성하세요. 청중과 일치하는 AI 액터로 스폰서 콘텐츠, 제품 리뷰 및 브랜드 협업을 만드세요.',
                    features: [
                        '다양한 AI 액터 라이브러리',
                        '진정한 UGC 스타일 콘텐츠',
                        '브랜드 거래를 위한 빠른 배송'
                    ]
                }
            ]
        }
    };

    const content = translations[lang] || translations['en'];
    const industries = content.industries;
    const activeIndustry = industries.find(ind => ind.id === activeTab) || industries[0];

    return (
        <section className={styles.industryTabs}>
            <div className="container">
                <div className={`${styles.sectionHeader} animate-fade-in-up`}>
                    <div className={styles.badge}>{content.badge}</div>
                    <h2>{content.title}</h2>
                </div>

                <div className={styles.tabsContainer}>
                    <div className={`${styles.tabsWrapper} animate-fade-in-up stagger-1`}>
                        {industries.map((industry) => (
                            <button
                                key={industry.id}
                                className={`${styles.tab} ${activeTab === industry.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(industry.id)}
                            >
                                {industry.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardInner}>
                        <h3>{activeIndustry.title}</h3>
                        <p className={styles.description}>{activeIndustry.description}</p>

                        <ul className={styles.featuresList}>
                            {activeIndustry.features.map((feature, index) => (
                                <li key={index}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#ff0844" opacity="0.2" />
                                        <path d="M6 10L9 13L14 7" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.mockupContainer}>
                            {activeTab === 'ecommerce' && (
                                <video
                                    className={styles.mockupPlaceholder}
                                    src={getMediaUrl('ecommerce (2).mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                            {activeTab === 'saas' && (
                                <video
                                    className={styles.mockupPlaceholder}
                                    src={getMediaUrl('saas.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                            {activeTab === 'agencies' && (
                                <video
                                    className={styles.mockupPlaceholder}
                                    src={getMediaUrl('agency (2).mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                            {activeTab === 'influencer' && (
                                <video
                                    className={styles.mockupPlaceholder}
                                    src={getMediaUrl('influenceur.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
