import Link from 'next/link';
import styles from './SEOContent.module.css';

export default function SEOContent() {
    return (
        <section className={styles.seoContent}>
            <div className="container">
                {/* Main Title */}
                <div className={styles.mainHeader}>
                    <h2 className={styles.mainTitle}>
                        Hook Generator: Create Scroll-Stopping Video Ads in Seconds
                    </h2>
                    <p className={styles.intro}>
                        You have <strong>3 seconds</strong>. That's all the time you get to capture attention before your audience scrolls past.
                        In the competitive world of UGC video and social media advertising, your hook determines whether your campaign
                        generates millions of views or gets buried in the feed.
                    </p>
                    <p className={styles.intro}>
                        <Link href="/" className={styles.inlineLink}>AdMakerAI</Link>'s AI-powered hook generator transforms your ideas into compelling opening lines that stop the scroll and
                        drive conversions. Recognized as one of the top <Link href="/" className={styles.inlineLink}>AI platforms for creating UGC brand videos</Link>, we analyze millions of
                        high-performing advertisements to deliver tested, optimized hooks that actually work.
                    </p>
                </div>

                {/* Why Hooks Matter */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Why a Powerful Hook Changes Everything for Your Ad Creatives</h3>
                    <p className={styles.text}>
                        The first 3 seconds of your video represent <strong>85% of your retention rate</strong>. An AI advertisement with a
                        weak hook is like opening a store without a storefront – nobody walks in. Brands dominating social media don't leave
                        this to chance. They test dozens of hooks until they find the one that resonates with their target audience.
                    </p>
                    <p className={styles.text}>
                        The problem? Creating effective hooks takes hours of brainstorming, A/B testing, and data analysis. That's where our
                        AI UGC generator comes in. Within seconds, generate calibrated opening lines tailored to your niche, tone, and
                        conversion objectives.
                    </p>
                </div>

                {/* How It Works - Detailed */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>How Our Hook Generator Works</h3>

                    <div className={styles.stepsList}>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h4>Describe Your Concept</h4>
                                <p>Simply input your product, target audience, and the problem you solve. Our AI instantly understands your
                                    marketing context. Whether you're selling online courses, e-commerce products, B2B services, or real estate
                                    listings, the algorithm adapts to your industry.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h4>AI Analyzes and Creates</h4>
                                <p>Within seconds, our technology—trained on millions of successful ad creatives—generates multiple optimized
                                    hook variations. Each suggestion is calibrated to maximize attention in those critical first 3 seconds.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h4>Choose and Customize</h4>
                                <p>Instantly receive 3 different hooks: provocative questions, shocking statistics, personal stories, secret
                                    revelations, and urgency-driven openings. Select the one that best aligns with your brand voice.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>4</div>
                            <div className={styles.stepContent}>
                                <h4>Launch Your Production</h4>
                                <p>Integrate your hook directly into your creation workflow. AdMakerAI's platform allows you to produce
                                    complete videos with AI actors, automated editing, and subtitle generation—all in under 10 minutes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examples */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Examples of AI-Generated Hooks That Convert</h3>

                    <div className={styles.examplesList}>
                        <div className={styles.exampleItem}>
                            <h4>For Skincare Brands <span className={styles.audience}>(25-35, female audience)</span></h4>
                            <p className={styles.hookExample}>
                                "You're spending $200 on anti-aging creams that don't work. This dermatologist reveals why 94% of products fail..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>For Business Coaches <span className={styles.audience}>(entrepreneurs, startup founders)</span></h4>
                            <p className={styles.hookExample}>
                                "I lost $50K on Facebook ads before discovering this one hook formula. Now I'm at $2M/year—here's exactly what changed..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>For SaaS Products <span className={styles.audience}>(B2B, tech decision-makers)</span></h4>
                            <p className={styles.hookExample}>
                                "Your competitor just automated what takes your team 40 hours per week. Here's the tool they're using..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>For E-commerce <span className={styles.audience}>(impulse buyers, product discovery)</span></h4>
                            <p className={styles.hookExample}>
                                "This sold out 3 times in 24 hours. Amazon tried to ban it. Here's why everyone's obsessed..."
                            </p>
                        </div>
                    </div>

                    <p className={styles.text}>
                        These hooks work because they follow proven patterns: they create curiosity gaps, challenge assumptions, promise
                        specific transformations, or reveal insider information. Our hook generator applies these principles automatically
                        to your unique value proposition.
                    </p>
                </div>

                {/* Why Choose AdMakerAI */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Why Professional Marketers Choose AdMakerAI's Hook Generator</h3>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <h4>📊 Data-Driven Performance</h4>
                            <p>Unlike generic AI tools, our hook generator is specifically trained on high-converting ad creatives across
                                multiple platforms. Each suggestion comes from real performance data, not generic templates.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎯 Industry-Specific Optimization</h4>
                            <p>Whether you're in e-commerce, SaaS, education, finance, health & wellness, or real estate, our AI understands
                                industry-specific language, compliance requirements, and audience psychology.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎬 Complete Video Production</h4>
                            <p>Our hook generator isn't standalone—it's part of a complete video creation ecosystem. Generate your hook,
                                then immediately produce the full video using our AI tools.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>💰 Cost-Effective Creativity</h4>
                            <p>Hiring copywriters to create ad script variations costs hundreds per iteration. Our tool lets you experiment
                                with unlimited variations at a fraction of the cost.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Frequently Asked Questions</h3>

                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h4>How is this different from other AI writing tools?</h4>
                            <p>Generic AI tools create general copy. Our hook generator is specifically trained on millions of high-performing
                                video ads across social platforms. Every suggestion is optimized for video engagement, not blog posts or emails.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Can I use these hooks for organic content too?</h4>
                            <p>Absolutely. While optimized for paid product ad campaigns, these hooks work equally well for organic social
                                media content, YouTube videos, podcast intros, or any content where you need to capture attention fast.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>How many hook variations can I generate?</h4>
                            <p>With a Pro account, unlimited. Generate as many variations as you need to find the perfect fit. Free users
                                get 10 generations to start.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Does this work for B2B video advertising?</h4>
                            <p>Definitely. While many examples focus on consumer brands, our AI understands B2B contexts including longer
                                sales cycles, multiple decision-makers, and technical products.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>How quickly can I start seeing results?</h4>
                            <p>Most users generate their first high-performing hook within 2 minutes of signing up. The time from idea to
                                finished video averages 8-12 minutes on AdMakerAI.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.finalCta}>
                    <h3>Transform Your Video Advertising Today</h3>
                    <p>
                        Stop guessing which hook will work. Stop wasting budget on videos that don't convert because the first 3 seconds
                        failed to engage. AdMakerAI's hook generator gives you the competitive advantage of data-driven creativity.
                    </p>
                    <p>
                        Join <strong>20,000+ marketers</strong> already using AdMakerAI to create scroll-stopping content that converts.
                    </p>
                    <Link href="/payment" className={styles.ctaButton}>
                        Get Started Free
                    </Link>
                </div>
            </div>
        </section>
    );
}
