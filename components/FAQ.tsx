'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How long does it take to generate a video?",
        answer: "Most videos are generated in less than 2 minutes. For longer or more complex videos, it can take up to 5 minutes."
    },
    {
        question: "Can the AI hold my product in the video?",
        answer: "Yes! Our advanced technology allows avatars to hold and interact with your products in an ultra-realistic way. Simply upload an image of your product."
    },
    {
        question: "Are there any limits on using the created ads?",
        answer: "No limits! You own all commercial rights to the videos you create. Use them on all platforms without restrictions."
    },
    {
        question: "Can I cancel my subscription at any time?",
        answer: "Absolutely. You can cancel your subscription at any time from your dashboard. No commitment, no questions asked."
    },
    {
        question: "Do you offer a free trial?",
        answer: "Yes! We offer a 7-day free trial with full access to all features. No credit card required."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund."
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
                <div className={styles.sectionHeader}>
                    <h2>We've got you <span className="gradient-text-red">covered</span></h2>
                    <p>Everything you need to know</p>
                </div>

                <div className={styles.faqGrid}>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
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
