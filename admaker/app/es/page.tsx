'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndustryTabs from '@/components/IndustryTabs';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import TypedText from '@/components/TypedText';
import Testimonials from '@/components/Testimonials';
import { getMediaUrl } from '@/lib/cloudflare-config';

export default function HomeEs() {
    useEffect(() => {
        const handleScroll = () => {
            const tiltImage = document.querySelector('.feature-image-tilt img') as HTMLElement;
            if (!tiltImage) return;

            const rect = tiltImage.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const imageCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            const distanceFromCenter = (imageCenter - viewportCenter) / viewportCenter;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const rotateY = distanceFromCenter * 15;
                const rotateX = distanceFromCenter * -5;
                const scale = 1 - Math.abs(distanceFromCenter) * 0.05;

                tiltImage.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
                tiltImage.style.transition = 'transform 0.1s ease-out';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            <Navbar lang="es" />
            <Hero lang="es" />

            {/* Examples Slider Section */}
            <section className="examples-slider">
                <div className="slider-track">
                    {[...Array(18)].map((_, i) => {
                        const videoUrls = [
                            getMediaUrl('video  beauté.mp4'),
                            getMediaUrl('video  bleu.mp4'),
                            getMediaUrl('video canette.mp4'),
                            getMediaUrl('video podcast.mp4'),
                            getMediaUrl('video podcast 2.mp4'),
                            getMediaUrl('video sportif.mp4')
                        ];

                        const titles = [
                            'Publicidad de Belleza',
                            'Lanzamiento de Producto',
                            'Campaña de Bebidas',
                            'Podcast UGC',
                            'Testimonio de Cliente',
                            'Fitness y Deporte'
                        ];

                        const stats = [
                            'Conversión +250%',
                            '10M+ vistas',
                            'ROI x5',
                            'Engagement +180%',
                            'CTR +320%',
                            'Alcance x3'
                        ];

                        const videoIndex = i % 6;

                        return (
                            <div key={i} className="slide">
                                <div className="example-card has-gif">
                                    <video
                                        src={videoUrls[videoIndex]}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="example-gif"
                                    />
                                    <div className="example-info-overlay">
                                        <h4>{titles[videoIndex]}</h4>
                                        <p>{stats[videoIndex]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="feature-row">
                        <div className="feature-content">
                            <h3>Obtén los videos IA perfectos para tu <TypedText /></h3>
                            <p>Crea anuncios de video profesionales en menos de 2 minutos. Nuestra IA avanzada transforma tu guión en contenido viral instantáneamente.</p>
                            <ul className="feature-list">
                                <li>✓ Más de 300 modelos de actores disponibles</li>
                                <li>✓ Genera videos en menos de 2 minutos</li>
                                <li>✓ Optimización de guión por IA</li>
                                <li>✓ Creación instantánea de contenido viral</li>
                            </ul>
                        </div>
                        <div className="feature-image feature-image-tilt">
                            <img src={getMediaUrl('ultra-fast-generation.jpg')} alt="Exemplos de Vídeos UGC" />
                        </div>
                    </div>

                    {/* Step by Step Guide */}
                    <div className="section-header" style={{ marginTop: '80px' }}>
                        <h2>Cómo Crear Videos UGC IA en <span className="gradient-text-red">3 Pasos Simples</span></h2>
                        <p>Nuestro creador de videos IA desde guión facilita la generación de anuncios de video UGC profesionales en minutos.</p>
                    </div>

                    <div className="steps-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '50px' }}>
                        {/* Step 1 */}
                        <div className="step-card animate-fade-in-up stagger-1" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 8, 68, 0.15)', color: '#ff0844', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Paso 1
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Selecciona un actor</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Usa nuestra biblioteca, sube una imagen o usa nuestro generador de imágenes IA realista.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step1.jpg')} alt="Selecionar um Ator de IA" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step-card animate-fade-in-up stagger-2" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 107, 107, 0.15)', color: '#ff6b6b', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Paso 2
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Escribe el Guión</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Transforma tus ideas en anuncios listos para rodar con escritura IA inteligente.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('Step2.png')} alt="Escrever o Script" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step-card animate-fade-in-up stagger-3" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 26, 90, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 26, 90, 0.15)', color: '#ff1a5a', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Paso 3
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Genera tu video</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Dale vida a todo con UGC impresionantes y realistas en minutos.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step3.jpg')} alt="Gerar o Vídeo" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry Tabs Section */}
            <IndustryTabs lang="pt" />

            {/* Winning Ad Replicator Section */}
            <section className="replicator-feature" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)', border: '1px solid rgba(255, 8, 68, 0.3)', borderRadius: '50px', padding: '8px 20px', fontSize: '13px', fontWeight: '700', color: '#ff0844', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>✨ Nueva Funcionalidad</div>
                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>Replicador de <span className="gradient-text-red">Anuncios Ganadores</span></h2>
                        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>Sube cualquier anuncio ganador y replícalo con un actor IA diferente. Perfecto para probar nuevas caras manteniendo el mismo guión y estilo probados.</p>
                    </div>
                    <div className="animate-fade-in-up stagger-1" style={{ display: 'flex', flexDirection: 'row', gap: '40px', maxWidth: '1100px', margin: '0 auto', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px', textAlign: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '20px', maxWidth: '280px', width: '100%' }}>
                                <video src={getMediaUrl('landing winning 1.mp4')} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff' }}>Original</div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Tu Anuncio Ganador</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>Sube cualquier video que esté funcionando bien</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', color: '#ff0844', fontSize: '32px', fontWeight: '800' }}>→</div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px', textAlign: 'center', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '20px', maxWidth: '280px', width: '100%' }}>
                                <video src={getMediaUrl('landing winning 2.mp4')} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #ff0844, #ff6b6b)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#fff' }}>Replicado</div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Nueva Versión con Actor IA</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>Mismo guión, cara diferente, resultados instantáneos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <Pricing lang="pt" />

            {/* Testimonials Section */}
            <Testimonials lang="pt" />

            {/* Why AdMaker AI Section */}
            <section className="features" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#000' }}>
                <div className="container">
                    <div className="section-header"><h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Crear Videos UGC IA Nunca Ha Sido Tan Fácil</h2></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '60px', maxWidth: '1200px', margin: '60px auto 0' }}>
                        <div className="animate-scale-in stagger-1" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Crear Youtube Shorts</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Crea Youtube Shorts con contenido generado por IA. No necesitas grabar nada.</p></div>
                        <div className="animate-scale-in stagger-2" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Crear videos TikTok virales</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Crea videos de TikTok que se vuelvan virales. No necesitas bailar ni hacer playback.</p></div>
                        <div className="animate-scale-in stagger-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Publicar en TikTok y Youtube</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Publica tus videos directamente desde la aplicación.</p></div>
                        <div className="animate-scale-in stagger-4" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>100% Impulsado por IA</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Usamos los modelos más recientes y potentes para generar contenido relevante y atractivo.</p></div>
                        <div className="animate-scale-in stagger-5" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Voces en Off Generadas por IA</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Usamos los últimos modelos de IA para generar voces en off para tus videos.</p></div>
                        <div className="animate-scale-in stagger-6" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Música de fondo</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Añade música de fondo a tus videos. Tenemos una biblioteca de miles de canciones.</p></div>
                        <div className="animate-scale-in stagger-7" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Exportación multi-formato</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>Exporta en 9:16, 1:1 o 16:9 para TikTok, Instagram Reels y YouTube.</p></div>
                        <div className="animate-scale-in stagger-8" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div><h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Y mucho más...</h3><p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>AdMaker AI evoluciona constantemente. Añadimos nuevas funcionalidades cada semana.</p></div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ lang="pt" />

            {/* CTA Section */}
            <section className="cta" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="cta-glow"></div>
                <div className="container">
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '32px',
                        padding: '80px 60px',
                        textAlign: 'center',
                        position: 'relative',
                        backdropFilter: 'blur(10px)'
                    }} className="animate-fade-in-up">
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 56px)',
                            fontWeight: '800',
                            marginBottom: '24px',
                            lineHeight: '1.2'
                        }}>
                            Diga Adiós a los Videos Aburridos 👋
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '40px',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            lineHeight: '1.6'
                        }}>
                            Comienza con AdMaker AI hoy y crea videos UGC atractivos para TikTok, Instagram Reels y YouTube en piloto automático.
                        </p>
                        <a
                            href="/es/iniciar-sesion"
                            className="btn-primary btn-large"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '18px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #ff0844 0%, #ff6b6b 100%)',
                                color: '#fff',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 30px rgba(255, 8, 68, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 8, 68, 0.4)';
                            }}
                        >
                            Comenzar
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="logo">
                                <span className="logo-text">AdMaker<span className="gradient-text">AI</span></span>
                            </div>
                            <p>La plataforma #1 para crear anuncios de video IA en minutos.</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 AdMaker AI. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
