import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from '../../payment/Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PaymentPageDe() {
    return (
        <main>
            <Navbar lang="de" />

            {/* Pricing Section */}
            <Pricing lang="de" />

            {/* Examples Slider Section */}
            <section className="examples-slider">
                <div className="slider-track">
                    {[...Array(18)].map((_, i) => {
                        const videoUrls = [
                            getMediaUrl('video  beauté.mp4'),
                            getMediaUrl('video  bleu.mp4'),
                            getMediaUrl('video canette.mp4'),
                            getMediaUrl('video podcast.mp4'),
                            getMediaUrl('video podcast 2.mp4'),
                            getMediaUrl('video sportif.mp4')
                        ];

                        const titles = [
                            'Beauty-Werbung',
                            'Produkteinführung',
                            'Getränke-Kampagne',
                            'Podcast UGC',
                            'Kundenbewertung',
                            'Fitness & Sport'
                        ];

                        const stats = [
                            'Conversion +250%',
                            '10M+ Aufrufe',
                            'ROI x5',
                            'Engagement +180%',
                            'CTR +320%',
                            'Reichweite x3'
                        ];

                        const videoIndex = i % 6;

                        return (
                            <div key={i} className="slide">
                                <div className="example-card has-gif">
                                    <video
                                        src={videoUrls[videoIndex]}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="example-gif"
                                    />
                                    <div className="example-info-overlay">
                                        <h4>{titles[videoIndex]}</h4>
                                        <p>{stats[videoIndex]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials lang="de" />

            {/* FAQ Section */}
            <FAQ lang="de" />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Bereit, Ihre Videowerbung zu <span className="gradient-text-red">transformieren</span>?</h2>
                        <p>Beginnen Sie in Minuten mit der Erstellung professioneller UGC-Inhalte</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            Wählen Sie Ihren Plan
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
