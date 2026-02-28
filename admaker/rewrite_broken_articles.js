const fs = require('fs');
const path = require('path');

const fixPage = (articleSlug, correctTitle, correctQuickAnswer) => {
    const filePath = path.join(__dirname, 'app/blog', articleSlug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract HTML - it's inside dangerouslySetInnerHTML={{ __html: `...` }} or "..."
    let htmlContent = '';
    const htmlMatch = content.match(/dangerouslySetInnerHTML={{ __html: (?:`|"|')([\s\S]*?)(?:`|"|') }}/);
    if (htmlMatch) {
        htmlContent = htmlMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }

    // Extract image URL from the hero
    let imageUrl = 'https://placehold.co/1200x630';
    const imgMatch = content.match(/<img src="([^"]+)"/);
    if (imgMatch) {
        imageUrl = imgMatch[1].replace(/\s+/g, '').replace(/\/blog-images\//, '/blog-images/');
    }

    // Extract FAQs
    const faq = [];
    const faqRegex = /<h3[^>]*>([^<]+)<\/h3>[\s\S]*?<p[^>]*>([^<]+)<\/p>/g;
    let match;
    while ((match = faqRegex.exec(content)) !== null) {
        if (!match[1].includes('Quick Answer') && match[1] !== '⚡') {
            faq.push({ question: match[1].replace('❓ ', '').trim(), answer: match[2].trim() });
        }
    }

    const newContent = `
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BlogVideoSidebar from '@/components/BlogVideoSidebar';
import SimilarArticles from '@/components/SimilarArticles';
import styles from '@/app/blog/compare-pricing-ugc-video-production-tools/Article.module.css';
import Image from 'next/image';

function getLandingPageUrl(locale = 'en') {
    if (locale === 'en') return '/';
    return \`/\${locale}\`;
}

export default function BlogPost() {
    const locale = 'en';
    const landingPageUrl = getLandingPageUrl(locale);
    const [showStickyCta, setShowStickyCta] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCta(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jsonLd = {"@context":"https://schema.org","@type":"Article","headline":${JSON.stringify(correctTitle)},"image":${JSON.stringify(imageUrl)},"author":{"@type":"Organization","name":"AdMaker AI"},"mainEntity":{"@type":"FAQPage","mainEntity":${JSON.stringify(faq.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })))}}};

    return (
        <>
            <Head>
                <title>{${JSON.stringify(correctTitle)}} | AdMaker AI</title>
                <meta name="description" content={${JSON.stringify(correctQuickAnswer.substring(0, 150))}} />
                <link rel="canonical" href={\`https://admakerai.app/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="en" href={\`https://admakerai.app/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="fr" href={\`https://admakerai.app/fr/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="es" href={\`https://admakerai.app/es/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="pt" href={\`https://admakerai.app/pt/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="de" href={\`https://admakerai.app/de/blog/${articleSlug}\`} />
                <link rel="alternate" hrefLang="x-default" href={\`https://admakerai.app/blog/${articleSlug}\`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head >
            
            <Navbar lang="en" />
            
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    <main className={styles.mainContent}>
                        <article className={styles.articleContent}>
                            <header className={styles.articleHeader}>
                                <h1 className={styles.mainTitle}>
                                    {${JSON.stringify(correctTitle)}}
                                </h1>
                                <div className={styles.heroImage}>
                                    <Image
                                        src={${JSON.stringify(imageUrl)}}
                                        alt={${JSON.stringify(correctTitle)}}
                                        width={1280}
                                        height={720}
                                        priority
                                        className="w-full h-auto object-cover rounded-xl"
                                    />
                                </div>
                            </header>

                            <section className={styles.section}>
                                <h2>Quick Answer</h2>
                                <p>{${JSON.stringify(correctQuickAnswer)}}</p>
                            </section>

                            <div 
                                className={styles.articleBody}
                                dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlContent)} }}
                            />

                            {/* FAQ Section */}
                            <section id="faq" className={styles.section}>
                                <h2>FAQ</h2>
                                ${faq.map(f => `
                                <div className="mb-6">
                                    <h3 className="font-bold text-xl mb-2">${f.question}</h3>
                                    <p>${f.answer}</p>
                                </div>`).join('')}
                            </section>
                        </article>
                        
                    </main>
                    
                    <aside className={styles.videoSidebar}>
                        <BlogVideoSidebar locale={locale} />
                    </aside>
                </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <SimilarArticles currentSlug="${articleSlug}" locale={locale} />
            </div>

            {/* Sticky Mobile CTA */}
            <a
                href={landingPageUrl}
                className={\`\${styles.stickyCta} \${showStickyCta ? styles.stickyCtaVisible : ''}\`}
                aria-label="Create your AI Ads now"
            >
                Create your AI Ads now <span className={styles.emojiPointer}>👉</span>
            </a>
        </>
    );
}
`;

    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Fixed ${articleSlug}`);
};

fixPage(
    'ai-actors',
    'Best AI Actors for Video Ads That Convert in 2026',
    'AI actors are virtual presenters generated by artificial intelligence to star in your video ads. They offer a scalable, cost-effective alternative to human UGC creators, allowing businesses to produce unlimited video variations. AdMaker AI provides high-converting AI avatars that resonate with audiences, driving up to 30% higher conversion rates.'
);

fixPage(
    'arcads-pricing',
    'Best Arcads Alternatives for Small Businesses in 2026',
    'AdMaker AI is the top alternative to Arcads in 2026. While Arcads charges $110/month for limited video credits, AdMaker AI offers unlimited AI video generation for just $39/month. This makes it the ideal, budget-friendly solution for small businesses and e-commerce stores looking to scale their video ads without breaking the bank.'
);
