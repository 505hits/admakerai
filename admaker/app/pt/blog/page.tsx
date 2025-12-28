'use client';

import Navbar from '@/components/Navbar';

export default function BlogPt() {
    return (
        <>
            <Navbar lang="pt" />
            <div style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: 'white',
                padding: '120px 20px 60px',
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
                        Blog - AdMaker AI
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '60px' }}>
                        Em breve: Artigos e tutoriais sobre criação de anúncios com IA
                    </p>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '60px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>🚀 Em Construção</h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
                            Estamos preparando conteúdo incrível para você. Volte em breve!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
