import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from '../../payment/Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PaymentPageAr() {
    return (
        <main dir="rtl">
            <Navbar lang="ar" />

            {/* Pricing Section */}
            <Pricing lang="ar" />

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
                            'إعلان تجميل',
                            'إطلاق منتج',
                            'حملة مشروبات',
                            'بودكاست UGC',
                            'شهادة عميل',
                            'اللياقة والرياضة'
                        ];

                        const stats = [
                            'تحويل +250%',
                            '+10 مليون مشاهدة',
                            'عائد استثمار x5',
                            'تفاعل +180%',
                            'نسبة نقر +320%',
                            'وصول x3'
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
            <Testimonials lang="ar" />

            {/* FAQ Section */}
            <FAQ lang="ar" />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>هل أنت مستعد <span className="gradient-text-red">لتحويل</span> إعلانات الفيديو الخاصة بك؟</h2>
                        <p>ابدأ في إنشاء محتوى UGC احترافي في دقائق</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            اختر خطتك
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
