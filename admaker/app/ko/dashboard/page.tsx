'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function DashboardKo() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <Navbar lang="ko" />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                color: 'white',
                padding: '20px',
                textAlign: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
                        대시보드는 아직 한국어로 제공되지 않습니다
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        영어 버전으로 리디렉션됩니다...
                    </p>
                </div>
            </div>
        </>
    );
}
