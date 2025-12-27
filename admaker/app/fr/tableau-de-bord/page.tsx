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
                // Redirect to English dashboard
                // Full French translation coming soon
                router.push('/dashboard');
            }
        };
        checkAuthAndRedirect();
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: '#fff'
        }}>
            <p>Chargement...</p>
        </div>
    );
}
