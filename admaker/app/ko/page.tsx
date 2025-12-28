'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import IndustryTabs from '@/components/IndustryTabs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function HomeKo() {
    return (
        <>
            <Navbar lang="ko" />
            <Hero lang="ko" />
            <Pricing lang="ko" />
            <IndustryTabs lang="ko" />
            <Testimonials lang="ko" />
            <FAQ lang="ko" />
        </>
    );
}
