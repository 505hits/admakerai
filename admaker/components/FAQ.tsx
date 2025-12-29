'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja' | 'ar';
}

export default function FAQ({ lang = 'en' }: FAQProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const content = {
        en: {
            title: 'Frequently Asked Questions About',
            titleHighlight: 'AI UGC Video Creation',
            subtitle: 'Everything you need to know about creating AI-powered UGC videos, choosing the best AI avatar generator, and maximizing your video advertising ROI.',
            faqs: [
                {
                    question: "What makes AdMaker AI the best AI UGC video platform?",
                    answer: "AdMaker AI combines cutting-edge AI actor technology with user-friendly design, making it the top AI tool for generating UGC video content. Unlike basic deepfake video makers, we offer 300+ realistic avatars, product-in-hand integration, and 2-minute generation times."
                },
                {
                    question: "How does the AI video creator from script work?",
                    answer: "Our AI video creator from script uses advanced natural language processing and computer vision. Simply paste your ad script, select an AI actor, and our system generates a fully lip-synced, realistic UGC video in under 2 minutes."
                },
                {
                    question: "What is the product-in-hand feature?",
                    answer: "This revolutionary feature allows your AI avatar to physically hold, showcase, or wear your product in the video. Simply upload a product image, and our advanced AI seamlessly integrates it into the scene."
                },
                {
                    question: "How realistic are the AI actors and avatars?",
                    answer: "Our AI actors use state-of-the-art technology. They feature natural facial expressions, realistic eye movements, perfect lip-sync in multiple languages, and authentic body language."
                },
                {
                    question: "Can I create UGC videos for TikTok and Instagram Reels?",
                    answer: "Absolutely! AdMaker AI offers automatic optimization for 9:16 vertical format. Export your AI UGC videos in TikTok, Instagram Reels, YouTube Shorts, or Facebook formats with one click."
                }
            ]
        },
        fr: {
            title: 'Questions Fréquemment Posées Sur',
            titleHighlight: 'La Création de Vidéos UGC IA',
            subtitle: 'Tout ce que vous devez savoir sur la création de vidéos UGC alimentées par l\'IA, le choix du meilleur générateur d\'avatar IA et la maximisation de votre ROI publicitaire vidéo.',
            faqs: [
                {
                    question: "Qu'est-ce qui fait d'AdMaker AI la meilleure plateforme vidéo UGC IA ?",
                    answer: "AdMaker AI combine une technologie d'acteur IA de pointe avec une conception conviviale, ce qui en fait le meilleur outil IA pour générer du contenu vidéo UGC. Contrairement aux créateurs de deepfake basiques, nous offrons plus de 300 avatars réalistes, l'intégration produit en main et des temps de génération de 2 minutes."
                },
                {
                    question: "Comment fonctionne le créateur de vidéos IA à partir de script ?",
                    answer: "Notre créateur de vidéos IA à partir de script utilise le traitement avancé du langage naturel et la vision par ordinateur. Collez simplement votre script publicitaire, sélectionnez un acteur IA, et notre système génère une vidéo UGC réaliste entièrement synchronisée en moins de 2 minutes."
                },
                {
                    question: "Qu'est-ce que la fonctionnalité produit en main ?",
                    answer: "Cette fonctionnalité révolutionnaire permet à votre avatar IA de tenir physiquement, présenter ou porter votre produit dans la vidéo. Téléchargez simplement une image de produit, et notre IA avancée l'intègre parfaitement dans la scène."
                },
                {
                    question: "À quel point les acteurs et avatars IA sont-ils réalistes ?",
                    answer: "Nos acteurs IA utilisent une technologie de pointe. Ils présentent des expressions faciales naturelles, des mouvements oculaires réalistes, une synchronisation labiale parfaite dans plusieurs langues et un langage corporel authentique."
                },
                {
                    question: "Puis-je créer des vidéos UGC pour TikTok et Instagram Reels ?",
                    answer: "Absolument ! AdMaker AI offre une optimisation automatique pour le format vertical 9:16. Exportez vos vidéos UGC IA au format TikTok, Instagram Reels, YouTube Shorts ou Facebook en un clic."
                }
            ]
        },
        es: {
            title: 'Preguntas Frecuentes Sobre',
            titleHighlight: 'Creación de Videos UGC con IA',
            subtitle: 'Todo lo que necesitas saber sobre la creación de videos UGC con IA, elegir el mejor generador de avatares IA y maximizar tu ROI publicitario en video.',
            faqs: [
                {
                    question: "¿Qué hace de AdMaker AI la mejor plataforma de videos UGC con IA?",
                    answer: "AdMaker AI combina tecnología de actores IA de vanguardia con un diseño fácil de usar, convirtiéndola en la mejor herramienta IA para generar contenido de video UGC. A diferencia de los creadores básicos de deepfake, ofrecemos más de 300 avatares realistas, integración de producto en mano y tiempos de generación de 2 minutos."
                },
                {
                    question: "¿Cómo funciona el creador de videos IA desde guión?",
                    answer: "Nuestro creador de videos IA desde guión utiliza procesamiento avanzado de lenguaje natural y visión por computadora. Simplemente pega tu guión publicitario, selecciona un actor IA, y nuestro sistema genera un video UGC realista completamente sincronizado en menos de 2 minutos."
                },
                {
                    question: "¿Qué es la función de producto en mano?",
                    answer: "Esta función revolucionaria permite que tu avatar IA sostenga físicamente, muestre o use tu producto en el video. Simplemente sube una imagen del producto, y nuestra IA avanzada lo integra perfectamente en la escena."
                },
                {
                    question: "¿Qué tan realistas son los actores y avatares IA?",
                    answer: "Nuestros actores IA utilizan tecnología de última generación. Presentan expresiones faciales naturales, movimientos oculares realistas, sincronización labial perfecta en múltiples idiomas y lenguaje corporal auténtico."
                },
                {
                    question: "¿Puedo crear videos UGC para TikTok e Instagram Reels?",
                    answer: "¡Absolutamente! AdMaker AI ofrece optimización automática para formato vertical 9:16. Exporta tus videos UGC IA en formato TikTok, Instagram Reels, YouTube Shorts o Facebook con un clic."
                }
            ]
        },
        pt: {
            title: 'Perguntas Frequentes Sobre',
            titleHighlight: 'Criação de Vídeos UGC com IA',
            subtitle: 'Tudo o que você precisa saber sobre criação de vídeos UGC com IA, escolher o melhor gerador de avatares IA e maximizar seu ROI publicitário em vídeo.',
            faqs: [
                {
                    question: "O que torna o AdMaker AI a melhor plataforma de vídeos UGC com IA?",
                    answer: "O AdMaker AI combina tecnologia de atores IA de ponta com design fácil de usar, tornando-o a melhor ferramenta IA para gerar conteúdo de vídeo UGC. Ao contrário dos criadores básicos de deepfake, oferecemos mais de 300 avatares realistas, integração de produto na mão e tempos de geração de 2 minutos."
                },
                {
                    question: "Como funciona o criador de vídeos IA a partir de script?",
                    answer: "Nosso criador de vídeos IA a partir de script usa processamento avançado de linguagem natural e visão computacional. Simplesmente cole seu script publicitário, selecione um ator IA, e nosso sistema gera um vídeo UGC realista completamente sincronizado em menos de 2 minutos."
                },
                {
                    question: "O que é o recurso de produto na mão?",
                    answer: "Este recurso revolucionário permite que seu avatar IA segure fisicamente, mostre ou use seu produto no vídeo. Simplesmente faça upload de uma imagem do produto, e nossa IA avançada o integra perfeitamente na cena."
                },
                {
                    question: "Quão realistas são os atores e avatares IA?",
                    answer: "Nossos atores IA usam tecnologia de última geração. Eles apresentam expressões faciais naturais, movimentos oculares realistas, sincronização labial perfeita em vários idiomas e linguagem corporal autêntica."
                },
                {
                    question: "Posso criar vídeos UGC para TikTok e Instagram Reels?",
                    answer: "Absolutamente! O AdMaker AI oferece otimização automática para formato vertical 9:16. Exporte seus vídeos UGC IA no formato TikTok, Instagram Reels, YouTube Shorts ou Facebook com um clique."
                }
            ]
        },
        ko: {
            title: 'AI UGC 비디오 제작에 대한',
            titleHighlight: '자주 묻는 질문',
            subtitle: 'AI UGC 비디오 제작, 최고의 AI 아바타 생성기 선택, 비디오 광고 ROI 극대화에 대해 알아야 할 모든 것.',
            faqs: [
                {
                    question: "AdMaker AI가 최고의 AI UGC 비디오 플랫폼인 이유는 무엇인가요?",
                    answer: "AdMaker AI는 최첨단 AI 액터 기술과 사용자 친화적인 디자인을 결합하여 UGC 비디오 콘텐츠 생성을 위한 최고의 AI 도구입니다. 기본 딥페이크 크리에이터와 달리, 300개 이상의 사실적인 아바타, 손에 제품 통합, 2분 생성 시간을 제공합니다."
                },
                {
                    question: "스크립트에서 AI 비디오 크리에이터는 어떻게 작동하나요?",
                    answer: "스크립트에서 AI 비디오 크리에이터는 고급 자연어 처리 및 컴퓨터 비전을 사용합니다. 광고 스크립트를 붙여넣고 AI 액터를 선택하면 시스템이 2분 이내에 완전히 동기화된 사실적인 UGC 비디오를 생성합니다."
                },
                {
                    question: "손에 제품 기능이란 무엇인가요?",
                    answer: "이 혁신적인 기능을 사용하면 AI 아바타가 비디오에서 제품을 물리적으로 들고, 보여주거나 사용할 수 있습니다. 제품 이미지를 업로드하기만 하면 고급 AI가 장면에 완벽하게 통합합니다."
                },
                {
                    question: "AI 액터와 아바타는 얼마나 사실적인가요?",
                    answer: "AI 액터는 최첨단 기술을 사용합니다. 자연스러운 표정, 사실적인 눈 움직임, 여러 언어로 완벽한 립싱크, 진정한 신체 언어를 특징으로 합니다."
                },
                {
                    question: "TikTok 및 Instagram Reels용 UGC 비디오를 만들 수 있나요?",
                    answer: "물론입니다! AdMaker AI는 세로 9:16 형식에 대한 자동 최적화를 제공합니다. 클릭 한 번으로 TikTok, Instagram Reels, YouTube Shorts 또는 Facebook 형식으로 AI UGC 비디오를 내보낼 수 있습니다."
                }
            ]
        },
        de: {
            title: 'Häufig Gestellte Fragen Zur',
            titleHighlight: 'KI-UGC-Videoerstellung',
            subtitle: 'Alles, was Sie über die Erstellung von KI-gestützten UGC-Videos, die Auswahl des besten KI-Avatar-Generators und die Maximierung Ihres Video-Werbe-ROI wissen müssen.',
            faqs: [
                {
                    question: "Was macht AdMaker AI zur besten KI-UGC-Videoplattform?",
                    answer: "AdMaker AI kombiniert modernste KI-Schauspieler-Technologie mit benutzerfreundlichem Design und ist damit das beste KI-Tool zur Generierung von UGC-Videoinhalten. Im Gegensatz zu einfachen Deepfake-Erstellern bieten wir über 300 realistische Avatare, Produkt-in-Hand-Integration und 2-Minuten-Generierungszeiten."
                },
                {
                    question: "Wie funktioniert der KI-Videoersteller aus Skript?",
                    answer: "Unser KI-Videoersteller aus Skript verwendet fortschrittliche natürliche Sprachverarbeitung und Computer Vision. Fügen Sie einfach Ihr Werbeskript ein, wählen Sie einen KI-Schauspieler aus, und unser System generiert in weniger als 2 Minuten ein vollständig lippensynchrones, realistisches UGC-Video."
                },
                {
                    question: "Was ist die Produkt-in-Hand-Funktion?",
                    answer: "Diese revolutionäre Funktion ermöglicht es Ihrem KI-Avatar, Ihr Produkt im Video physisch zu halten, zu präsentieren oder zu tragen. Laden Sie einfach ein Produktbild hoch, und unsere fortschrittliche KI integriert es nahtlos in die Szene."
                },
                {
                    question: "Wie realistisch sind die KI-Schauspieler und Avatare?",
                    answer: "Unsere KI-Schauspieler verwenden modernste Technologie. Sie verfügen über natürliche Gesichtsausdrücke, realistische Augenbewegungen, perfekte Lippensynchronisation in mehreren Sprachen und authentische Körpersprache."
                },
                {
                    question: "Kann ich UGC-Videos für TikTok und Instagram Reels erstellen?",
                    answer: "Absolut! AdMaker AI bietet automatische Optimierung für das vertikale 9:16-Format. Exportieren Sie Ihre KI-UGC-Videos mit einem Klick im TikTok-, Instagram Reels-, YouTube Shorts- oder Facebook-Format."
                }
            ]
        }
    };

    const t = content[lang] || content['en'];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className={styles.faq}>
            <div className="container">
                <div className={`${styles.sectionHeader} animate-fade-in-up`}>
                    <h2>{t.title} <span className="gradient-text-red">{t.titleHighlight}</span></h2>
                    <p>{t.subtitle}</p>
                </div>

                <div className={styles.faqGrid}>
                    {t.faqs.map((item, index) => (
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
