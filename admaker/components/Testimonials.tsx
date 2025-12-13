import styles from './Testimonials.module.css';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "E-commerce Founder",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
            text: "AdMaker AI transformed our ad strategy. We went from spending hours on video creation to generating professional UGC content in minutes. Our conversion rate increased by 250%!",
            rating: 5
        },
        {
            name: "Marcus Rodriguez",
            role: "Marketing Director",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
            text: "The AI avatars are incredibly realistic. Our clients can't tell the difference between AI-generated and real UGC videos. This tool is a game-changer for our agency.",
            rating: 5
        },
        {
            name: "Emily Watson",
            role: "Social Media Manager",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
            text: "I was skeptical at first, but the quality blew me away. We're now creating 10x more video content for our campaigns and seeing amazing engagement rates.",
            rating: 5
        },
        {
            name: "David Kim",
            role: "Startup CEO",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            text: "As a startup with limited budget, AdMaker AI has been a lifesaver. We can compete with bigger brands without breaking the bank on video production.",
            rating: 5
        },
        {
            name: "Lisa Anderson",
            role: "Content Creator",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
            text: "The speed and quality are unmatched. I can test multiple ad variations in a single day. My ROI has never been better!",
            rating: 5
        },
        {
            name: "James Taylor",
            role: "Digital Strategist",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
            text: "AdMaker AI is the future of video advertising. The AI is so advanced that our videos consistently outperform traditional UGC content.",
            rating: 5
        }
    ];

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2>Loved by <span className="gradient-text-red">20,000+ creators</span></h2>
                    <p>See what our customers have to say about AdMaker AI</p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={styles.testimonialCard}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
