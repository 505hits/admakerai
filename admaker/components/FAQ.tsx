'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What makes AdMaker AI the best AI UGC video platform?",
        answer: "AdMaker AI combines cutting-edge AI actor technology with user-friendly design, making it the top AI tool for generating UGC video content. Unlike basic deepfake video makers, we offer 300+ realistic avatars, product-in-hand integration, and 2-minute generation times. Our platform is specifically designed for digital marketers and e-commerce brands who need to scale video advertising quickly without sacrificing quality."
    },
    {
        question: "How does the AI video creator from script work?",
        answer: "Our AI video creator from script uses advanced natural language processing and computer vision. Simply paste your ad script (or use our AI hook generator), select an AI actor, and our system generates a fully lip-synced, realistic UGC video in under 2 minutes. The AI automatically optimizes pacing, expressions, and delivery for maximum engagement - perfect for creating Facebook video ads, TikTok content, and product advertising."
    },
    {
        question: "What is the product-in-hand feature?",
        answer: "This revolutionary feature allows your AI avatar to physically hold, showcase, or wear your product in the video. Simply upload a product image, and our advanced AI seamlessly integrates it into the scene. It's perfect for e-commerce product ads, unboxing videos, and demonstrations. This makes AdMaker AI the best AI avatar solution for UGC product ads and a game-changer for online stores."
    },
    {
        question: "How realistic are the AI actors and avatars?",
        answer: "Our AI actors use state-of-the-art deepfake technology refined for commercial use. They feature natural facial expressions, realistic eye movements, perfect lip-sync in multiple languages, and authentic body language. Most viewers cannot distinguish our AI avatars from real UGC creators. We're consistently rated as having the best realistic AI avatars for influencer content and commercial advertising."
    },
    {
        question: "Can I create UGC videos for TikTok and Instagram Reels?",
        answer: "Absolutely! AdMaker AI is one of the best mobile apps for creating UGC videos for TikTok. We offer automatic optimization for 9:16 vertical format, trending audio integration, and platform-specific best practices. Export your AI UGC videos in TikTok, Instagram Reels, YouTube Shorts, or Facebook formats with one click. Perfect for scaling your social media presence."
    },
    {
        question: "How does AdMaker AI compare to other AI video platforms in pricing?",
        answer: "When you compare the best AI avatar creators on price and features, AdMaker AI offers the best value. Starting at $49/month for 10 videos (vs competitors at $49-99/month for fewer videos), we include 300+ actors, product-in-hand tech, and commercial rights. We're the most affordable AI avatar service for startups without compromising quality."
    },
    {
        question: "Is there a free AI video generator option?",
        answer: "While we don't offer a permanent free tier (to maintain quality), AdMaker AI provides the best value in the market. Starting at just $49/month, you get access to 300+ AI actors, product-in-hand technology, and unlimited commercial usage. This makes us one of the most affordable AI video platforms for creating professional UGC content."
    },
    {
        question: "Can I create AI testimonial videos for my SaaS?",
        answer: "Definitely! AdMaker AI is the best software for creating UGC testimonial videos for SaaS companies. Choose a professional-looking AI actor, write your customer testimonial script, and generate authentic-looking reviews. Great for landing pages, social proof, and building trust. Many SaaS companies use our platform to create dozens of testimonial variations for A/B testing."
    },
    {
        question: "What languages do the AI avatars support?",
        answer: "Our AI avatar generator supports 40+ languages with perfect lip-sync, including English, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, and more. The AI automatically adjusts facial movements to match the phonetics of each language, making AdMaker AI ideal for international campaigns and multilingual product advertising."
    },
    {
        question: "How fast is video generation compared to other platforms?",
        answer: "AdMaker AI generates AI UGC videos in under 2 minutes on average - up to 10x faster than competitors. This speed makes us the best UGC video software for ad campaign testing. You can create and test 20+ ad variations in the time it takes other platforms to produce one video. Perfect for rapid iteration and performance marketing."
    },
    {
        question: "Can I use the videos for commercial purposes and paid ads?",
        answer: "Yes! All videos created with AdMaker AI come with full commercial rights. Use them for Facebook Ads, Google Ads, TikTok Ads, Instagram promotions, YouTube pre-rolls, website landing pages, and any other online video advertising you need. There are no usage limits or additional licensing fees. This makes us the best AI-driven UGC video platform for agencies and brands running paid campaigns."
    },
    {
        question: "What industries benefit most from AI UGC videos?",
        answer: "Almost every industry can leverage AI UGC video content! Top use cases include: E-commerce & DTC brands (product demos, reviews), SaaS companies (explainer videos, testimonials), Real estate (property tours, agent intros), Beauty & cosmetics (tutorials, before/after), Fitness & wellness, Financial services, Education & online courses, and B2B services. Our AI commercial technology adapts to any niche."
    },
    {
        question: "Do you offer API access for bulk video creation?",
        answer: "Yes! Our Pro and Enterprise plans include API access, making AdMaker AI a reliable AI avatar platform for large organizations. Integrate our AI video creator directly into your marketing automation, CMS, or e-commerce platform. Perfect for agencies managing multiple clients or brands needing to generate hundreds of product advertising videos at scale."
    },
    {
        question: "How do I get the best results from my AI videos?",
        answer: "For optimal AI UGC video results: (1) Keep scripts under 60 seconds for attention retention, (2) Choose avatars that match your target audience demographics, (3) Start with a strong hook in the first 3 seconds, (4) Use the product-in-hand feature for tangible products, (5) Test multiple AI actors and script variations, (6) Add captions for sound-off viewing. Our platform includes built-in optimization suggestions to help you create the best UGC video content."
    },
    {
        question: "What makes your deepfake technology safe and ethical?",
        answer: "AdMaker AI uses ethical AI technology with strict safeguards. All our AI actors are synthetic (not real people), preventing identity theft or misrepresentation. We include visible AI disclosures, prohibit deepfakes of real individuals, have content moderation systems, and comply with advertising standards worldwide. Our deepfake AI video maker is designed exclusively for commercial advertising and branded content."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className={styles.faq}>
            <div className="container">
                <div className={`${styles.sectionHeader} animate-fade-in-up`}>
                    <h2>Frequently Asked Questions About <span className="gradient-text-red">AI UGC Video Creation</span></h2>
                    <p>Everything you need to know about creating AI-powered UGC videos, choosing the best AI avatar generator, and maximizing your video advertising ROI.</p>
                </div>

                <div className={styles.faqGrid}>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''} animate-fade-in-up stagger-${Math.min((index % 8) + 1, 8)}`}
                        >
                            <button
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{item.question}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className={styles.faqAnswer}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
