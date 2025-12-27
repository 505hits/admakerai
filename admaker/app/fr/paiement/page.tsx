'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Pricing from '@/components/Pricing';
import styles from '../../payment/Payment.module.css';

export default function PaymentPageFr() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/fr/connexion');
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className={styles.paymentContainer}>
            <Pricing lang="fr" />
        </div>
    );
}
