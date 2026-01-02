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

export default function HomeDe() {
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
            <Navbar lang="de" />
            <Hero lang="de" />

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
                            'Beauty-Werbung',
                            'Produkteinführung',
                            'Getränke-Kampagne',
                            'Podcast UGC',
                            'Kundenbewertung',
                            'Fitness & Sport'
                        ];

                        const stats = [
                            'Conversion +250%',
                            '10M+ Aufrufe',
                            'ROI x5',
                            'Engagement +180%',
                            'CTR +320%',
                            'Reichweite x3'
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
                            <h3>Erhalten Sie die perfekten KI-Videos für Ihr <TypedText /></h3>
                            <p>Erstellen Sie professionelle Videoanzeigen in weniger als 2 Minuten. Unsere fortschrittliche KI verwandelt Ihr Skript sofort in viralen Content.</p>
                            <ul className="feature-list">
                                <li>✓ 300+ verfügbare Schauspieler-Vorlagen</li>
                                <li>✓ Generieren Sie Videos in weniger als 2 Minuten</li>
                                <li>✓ KI-Skript-Optimierung</li>
                                <li>✓ Sofortige Erstellung viraler Inhalte</li>
                            </ul>
                        </div>
                        <div className="feature-image feature-image-tilt">
                            <img src={getMediaUrl('ultra-fast-generation.jpg')} alt="UGC-Video-Beispiele" />
                        </div>
                    </div>

                    {/* Step by Step Guide */}
                    <div className="section-header" style={{ marginTop: '80px' }}>
                        <h2>So Erstellen Sie KI-UGC-Videos in <span className="gradient-text-red">3 Einfachen Schritten</span></h2>
                        <p>Unser KI-Video-Generator aus Skript macht es einfach, professionelle UGC-Videoanzeigen in Minuten zu erstellen.</p>
                    </div>

                    <div className="steps-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '50px' }}>
                        {/* Step 1 */}
                        <div className="step-card animate-fade-in-up stagger-1" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 8, 68, 0.15)', color: '#ff0844', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Schritt 1
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Wählen Sie einen Schauspieler</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Nutzen Sie unsere Bibliothek, laden Sie ein Bild hoch oder verwenden Sie unseren realistischen KI-Bildgenerator.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step1.jpg')} alt="KI-Schauspieler Auswählen" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step-card animate-fade-in-up stagger-2" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 107, 107, 0.15)', color: '#ff6b6b', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Schritt 2
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Schreiben Sie das Skript</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Verwandeln Sie Ihre Ideen mit intelligentem KI-Schreiben in produktionsreife Anzeigen.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('Step2.png')} alt="Skript Schreiben" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step-card animate-fade-in-up stagger-3" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 26, 90, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(255, 26, 90, 0.15)', color: '#ff1a5a', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
                                Schritt 3
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff', fontWeight: '600' }}>Generieren Sie Ihr Video</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>Erwecken Sie alles mit atemberaubenden, realistischen UGC in Minuten zum Leben.</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <img src={getMediaUrl('step3.jpg')} alt="Video Generieren" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry Tabs Section */}
            <IndustryTabs lang="de" />

            {/* Winning Ad Replicator Section */}
            <section className="replicator-feature" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
                            border: '1px solid rgba(255, 8, 68, 0.3)',
                            borderRadius: '50px',
                            padding: '8px 20px',
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#ff0844',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '24px'
                        }}>
                            ✨ Neue Funktion
                        </div>
                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
                            <span className="gradient-text-red">Gewinner-Anzeigen</span>-Replikator
                        </h2>
                        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                            Laden Sie eine beliebige Gewinner-Anzeige hoch und replizieren Sie sie mit einem anderen KI-Schauspieler. Perfekt zum Testen neuer Gesichter bei gleichem bewährten Skript und Stil.
                        </p>
                    </div>

                    <div className="animate-fade-in-up stagger-1" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '40px',
                        maxWidth: '1100px',
                        margin: '0 auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '24px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                position: 'relative',
                                aspectRatio: '9/16',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: '#000',
                                marginBottom: '20px',
                                maxWidth: '280px',
                                width: '100%'
                            }}>
                                <video
                                    src={getMediaUrl('landing winning 1.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>
                                    Original
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                                Ihre Gewinner-Anzeige
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                Laden Sie ein beliebiges leistungsstarkes Video hoch
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            color: '#ff0844',
                            fontSize: '32px',
                            fontWeight: '800'
                        }}>
                            →
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '24px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 8, 68, 0.3)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 8, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                position: 'relative',
                                aspectRatio: '9/16',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: '#000',
                                marginBottom: '20px',
                                maxWidth: '280px',
                                width: '100%'
                            }}>
                                <video
                                    src={getMediaUrl('landing winning 2.mp4')}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    background: 'linear-gradient(135deg, #ff0844, #ff6b6b)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>
                                    Repliziert
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                                Neue Version mit KI-Schauspieler
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                Gleiches Skript, anderes Gesicht, sofortige Ergebnisse
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <Pricing lang="de" />

            {/* Testimonials Section */}
            <Testimonials lang="de" />

            {/* FAQ Section */}
            <FAQ lang="de" />

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
                            Verabschieden Sie sich von langweiligen Videos 👋
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '40px',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            lineHeight: '1.6'
                        }}>
                            Starten Sie noch heute mit AdMaker AI und erstellen Sie ansprechende UGC-Videos für TikTok, Instagram Reels und YouTube auf Autopilot.
                        </p>
                        <a
                            href="/de/anmelden"
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
                            Jetzt Starten
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
                            <p>Die #1 Plattform zur Erstellung von KI-Videoanzeigen in Minuten.</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 AdMaker AI. Alle Rechte vorbehalten.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
