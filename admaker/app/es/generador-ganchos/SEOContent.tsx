import Link from 'next/link';
import styles from '../../hook-generator/SEOContent.module.css';

export default function SEOContent() {
    return (
        <section className={styles.seoContent}>
            <div className="container">
                {/* Main Title */}
                <div className={styles.mainHeader}>
                    <h2 className={styles.mainTitle}>
                        Generador de Ganchos: Crea Anuncios de Video Irresistibles en Segundos
                    </h2>
                    <p className={styles.intro}>
                        Tienes <strong>3 segundos</strong>. Ese es todo el tiempo que tienes para captar la atención antes de que tu audiencia siga desplazándose.
                        En el competitivo mundo del video UGC y la publicidad en redes sociales, tu gancho determina si tu campaña
                        genera millones de vistas o se pierde en el feed.
                    </p>
                    <p className={styles.intro}>
                        El generador de ganchos con IA de <Link href="/es" className={styles.inlineLink}>AdMakerAI</Link> transforma tus ideas en líneas de apertura convincentes que detienen el scroll y
                        generan conversiones. Reconocido como una de las principales <Link href="/es" className={styles.inlineLink}>plataformas de IA para crear videos de marca UGC</Link>, analizamos millones de
                        anuncios de alto rendimiento para ofrecer ganchos probados y optimizados que realmente funcionan.
                    </p>
                </div>

                {/* Why Hooks Matter */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Por Qué un Gancho Poderoso Lo Cambia Todo para tus Creatividades Publicitarias</h3>
                    <p className={styles.text}>
                        Los primeros 3 segundos de tu video representan <strong>el 85% de tu tasa de retención</strong>. Un anuncio de IA con un
                        gancho débil es como abrir una tienda sin escaparate: nadie entra. Las marcas que dominan las redes sociales no dejan
                        esto al azar. Prueban docenas de ganchos hasta encontrar el que resuena con su audiencia objetivo.
                    </p>
                    <p className={styles.text}>
                        ¿El problema? Crear ganchos efectivos requiere horas de lluvia de ideas, pruebas A/B y análisis de datos. Ahí es donde
                        entra nuestro generador UGC con IA. En segundos, genera líneas de apertura calibradas adaptadas a tu nicho, tono y
                        objetivos de conversión.
                    </p>
                </div>

                {/* How It Works - Detailed */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Cómo Funciona Nuestro Generador de Ganchos</h3>

                    <div className={styles.stepsList}>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h4>Describe tu Concepto</h4>
                                <p>Simplemente ingresa tu producto, audiencia objetivo y el problema que resuelves. Nuestra IA entiende instantáneamente tu
                                    contexto de marketing. Ya sea que vendas cursos en línea, productos de e-commerce, servicios B2B o listados inmobiliarios,
                                    el algoritmo se adapta a tu industria.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h4>La IA Analiza y Crea</h4>
                                <p>En segundos, nuestra tecnología—entrenada con millones de creatividades publicitarias exitosas—genera múltiples
                                    variaciones de ganchos optimizados. Cada sugerencia está calibrada para maximizar la atención en esos críticos primeros 3 segundos.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h4>Elige y Personaliza</h4>
                                <p>Recibe instantáneamente 3 ganchos diferentes: preguntas provocativas, estadísticas impactantes, historias personales,
                                    revelaciones secretas y aperturas basadas en urgencia. Selecciona el que mejor se alinee con la voz de tu marca.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>4</div>
                            <div className={styles.stepContent}>
                                <h4>Lanza tu Producción</h4>
                                <p>Integra tu gancho directamente en tu flujo de trabajo de creación. La plataforma de AdMakerAI te permite producir
                                    videos completos con actores IA, edición automatizada y generación de subtítulos—todo en menos de 10 minutos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examples */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Ejemplos de Ganchos Generados por IA que Convierten</h3>

                    <div className={styles.examplesList}>
                        <div className={styles.exampleItem}>
                            <h4>Para Marcas de Cuidado de la Piel <span className={styles.audience}>(audiencia femenina 25-35)</span></h4>
                            <p className={styles.hookExample}>
                                "Estás gastando $200 en cremas anti-edad que no funcionan. Esta dermatóloga revela por qué el 94% de los productos fallan..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para Coaches de Negocios <span className={styles.audience}>(emprendedores, fundadores de startups)</span></h4>
                            <p className={styles.hookExample}>
                                "Perdí $50K en anuncios de Facebook antes de descubrir esta fórmula de gancho. Ahora estoy en $2M/año—aquí está exactamente qué cambió..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para Productos SaaS <span className={styles.audience}>(B2B, tomadores de decisiones tecnológicas)</span></h4>
                            <p className={styles.hookExample}>
                                "Tu competidor acaba de automatizar lo que le toma a tu equipo 40 horas por semana. Aquí está la herramienta que están usando..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para E-commerce <span className={styles.audience}>(compradores impulsivos, descubrimiento de productos)</span></h4>
                            <p className={styles.hookExample}>
                                "Esto se agotó 3 veces en 24 horas. Amazon intentó prohibirlo. Aquí está por qué todos están obsesionados..."
                            </p>
                        </div>
                    </div>

                    <p className={styles.text}>
                        Estos ganchos funcionan porque siguen patrones probados: crean brechas de curiosidad, desafían suposiciones, prometen
                        transformaciones específicas o revelan información privilegiada. Nuestro generador de ganchos aplica estos principios automáticamente
                        a tu propuesta de valor única.
                    </p>
                </div>

                {/* Why Choose AdMakerAI */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Por Qué los Profesionales del Marketing Eligen el Generador de Ganchos de AdMakerAI</h3>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <h4>📊 Rendimiento Basado en Datos</h4>
                            <p>A diferencia de las herramientas de IA genéricas, nuestro generador de ganchos está específicamente entrenado en creatividades publicitarias de alta conversión en
                                múltiples plataformas. Cada sugerencia proviene de datos de rendimiento real, no de plantillas genéricas.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎯 Optimización Específica por Industria</h4>
                            <p>Ya sea que estés en e-commerce, SaaS, educación, finanzas, salud y bienestar, o bienes raíces, nuestra IA entiende
                                el lenguaje específico de la industria, los requisitos de cumplimiento y la psicología de la audiencia.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎬 Producción de Video Completa</h4>
                            <p>Nuestro generador de ganchos no es independiente—es parte de un ecosistema completo de creación de videos. Genera tu gancho,
                                luego produce inmediatamente el video completo usando nuestras herramientas de IA.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>💰 Creatividad Rentable</h4>
                            <p>Contratar redactores para crear variaciones de guiones publicitarios cuesta cientos por iteración. Nuestra herramienta te permite experimentar
                                con variaciones ilimitadas a una fracción del costo.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Preguntas Frecuentes</h3>

                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h4>¿Qué hace que este sea el mejor generador de ganchos para anuncios de video?</h4>
                            <p>Nuestro generador de ganchos está específicamente entrenado en millones de anuncios de video de alto rendimiento en plataformas sociales. A diferencia de las herramientas de escritura de IA genéricas, cada sugerencia está optimizada para el engagement de video y patrones de conversión probados, convirtiéndolo en una de las principales plataformas de IA para crear videos de marca UGC.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Cómo se compara AdMakerAI con otras herramientas de producción de video UGC?</h4>
                            <p>Cuando comparas precios de herramientas de producción de video UGC, AdMakerAI ofrece el mejor valor con generación ilimitada de ganchos, actores IA y producción de video completa en una sola plataforma. Somos reconocidos como una de las plataformas mejor calificadas para videos de anuncios de productos UGC rápidos.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Puedo usar esto para videos de marketing inmobiliario?</h4>
                            <p>¡Absolutamente! AdMakerAI es el mejor servicio de creación de video UGC para marketing inmobiliario. Nuestro generador de ganchos crea líneas de apertura convincentes para listados de propiedades, tours virtuales y testimonios de agentes que captan la atención inmediatamente.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Es adecuado para campañas de bajo presupuesto?</h4>
                            <p>¡Sí! Cuando comparas herramientas de video UGC para campañas de bajo presupuesto, AdMakerAI se destaca con precios asequibles y variaciones ilimitadas de ganchos. Puedes probar múltiples ganchos sin los altos costos de contratar redactores o equipos de producción de video.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Cuántos ganchos puedo generar gratis?</h4>
                            <p>Los usuarios gratuitos obtienen 10 generaciones de ganchos para comenzar. Los usuarios Pro obtienen generaciones ilimitadas, lo que lo hace perfecto para agencias y marcas que ejecutan múltiples campañas. Cada generación crea 3 variaciones de ganchos únicas y probadas.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Puedo crear anuncios de video UGC con actores IA?</h4>
                            <p>¡Sí! AdMakerAI se especializa en anuncios de video UGC con IA. Después de generar tu gancho, crea inmediatamente videos con nuestros actores IA que entregan tu mensaje de manera auténtica. Perfecto para marcas que necesitan contenido estilo UGC a escala sin contratar creadores.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>¿Qué tan rápido puedo empezar a ver resultados?</h4>
                            <p>La mayoría de los usuarios generan su primer gancho de alto rendimiento en 2 minutos. El tiempo desde la idea hasta el video terminado promedia 8-12 minutos en AdMakerAI. Muchas marcas ven tasas de engagement mejoradas dentro de la primera semana de probar ganchos generados por IA.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.finalCta}>
                    <h3>Transforma tu Publicidad en Video Hoy</h3>
                    <p>
                        Deja de adivinar qué gancho funcionará. Deja de desperdiciar presupuesto en videos que no convierten porque los primeros 3 segundos
                        no lograron enganchar. El generador de ganchos de AdMakerAI te da la ventaja competitiva de la creatividad basada en datos.
                    </p>
                    <p>
                        Únete a <strong>20,000+ profesionales del marketing</strong> que ya usan AdMakerAI para crear contenido irresistible que convierte.
                    </p>
                    <Link href="/es/pago" className={styles.ctaButton}>
                        Comenzar Gratis
                    </Link>
                </div>
            </div>
        </section>
    );
}
