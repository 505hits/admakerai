'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoAgent from '@/components/VideoAgent';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import TypedText from '@/components/TypedText';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const tiltImage = document.querySelector('.feature-image-tilt img') as HTMLElement;
      if (!tiltImage) return;

      const rect = tiltImage.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const imageCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Calculate distance from center (-1 to 1, where 0 is centered)
      const distanceFromCenter = (imageCenter - viewportCenter) / viewportCenter;

      // Only apply tilt when image is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate rotation based on distance from center
        const rotateY = distanceFromCenter * 15; // Max 15 degrees
        const rotateX = distanceFromCenter * -5; // Max 5 degrees
        const scale = 1 - Math.abs(distanceFromCenter) * 0.05; // Slight scale effect

        tiltImage.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
        tiltImage.style.transition = 'transform 0.1s ease-out';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />

      {/* Examples Slider Section */}
      <section className="examples-slider">
        <div className="slider-track">
          {[...Array(18)].map((_, i) => {
            const videoUrls = [
              '/video  beauté.mp4',
              '/video  bleu.mp4',
              '/video canette.mp4',
              '/video podcast.mp4',
              '/video podcast 2.mp4',
              '/video sportif.mp4'
            ];

            const titles = [
              'Beauty Ad',
              'Product Launch',
              'Beverage Campaign',
              'UGC Podcast',
              'Customer Testimonial',
              'Fitness & Sport'
            ];

            const stats = [
              'Conversion +250%',
              '10M+ vues',
              'ROI x5',
              'Engagement +180%',
              'CTR +320%',
              'Reach x3'
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
          <div className="section-header">
            <h2>Get the perfect AI videos for your <TypedText /></h2>
            <p>Everything you need to create viral ads</p>
          </div>

          {/* Feature Row 1 - Image Right */}
          <div className="feature-row">
            <div className="feature-content">
              <h3><span className="gradient-text-red">Ultra-Fast</span> Generation</h3>
              <p>Create professional video ads in less than 2 minutes. Our advanced AI transforms your script into viral content instantly.</p>
              <ul className="feature-list">
                <li>✓ Generate videos in under 2 minutes</li>
                <li>✓ AI-powered script optimization</li>
                <li>✓ Instant viral content creation</li>
              </ul>
            </div>
            <div className="feature-image feature-image-tilt">
              <img src="/ultra-fast-generation.jpg" alt="UGC Video Examples" />
            </div>
          </div>

          {/* Feature Row 2 - Image Left */}
          <div className="feature-row feature-row-reverse">
            <div className="feature-image">
              <img src="/ugc-phones.png" alt="Realistic AI Avatars" />
            </div>
            <div className="feature-content">
              <h3><span className="gradient-text-red">Realistic</span> Avatars</h3>
              <p>Choose from dozens of ultra-realistic AI avatars. Customize appearance, voice, and style to perfectly match your brand.</p>
              <ul className="feature-list">
                <li>✓ 50+ ultra-realistic AI avatars</li>
                <li>✓ Customizable voice and style</li>
                <li>✓ Perfect brand matching</li>
              </ul>
            </div>
          </div>

          {/* Feature Row 3 - Image Right */}
          <div className="feature-row">
            <div className="feature-content">
              <h3><span className="gradient-text-red">Guaranteed</span> Performance</h3>
              <p>Our clients see an average of +250% conversion. AI automatically optimizes every element to maximize engagement and results.</p>
              <ul className="feature-list">
                <li>✓ Average +250% conversion increase</li>
                <li>✓ AI-optimized for engagement</li>
                <li>✓ Proven results across industries</li>
              </ul>
            </div>
            <div className="feature-image">
              <img src="/ugc-phones.png" alt="Performance Analytics" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Agent Section */}
      <VideoAgent />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="cta-content" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2>Ready to create ads <span className="gradient-text-red">that convert</span>?</h2>
              <p>Join over 10,000 creators using AdMaker AI to generate millions of views</p>
              <a href="#" className="btn-primary btn-large">
                Start for free
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img
                src="/video-demo.jpg"
                alt="Video Demo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '16px'
                }}
              />
            </div>
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
              <p>The #1 platform to create AI video ads in minutes.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 AdMaker AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
