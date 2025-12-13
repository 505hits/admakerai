import styles from './Hero.module.css';

export default function Hero() {
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
                            <p className={styles.socialProofText}>Trusted by 20,000+ ecom players & teams</p>
                        </div>
                    </div>

                    <h1 className={styles.heroTitle}>
                        Create UGC videos with AI for
                        <span className="gradient-text-red"> explosive growth</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        The fastest way to create AI video ads
                    </p>
                    <p className={styles.heroDescription}>
                        Write your script → Choose an avatar → Generate your video
                    </p>
                    <div className={styles.heroCta}>
                        <a href="/login" className={styles.btnPrimaryLarge}>
                            Create your first ad
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#demo" className={styles.btnGhostLarge}>
                            Watch demo
                        </a>
                    </div>

                    {/* Stats Social Proof */}
                    <div className={styles.statsProof}>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>100k+ videos generated</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>2.8x ROAS</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span className={styles.statText}>95% Customer Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
