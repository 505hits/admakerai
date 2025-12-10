import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroGlow}></div>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span>✨ Powered by Advanced AI</span>
                    </div>

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
                        <a href="#" className={styles.btnPrimaryLarge}>
                            Create your first ad
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#demo" className={styles.btnGhostLarge}>
                            Watch demo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
