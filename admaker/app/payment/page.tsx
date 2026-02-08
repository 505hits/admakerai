import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from './Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PaymentPage() {
    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.paymentHero}>
                {/* <div className={styles.heroGlow}></div> */}
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>
                            Start Creating Your{' '}
                            <span className="gradient-text-red">UGC Ads</span> Today
                        </h1>
                        <p>Join 20,000+ marketers creating high-converting video ads</p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <Pricing hideTitle={true} />

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
                            'Beauty Ad',
                            'Product Launch',
                            'Beverage Campaign',
                            'UGC Podcast',
                            'Customer Testimonial',
                            'Fitness & Sport'
                        ];

                        const stats = [
                            'Conversion +250%',
                            '10M+ vues',
                            'ROI x5',
                            'Engagement +180%',
                            'CTR +320%',
                            'Reach x3'
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
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to <span className="gradient-text-red">transform</span> your video ads?</h2>
                        <p>Start creating professional UGC content in minutes</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            Choose your plan
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
