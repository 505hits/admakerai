'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { secureFetch } from '@/lib/api/client';
import styles from './Pricing.module.css';

interface PricingProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja';
}

export default function Pricing({ lang = 'en' }: PricingProps) {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [loading, setLoading] = useState<string | null>(null);

    const content = {
        en: {
            title: 'Choose Your Perfect Plan',
            subtitle: 'Start creating professional AI UGC videos in minutes',
            monthly: 'Monthly',
            annual: 'Annual',
            save: 'Save 20%',
            popular: 'Most Popular',
            perMonth: '/month',
            billedAnnually: 'billed annually',
            getStarted: 'Get Started',
            loading: 'Loading...',
            videoCredits: 'video credits',
            actorCredits: 'actor credits',
            upTo: 'Up to',
            videosPerMonth: 'videos per month',
            languages: '35+ languages',
            productHolding: 'Product holding',
            outfitSwapping: 'Outfit swapping',
            replicatorCredits: 'replicator credits',
            replications: 'replications'
        },
        fr: {
            title: 'Choisissez Votre Plan Parfait',
            subtitle: 'Commencez à créer des vidéos UGC IA professionnelles en quelques minutes',
            monthly: 'Mensuel',
            annual: 'Annuel',
            save: 'Économisez 20%',
            popular: 'Le Plus Populaire',
            perMonth: '/mois',
            billedAnnually: 'facturé annuellement',
            getStarted: 'Commencer',
            loading: 'Chargement...',
            videoCredits: 'crédits vidéo',
            actorCredits: 'crédits acteur',
            upTo: 'Jusqu\'à',
            videosPerMonth: 'vidéos par mois',
            languages: '35+ langues',
            productHolding: 'Tenue de produit',
            outfitSwapping: 'Changement de tenue',
            replicatorCredits: 'crédits réplicateur',
            replications: 'réplications'
        },
        es: {
            "title": "Elige Tu Plan",
            "subtitle": "Comienza a crear videos UGC IA profesionales en minutos",
            "monthly": "Mensual",
            "annual": "Anual",
            "save": "Ahorra",
            "popular": "Más Popular",
            "perMonth": "/mes",
            "billedAnnually": "facturado anualmente",
            "getStarted": "Comenzar",
            "loading": "Cargando...",
            "videoCredits": "créditos de video",
            "actorCredits": "créditos de actor",
            "upTo": "Hasta",
            "videosPerMonth": "videos por mes",
            "languages": "35+ idiomas",
            "productHolding": "Sostener producto",
            "outfitSwapping": "Cambio de vestuario",
            "replicatorCredits": "créditos de replicador",
            "replications": "replicaciones"
        },
        pt: {
            title: 'Escolha Seu Plano Perfeito',
            subtitle: 'Comece a criar vídeos UGC de IA profissionais em minutos',
            monthly: 'Mensal',
            annual: 'Anual',
            save: 'Economize 20%',
            popular: 'Mais Popular',
            perMonth: '/mês',
            billedAnnually: 'cobrado anualmente',
            getStarted: 'Começar',
            loading: 'Carregando...',
            videoCredits: 'créditos de vídeo',
            actorCredits: 'créditos de ator',
            upTo: 'Até',
            videosPerMonth: 'vídeos por mês',
            languages: '35+ idiomas',
            productHolding: 'Segurar produto',
            outfitSwapping: 'Troca de roupa',
            replicatorCredits: 'créditos de replicador',
            replications: 'replicações'
        },
        ko: {
            title: '완벽한 플랜 선택',
            subtitle: '모든 플랜에는 무료 평가판이 포함되어 있습니다. 언제든지 취소하세요.',
            monthly: '월간',
            annual: '연간',
            save: '20% 절약',
            popular: '가장 인기있는',
            perMonth: '/월',
            billedAnnually: '연간 청구',
            getStarted: '시작하기',
            loading: '로딩 중...',
            videoCredits: '비디오 크레딧',
            actorCredits: '액터 크레딧',
            upTo: '최대',
            videosPerMonth: '월별 비디오',
            languages: '35+ 언어',
            productHolding: '제품 들기',
            outfitSwapping: '의상 교체',
            replicatorCredits: '복제기 크레딧',
            replications: '복제'
        },
        de: {
            title: 'Wählen Sie Ihren Perfekten Plan',
            subtitle: 'Beginnen Sie in Minuten mit der Erstellung professioneller KI-UGC-Videos',
            monthly: 'Monatlich',
            annual: 'Jährlich',
            save: '20% Sparen',
            popular: 'Am Beliebtesten',
            perMonth: '/Monat',
            billedAnnually: 'jährlich abgerechnet',
            getStarted: 'Loslegen',
            loading: 'Lädt...',
            videoCredits: 'Video-Credits',
            actorCredits: 'Schauspieler-Credits',
            upTo: 'Bis zu',
            videosPerMonth: 'Videos pro Monat',
            languages: '35+ Sprachen',
            productHolding: 'Produkt halten',
            outfitSwapping: 'Outfit-Wechsel',
            replicatorCredits: 'Replikator-Credits',
            replications: 'Replikationen'
        },
        ja: {
            title: '完璧なプランを選択',
            subtitle: '数分でプロフェッショナルなAI UGC動画の作成を開始',
            monthly: '月額',
            annual: '年額',
            save: '20%節約',
            popular: '最も人気',
            perMonth: '/月',
            billedAnnually: '年間請求',
            getStarted: '始める',
            loading: '読み込み中...',
            videoCredits: '動画クレジット',
            actorCredits: 'アクタークレジット',
            upTo: '最大',
            videosPerMonth: '月間動画',
            languages: '35以上の言語',
            productHolding: '製品保持',
            outfitSwapping: '衣装交換',
            replicatorCredits: 'レプリケータークレジット',
            replications: 'レプリケーション'
        }
    };

    const t = content[lang] || content['en'];

    const loginUrl = lang === 'fr' ? '/fr/connexion' : lang === 'es' ? '/es/iniciar-sesion' : lang === 'pt' ? '/pt/conexao' : lang === 'ko' ? '/ko/login' : lang === 'de' ? '/de/anmelden' : '/login';

    const handleCheckout = async (plan: typeof plans[0], cycle: 'monthly' | 'annual') => {
        setLoading(plan.name);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                const loginUrl = lang === 'fr' ? '/fr/connexion' : lang === 'es' ? '/es/iniciar-sesion' : lang === 'pt' ? '/pt/conexao' : '/login';
                router.push(loginUrl);
                return;
            }

            const planType = plan.name.toLowerCase() as 'startup' | 'growth' | 'pro';

            const response = await secureFetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planType,
                    billingPeriod: cycle,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        } finally {
            setLoading(null);
        }
    };

    const plans = [
        {
            name: 'Startup',
            monthlyPrice: 49,
            annualPrice: 470,
            videoCredits: 440,
            videos: 22,
            actorCredits: 440,
            features: [
                `440 ${t.videoCredits}`,
                `440 ${t.actorCredits}`,
                `${t.upTo} 22 ${t.videosPerMonth}`,
                t.languages,
                t.productHolding,
                t.outfitSwapping,
            ],
        },
        {
            name: 'Growth',
            monthlyPrice: 69,
            annualPrice: 662,
            videoCredits: 1200,
            videos: 60,
            actorCredits: 1200,
            monthlyReplicatorCredits: 100,
            features: [
                `1200 ${t.videoCredits}`,
                `1200 ${t.actorCredits}`,
                `${t.upTo} 60 ${t.videosPerMonth}`,
                t.languages,
                t.productHolding,
                t.outfitSwapping,
            ],
            popular: true,
        },
        {
            name: 'Pro',
            monthlyPrice: 99,
            annualPrice: 950,
            videoCredits: 2200,
            videos: 110,
            actorCredits: 2200,
            monthlyReplicatorCredits: 200,
            features: [
                `2200 ${t.videoCredits}`,
                `2200 ${t.actorCredits}`,
                `${t.upTo} 110 ${t.videosPerMonth}`,
                t.languages,
                t.productHolding,
                t.outfitSwapping,
            ],
        },
    ];

    return (
        <section className={styles.pricingSection} id="pricing">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t.title}</h2>
                    <p className={styles.subtitle}>
                        {t.subtitle}
                    </p>

                    <div className={styles.pricingToggle}>
                        <button
                            className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            {t.monthly}
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${billingCycle === 'annual' ? styles.active : ''}`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            {t.annual}
                            <span className={styles.discountBadge}>{t.save}</span>
                        </button>
                    </div>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${styles.pricingCard} ${plan.popular ? styles.featured : ''}`}
                        >
                            {plan.popular && <div className={styles.popularBadge}>{t.popular}</div>}

                            <div className={styles.pricingHeader}>
                                <h3>{plan.name}</h3>
                                <div className={styles.pricingPrice}>
                                    <span className={styles.price}>
                                        ${billingCycle === 'monthly' ? plan.monthlyPrice : (plan.annualPrice / 12).toFixed(2)}
                                    </span>
                                    <span className={styles.period}>{t.perMonth}</span>
                                </div>
                                {billingCycle === 'annual' && (
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                                        ${plan.annualPrice} {t.billedAnnually}
                                    </p>
                                )}
                            </div>

                            <ul className={styles.pricingFeatures}>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className={styles.feature}>
                                        <svg
                                            className={styles.checkIcon}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 10L8 14L16 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                {plan.monthlyReplicatorCredits && (
                                    <li className={styles.feature}>
                                        <svg
                                            className={styles.checkIcon}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 10L8 14L16 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>
                                            {billingCycle === 'annual'
                                                ? `${plan.monthlyReplicatorCredits * 12} ${t.replicatorCredits} (${(plan.monthlyReplicatorCredits * 12) / 20} ${t.replications})`
                                                : `${plan.monthlyReplicatorCredits} ${t.replicatorCredits} (${plan.monthlyReplicatorCredits / 20} ${t.replications})`
                                            }
                                        </span>
                                    </li>
                                )}
                            </ul>

                            <button
                                className={styles.btnPrimary}
                                onClick={() => handleCheckout(plan, billingCycle)}
                                disabled={loading === plan.name}
                            >
                                {loading === plan.name ? t.loading : t.getStarted}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
