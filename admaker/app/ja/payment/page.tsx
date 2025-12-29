import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from '../../payment/Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PaymentPageJa() {
    return (
        <main>
            <Navbar lang="ja" />

            {/* Pricing Section */}
            <Pricing lang="ja" />

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
                            '美容広告',
                            '製品ローンチ',
                            '飲料キャンペーン',
                            'UGCポッドキャスト',
                            '顧客の声',
                            'フィットネス＆スポーツ'
                        ];

                        const stats = [
                            'コンバージョン+250%',
                            '1000万回以上の視聴',
                            'ROI x5',
                            'エンゲージメント+180%',
                            'CTR +320%',
                            'リーチ x3'
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
            <Testimonials lang="ja" />

            {/* FAQ Section */}
            <FAQ lang="ja" />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>動画広告を<span className="gradient-text-red">変革</span>する準備はできましたか？</h2>
                        <p>数分でプロフェッショナルなUGCコンテンツの作成を開始</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            プランを選択
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
