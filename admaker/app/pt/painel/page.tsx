'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PainelPt() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#0a0a0a',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
                O painel está disponível apenas em inglês no momento
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>
                Você será redirecionado para o painel em inglês em 3 segundos...
            </p>
            <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTop: '3px solid #ff0844',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
