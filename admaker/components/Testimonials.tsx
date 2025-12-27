import styles from './Testimonials.module.css';

interface TestimonialsProps {
    lang?: 'en' | 'fr';
}

export default function Testimonials({ lang = 'en' }: TestimonialsProps) {
    const content = {
        en: {
            title: 'What Digital Marketers Say About Our',
            titleHighlight: 'AI UGC Video Platform',
            subtitle: 'Join 20,000+ marketers who switched to the best-rated platform for quick UGC product ad videos.',
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "Performance Marketing Agency Owner",
                    text: "After testing all major AI avatar generators, AdMaker AI is hands down the best. We create 50+ UGC video ads monthly for our clients. The AI actors are so realistic, engagement rates tripled!"
                },
                {
                    name: "Michael Chen",
                    role: "E-Commerce Growth Consultant",
                    text: "As a startup, finding affordable AI avatar solutions was crucial. AdMaker AI delivers commercial quality at startup prices. The product-in-hand feature is revolutionary for our e-commerce clients."
                },
                {
                    name: "Sarah Thompson",
                    role: "Social Media Director, Fortune 500",
                    text: "Game changer! Our ad creative AI system produces viral UGC content consistently. ROI increased 400%!"
                },
                {
                    name: "David Rodriguez",
                    role: "Content Marketing Manager",
                    text: "Creating AI testimonial videos is effortless. The AI influencer generator helps us scale content 10x faster than hiring real creators."
                },
                {
                    name: "Emma Williams",
                    role: "TikTok Shop Brand Owner",
                    text: "We create UGC style content for TikTok that gets millions of views. Best investment ever!"
                },
                {
                    name: "Robert Johnson",
                    role: "VP of Digital Marketing",
                    text: "Finally, a reliable AI avatar platform for large organizations! A/B testing 20 variants is now possible in one afternoon!"
                }
            ]
        },
        fr: {
            title: 'Ce Que Les Marketeurs Disent De Notre',
            titleHighlight: 'Plateforme Vidéo UGC IA',
            subtitle: 'Rejoignez plus de 20 000 marketeurs qui sont passés à la plateforme la mieux notée pour des publicités vidéo UGC rapides.',
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "Propriétaire d'Agence Marketing",
                    text: "Après avoir testé tous les principaux générateurs d'avatars IA, AdMaker AI est de loin le meilleur. Nous créons plus de 50 publicités vidéo UGC par mois pour nos clients. Les acteurs IA sont si réalistes que les taux d'engagement ont triplé !"
                },
                {
                    name: "Michael Chen",
                    role: "Consultant Croissance E-Commerce",
                    text: "En tant que startup, trouver des solutions d'avatar IA abordables était crucial. AdMaker AI offre une qualité commerciale à des prix de startup. La fonctionnalité produit en main est révolutionnaire pour nos clients e-commerce."
                },
                {
                    name: "Sarah Thompson",
                    role: "Directrice Réseaux Sociaux, Fortune 500",
                    text: "Un vrai game changer ! Notre système IA de création publicitaire produit du contenu UGC viral de manière constante. Le ROI a augmenté de 400% !"
                },
                {
                    name: "David Rodriguez",
                    role: "Responsable Marketing de Contenu",
                    text: "Créer des vidéos de témoignages IA est sans effort. Le générateur d'influenceurs IA nous aide à multiplier notre contenu par 10 par rapport à l'embauche de vrais créateurs."
                },
                {
                    name: "Emma Williams",
                    role: "Propriétaire de Marque TikTok Shop",
                    text: "Nous créons du contenu de style UGC pour TikTok qui obtient des millions de vues. Meilleur investissement jamais fait !"
                },
                {
                    name: "Robert Johnson",
                    role: "VP Marketing Digital",
                    text: "Enfin, une plateforme d'avatar IA fiable pour les grandes organisations ! Tester 20 variantes A/B est maintenant possible en un après-midi !"
                }
            ]
        }
    };

    const t = content[lang];

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div className={`${styles.sectionHeader} animate-fade-in-up`}>
                    <h2>{t.title} <span className="gradient-text-red">{t.titleHighlight}</span></h2>
                    <p>{t.subtitle}</p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {t.testimonials.map((testimonial, index) => (
                        <div key={index} className={`${styles.testimonialCard} animate-scale-in stagger-${(index % 6) + 1}`}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>
                            <p className={styles.testimonialText}>"{testimonial.text}"</p>
                            <div className={styles.testimonialAuthor}>
                                <img
                                    src={`https://images.unsplash.com/photo-${['1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80', '1500648767791-00dcc994a43e', '1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d'][index]}?w=100&h=100&fit=crop&crop=faces`}
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
