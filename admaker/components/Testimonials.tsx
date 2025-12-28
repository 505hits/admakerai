import styles from './Testimonials.module.css';

interface TestimonialsProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko';
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
        },
        es: {
            title: 'Lo Que Los Marketers Dicen Sobre Nuestra',
            titleHighlight: 'Plataforma de Video UGC IA',
            subtitle: 'Únete a más de 20,000 marketers que cambiaron a la plataforma mejor calificada para anuncios de video UGC rápidos.',
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "Propietaria de Agencia de Marketing",
                    text: "Después de probar todos los principales generadores de avatares IA, AdMaker AI es sin duda el mejor. Creamos más de 50 anuncios de video UGC mensuales para nuestros clientes. ¡Los actores IA son tan realistas que las tasas de engagement se triplicaron!"
                },
                {
                    name: "Michael Chen",
                    role: "Consultor de Crecimiento E-Commerce",
                    text: "Como startup, encontrar soluciones de avatar IA asequibles era crucial. AdMaker AI ofrece calidad comercial a precios de startup. La función de producto en mano es revolucionaria para nuestros clientes de e-commerce."
                },
                {
                    name: "Sarah Thompson",
                    role: "Directora de Redes Sociales, Fortune 500",
                    text: "¡Un cambio total! Nuestro sistema IA de creatividad publicitaria produce contenido UGC viral consistentemente. ¡El ROI aumentó 400%!"
                },
                {
                    name: "David Rodriguez",
                    role: "Gerente de Marketing de Contenido",
                    text: "Crear videos de testimonios IA es sin esfuerzo. El generador de influencers IA nos ayuda a escalar contenido 10x más rápido que contratar creadores reales."
                },
                {
                    name: "Emma Williams",
                    role: "Propietaria de Marca TikTok Shop",
                    text: "Creamos contenido estilo UGC para TikTok que obtiene millones de vistas. ¡Mejor inversión jamás hecha!"
                },
                {
                    name: "Robert Johnson",
                    role: "VP de Marketing Digital",
                    text: "¡Finalmente, una plataforma de avatar IA confiable para grandes organizaciones! ¡Probar 20 variantes A/B ahora es posible en una tarde!"
                }
            ]
        },
        pt: {
            title: 'O Que Os Profissionais de Marketing Dizem Sobre Nossa',
            titleHighlight: 'Plataforma de Vídeo UGC IA',
            subtitle: 'Junte-se a mais de 20.000 profissionais de marketing que mudaram para a plataforma mais bem avaliada para anúncios de vídeo UGC rápidos.',
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "Proprietária de Agência de Marketing",
                    text: "Depois de testar todos os principais geradores de avatares IA, o AdMaker AI é sem dúvida o melhor. Criamos mais de 50 anúncios de vídeo UGC mensais para nossos clientes. Os atores IA são tão realistas que as taxas de engajamento triplicaram!"
                },
                {
                    name: "Michael Chen",
                    role: "Consultor de Crescimento E-Commerce",
                    text: "Como startup, encontrar soluções de avatar IA acessíveis era crucial. O AdMaker AI oferece qualidade comercial a preços de startup. O recurso de produto na mão é revolucionário para nossos clientes de e-commerce."
                },
                {
                    name: "Sarah Thompson",
                    role: "Diretora de Mídias Sociais, Fortune 500",
                    text: "Mudança total! Nosso sistema IA de criatividade publicitária produz conteúdo UGC viral consistentemente. O ROI aumentou 400%!"
                },
                {
                    name: "David Rodriguez",
                    role: "Gerente de Marketing de Conteúdo",
                    text: "Criar vídeos de depoimentos IA é sem esforço. O gerador de influenciadores IA nos ajuda a escalar conteúdo 10x mais rápido do que contratar criadores reais."
                },
                {
                    name: "Emma Williams",
                    role: "Proprietária de Marca TikTok Shop",
                    text: "Criamos conteúdo estilo UGC para TikTok que obtém milhões de visualizações. Melhor investimento já feito!"
                },
                {
                    name: "Robert Johnson",
                    role: "VP de Marketing Digital",
                    text: "Finalmente, uma plataforma de avatar IA confiável para grandes organizações! Testar 20 variantes A/B agora é possível em uma tarde!"
                }
            ]
        },
        ko: {
            title: '마케터들이 우리의',
            titleHighlight: 'AI UGC 비디오 플랫폼에 대해 말하는 것',
            subtitle: '빠른 UGC 비디오 광고를 위한 최고 등급 플랫폼으로 전환한 20,000명 이상의 마케터와 함께하세요.',
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "마케팅 에이전시 소유자",
                    text: "모든 주요 AI 아바타 생성기를 테스트한 후 AdMaker AI가 단연 최고입니다. 고객을 위해 매월 50개 이상의 UGC 비디오 광고를 만듭니다. AI 액터가 너무 사실적이어서 참여율이 3배 증가했습니다!"
                },
                {
                    name: "Michael Chen",
                    role: "전자상거래 성장 컨설턴트",
                    text: "스타트업으로서 저렴한 AI 아바타 솔루션을 찾는 것이 중요했습니다. AdMaker AI는 스타트업 가격으로 상업적 품질을 제공합니다. 손에 제품 기능은 전자상거래 고객에게 혁신적입니다."
                },
                {
                    name: "Sarah Thompson",
                    role: "소셜 미디어 이사, Fortune 500",
                    text: "완전한 게임 체인저! AI 광고 크리에이티브 시스템이 일관되게 바이럴 UGC 콘텐츠를 생산합니다. ROI가 400% 증가했습니다!"
                },
                {
                    name: "David Rodriguez",
                    role: "콘텐츠 마케팅 매니저",
                    text: "AI 추천 비디오 만들기가 쉽습니다. AI 인플루언서 생성기는 실제 크리에이터를 고용하는 것보다 10배 빠르게 콘텐츠를 확장하는 데 도움이 됩니다."
                },
                {
                    name: "Emma Williams",
                    role: "TikTok Shop 브랜드 소유자",
                    text: "수백만 조회수를 얻는 TikTok용 UGC 스타일 콘텐츠를 만듭니다. 최고의 투자입니다!"
                },
                {
                    name: "Robert Johnson",
                    role: "디지털 마케팅 VP",
                    text: "마침내 대규모 조직을 위한 신뢰할 수 있는 AI 아바타 플랫폼! 이제 오후에 20개의 A/B 변형을 테스트할 수 있습니다!"
                }
            ]
        }
    };

    const t = content[lang] || content['en'];

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
