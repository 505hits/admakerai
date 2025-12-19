import styles from './Testimonials.module.css';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Jessica Martinez",
            role: "Performance Marketing Agency Owner",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
            text: "After testing all major AI avatar generators with mobile apps, AdMaker AI is hands down the best. We create 50+ UGC video ads monthly for our clients. The AI actors are so realistic, engagement rates tripled! Best AI video price in the market.",
            rating: 5,
            tag: "AI UGC Video Best AI Avatar"
        },
        {
            name: "Michael Chen",
            role: "E-Commerce Growth Consultant",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
            text: "As a startup, finding affordable AI avatar solutions was crucial. AdMaker AI delivers AI commercial quality at startup prices. The product-in-hand feature is revolutionary for our e-commerce clients. Much better than expensive alternatives!",
            rating: 5,
            tag: "Affordable AI Avatar Product Advertising"
        },
        {
            name: "Sarah Thompson",
            role: "Social Media Director, Fortune 500",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
            text: "Searched for 'best online tool for creating engaging Facebook video ads' and found AdMaker AI. Game changer! We're the top UGC video editing app users could ask for. Our ad creative AI system produces viral UGC content consistently. ROI increased 400%!",
            rating: 5,
            tag: "Facebook Video Ads Ad Creative AI"
        },
        {
            name: "David Rodriguez",
            role: "Content Marketing Manager",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            text: "I needed a free AI video generator from script that actually works. AdMaker AI exceeded expectations! Creating AI testimonial videos is effortless. The AI influencer generator helps us scale content 10x faster than hiring real creators.",
            rating: 5,
            tag: "AI Video From Script AI Influencer"
        },
        {
            name: "Emma Williams",
            role: "TikTok Shop Brand Owner",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
            text: "Compared all AI avatar software for e-commerce product ads and AdMaker AI wins. The deepfake AI video maker technology is incredibly advanced. We create UGC style content for TikTok that gets millions of views. Best investment ever!",
            rating: 5,
            tag: "Deepfake Video Maker TikTok Ads"
        },
        {
            name: "Robert Johnson",
            role: "VP of Digital Marketing",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
            text: "Finally, a reliable AI avatar platform for large organizations! We produce online video advertising at scale. The best UGC video software for ad campaign testing we've used. A/B testing 20 variants is now possible in one afternoon!",
            rating: 5,
            tag: "Campaign Testing Enterprise Solution"
        }
    ];

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div className={`${styles.sectionHeader} animate-fade-in-up`}>
                    <h2>What Digital Marketers Say About Our <span className="gradient-text-red">AI UGC Video Platform</span></h2>
                    <p>Join 20,000+ marketers who switched to the best-rated platform for quick UGC product ad videos. Read real user reviews of AI-powered UGC video creation software.</p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`${styles.testimonialCard} animate-scale-in stagger-${(index % 6) + 1}`}>
                            <div className={styles.stars}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>
                            <p className={styles.testimonialText}>"{testimonial.text}"</p>
                            <div className={styles.testimonialAuthor}>
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className={styles.avatar}
                                />
                                <div>
                                    <h4 className={styles.authorName}>{testimonial.name}</h4>
                                    <p className={styles.authorRole}>{testimonial.role}</p>
                                </div>
                            </div>
                            <div style={{ marginTop: '15px', padding: '8px 12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                                {testimonial.tag}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
