import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoAgent from '@/components/VideoAgent';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import TypedText from '@/components/TypedText';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Examples Slider Section */}
      <section className="examples-slider">
        <div className="slider-track">
          {[...Array(16)].map((_, i) => {
            const videoUrls = [
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/2e80dfc7-cd02-4c0f-a01b-bc1bc085ee41/ebf4353a-33f1-45e6-9bf5-d35d8061f5cf.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiJlYmY0MzUzYS0zM2YxLTQ1ZTYtOWJmNS1kMzVkODA2MWY1Y2YiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.DvlTQGXhM9s6WNJvdUGzIxsyF5XE-GaqpBuHTMWH8ZI',
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/6e9afed9-b5ca-45b6-b670-9826a28e9ec0/445eb43a-99cd-4bb3-aea9-d6a1a5b47c27.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiI0NDVlYjQzYS05OWNkLTRiYjMtYWVhOS1kNmExYTViNDdjMjciLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.xa92GhT9XJuZBpnEHRnixzjg0AukpuGUnIr65xC16Xg',
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/d4703dc3-e8b0-4566-b042-5c519f01d631/608c83c6-21a5-428c-82f7-606e491776b3.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiI2MDhjODNjNi0yMWE1LTQyOGMtODJmNy02MDZlNDkxNzc2YjMiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.1cA4KMF285WNNsWTqgRmdBFByEok4n1DzxCTHzQLd-w',
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/9c8e2e6e-0a59-4365-b19a-57dbb79ac758/a9fc1f5b-45f6-4828-b388-2b4d803464c7.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiJhOWZjMWY1Yi00NWY2LTQ4MjgtYjM4OC0yYjRkODAzNDY0YzciLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.OZ7tgBf17YLSocmYkIFBWQS6zQ_qmRkSqNG-ZRV5vQg',
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/48fb8479-2a78-4cf0-bb57-9e4e080a3204/a0e9c8e5-9121-4053-b5c3-d95ba5706ceb.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiJhMGU5YzhlNS05MTIxLTQwNTMtYjVjMy1kOTViYTU3MDZjZWIiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.XMkDosLr-ndVQzaw5OJtuybLLuVsn0wqMM6juYxtS-o',
              'https://cdn.qwenlm.ai/output/5e0d7578-c529-44b2-a205-ef74b9ebf285/i2v/a8f66839-9000-4419-822b-dea41b33d8b0/1c53651d-4df8-4b80-b684-4c85389541df.mp4?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNWUwZDc1NzgtYzUyOS00NGIyLWEyMDUtZWY3NGI5ZWJmMjg1IiwicmVzb3VyY2VfaWQiOiIxYzUzNjUxZC00ZGY4LTRiODAtYjY4NC00Yzg1Mzg5NTQxZGYiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.B4aLXf8wfe_h7THahmxuYM4j3GYXxxePenf-JNX4kO8'
            ];

            const titles = ['Podcast Ad', 'Product Demo', 'Brand Story', 'Testimonial', 'Lifestyle Ad', 'Product Launch'];
            const stats = ['Engagement +400%', 'Conversion +350%', 'ROI x6', 'Trust +500%', 'Views +600%', 'Reach +800%'];

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
            <div className="feature-image">
              <img src="/ugc-phones.png" alt="UGC Video Examples" />
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
