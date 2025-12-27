'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    lang?: 'en' | 'fr' | 'es';
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
