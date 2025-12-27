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
    lang?: 'en' | 'fr' | 'es';
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
        }
    };

    const content = translations[lang];
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
