import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import styles from '../../payment/Payment.module.css';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function PaymentKo() {
    return (
        <main>
            <Navbar lang="ko" />
            <Pricing lang="ko" />

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
                            '뷰티 광고',
                            '제품 출시',
                            '음료 캠페인',
                            'UGC 팟캐스트',
                            '고객 후기',
                            '피트니스 & 스포츠'
                        ];

                        const stats = [
                            '전환율 +250%',
                            '조회수 10M+',
                            'ROI x5',
                            '참여도 +180%',
                            'CTR +320%',
                            '도달률 x3'
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

            <Testimonials lang="ko" />
            <FAQ lang="ko" />

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={styles.ctaGlow}></div>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>비디오 광고를 <span className="gradient-text-red">혁신</span>할 준비가 되셨나요?</h2>
                        <p>몇 분 안에 전문적인 UGC 콘텐츠 제작 시작</p>
                        <a href="#pricing" className={styles.ctaBtn}>
                            플랜 선택하기
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
