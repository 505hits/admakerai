'use client';

import Navbar from '@/components/Navbar';

export default function BlogKo() {
    return (
        <>
            <Navbar lang="ko" />
            <div style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: 'white',
                padding: '120px 20px 60px',
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
                        블로그 - AdMaker AI
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '60px' }}>
                        곧 제공 예정: AI 광고 제작에 대한 기사 및 튜토리얼
                    </p>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '60px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>🚀 개발 중</h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
                            멋진 콘텐츠를 준비하고 있습니다. 곧 다시 방문해주세요!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
