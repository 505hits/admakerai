'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPageFr() {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/fr/connexion');
            } else {
                // Redirect to English dashboard (full translation coming soon)
                router.push('/dashboard');
            }
        };
        checkAuthAndRedirect();
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: '#fff',
            padding: '40px 20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Redirection vers le tableau de bord...</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '500px' }}>
                L'interface du tableau de bord est actuellement en anglais. La traduction française complète arrive bientôt !
            </p>
        </div>
    );
}
