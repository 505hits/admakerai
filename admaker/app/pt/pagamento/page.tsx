import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from '../../payment/Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PagamentoPt() {
    return (
        <main>
            <Navbar lang="pt" />

            {/* Pricing Section */}
            <Pricing lang="pt" />

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
                            'Anúncio de Beleza',
                            'Lançamento de Produto',
                            'Campanha de Bebida',
                            'Podcast UGC',
                            'Depoimento de Cliente',
                            'Fitness & Esporte'
                        ];

                        const stats = [
                            'Conversão +250%',
                            '10M+ visualizações',
                            'ROI x5',
                            'Engajamento +180%',
                            'CTR +320%',
                            'Alcance x3'
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
            <Testimonials lang="pt" />

            {/* FAQ Section */}
            <FAQ lang="pt" />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Pronto para <span className="gradient-text-red">transformar</span> seus anúncios de vídeo?</h2>
                        <p>Comece a criar conteúdo UGC profissional em minutos</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            Escolha seu plano
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
