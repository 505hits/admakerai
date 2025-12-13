import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from './Payment.module.css';

export default function PaymentPage() {
    return (
        <main>
            <Navbar />

            {/* Pricing Section */}
            <Pricing />

            {/* Examples Slider Section */}
            <section className="examples-slider">
                <div className="slider-track">
                    {[...Array(18)].map((_, i) => {
                        const videoUrls = [
                            '/video  beauté.mp4',
                            '/video  bleu.mp4',
                            '/video canette.mp4',
                            '/video podcast.mp4',
                            '/video podcast 2.mp4',
                            '/video sportif.mp4'
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
