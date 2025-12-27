import styles from './Hero.module.css';

interface HeroProps {
    lang?: 'en' | 'fr';
}

export default function Hero({ lang = 'en' }: HeroProps) {
    const content = {
        en: {
            socialProof: 'Trusted by 20,000+ ecom players & teams',
            title: 'Create UGC videos with AI for',
            titleHighlight: 'explosive growth',
            subtitle: 'The fastest way to create AI video ads',
            description: 'Write your script → Choose an avatar → Generate your video',
            ctaPrimary: 'Create your first ad',
            ctaSecondary: 'Watch demo',
            stat1: '100k+ videos generated',
            stat2: '2.8x ROAS',
            stat3: '95% Customer Satisfaction'
        },
        fr: {
            socialProof: 'Approuvé par plus de 20 000 e-commerçants et équipes',
            title: 'Créez des vidéos UGC avec l\'IA pour une',
            titleHighlight: 'croissance explosive',
            subtitle: 'Le moyen le plus rapide de créer des publicités vidéo IA',
            description: 'Écrivez votre script → Choisissez un avatar → Générez votre vidéo',
            ctaPrimary: 'Créez votre première pub',
            ctaSecondary: 'Voir la démo',
            stat1: '100k+ vidéos générées',
            stat2: '2.8x ROAS',
            stat3: '95% de satisfaction client'
        }
    };

    const t = content[lang];

    return (
        <section className={styles.hero}>
            <div className={styles.heroGlow}></div>
            <div className="container">
                <div className={styles.heroContent}>
                    {/* Social Proof */}
                    <div className={styles.socialProof}>
                        <div className={styles.avatarGroup}>
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.socialProofContent}>
                            <div className={styles.stars}>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                            </div>
                            <p className={styles.socialProofText}>{t.socialProof}</p>
                        </div>
                    </div>

                    <h1 className={styles.heroTitle}>
                        {t.title}
                        <span className="gradient-text-red">{t.titleHighlight}</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {t.subtitle}
                    </p>
                    <p className={styles.heroDescription}>
                        {t.description}
                    </p>
                    <div className={styles.heroCta}>
                        <a href="/login" className={styles.btnPrimaryLarge}>
                            {t.ctaPrimary}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#demo" className={styles.btnGhostLarge}>
                            {t.ctaSecondary}
                        </a>
                    </div>

                    {/* Stats Social Proof */}
                    <div className={styles.statsProof}>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>{t.stat1}</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>{t.stat2}</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span className={styles.statText}>{t.stat3}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
