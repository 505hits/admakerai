'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import IndustryTabs from '@/components/IndustryTabs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function HomeKo() {
    return (
        <>
            <Navbar lang="ko" />
            <Hero lang="ko" />

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

            <Pricing lang="ko" />
            <IndustryTabs lang="ko" />
            <Testimonials lang="ko" />
            <FAQ lang="ko" />
        </>
    );
}
