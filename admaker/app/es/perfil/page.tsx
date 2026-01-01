'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import styles from '../../profile/Profile.module.css';

interface UserProfile {
    id: string;
    credits: number;
    subscription_plan: string;
    subscription_status: string;
    subscription_end_date: string | null;
}

export default function PerfilPage() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        console.log('🔍 [Perfil] Iniciando carga de datos de usuario...');

        // Timeout de seguridad para evitar carga infinita (reducido a 3s)
        const timeoutId = setTimeout(() => {
            console.warn('⚠️ [Perfil] La carga tardó más de 3 segundos. Forzando fin de carga.');
            setLoading(false);
        }, 3000);

        try {
            // Get current user
            console.log('🔍 [Perfil] Obteniendo usuario de Supabase...');
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                console.log('🔍 [Perfil] Sin usuario o error:', userError);
                clearTimeout(timeoutId);
                setLoading(false);
                router.push('/es/iniciar-sesion');
                return;
            }

            console.log('🔍 [Perfil] Usuario encontrado:', user.email);
            setUserEmail(user.email || '');

            // Get user profile from database with explicit field selection
            console.log('🔍 [Perfil] Buscando datos de perfil en DB para ID:', user.id);
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, credits, actor_credits, subscription_plan, subscription_status, subscription_end_date, created_at, updated_at')
                .eq('id', user.id)
                .maybeSingle();

            console.log('🔍 [Perfil] Datos de perfil brutos recibidos:', profileData);
            console.log('🔍 [Perfil] Valor de créditos:', profileData?.credits);
            console.log('🔍 [Perfil] Valor de créditos de actor:', profileData?.actor_credits);

            if (profileError) {
                console.error('🔍 [Perfil] Error de perfil:', profileError);
                clearTimeout(timeoutId);
                setLoading(false);
                return;
            }

            if (!profileData) {
                console.log('🔍 [Perfil] No se encontró perfil, intentando crear perfil por defecto');
                // Create default profile if doesn't exist
                const { data: newProfile, error: insertError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: user.id,
                        credits: 0,
                        actor_credits: 0,
                        subscription_plan: 'free',
                        subscription_status: 'inactive'
                    }])
                    .select()
                    .single();

                if (insertError) {
                    console.error('🔍 [Perfil] Error al crear perfil por defecto:', insertError);
                } else {
                    console.log('🔍 [Perfil] Perfil por defecto creado:', newProfile);
                    setProfile(newProfile);
                }
            } else {
                console.log('🔍 [Perfil] Perfil cargado exitosamente');
                console.log('🔍 [Perfil] Estableciendo perfil con créditos:', profileData.credits);
                setProfile(profileData);
            }
        } catch (error) {
            console.error('🔍 [Perfil] Error crítico en loadUserData:', error);
        } finally {
            console.log('🔍 [Perfil] Proceso de carga finalizado, limpiando timeout y estado.');
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleUpgrade = () => {
        router.push('/es/pago');
    };

    const handleCancelSubscription = async () => {
        if (!confirm('¿Estás seguro de que quieres cancelar tu suscripción? Perderás el acceso a las funciones premium.')) {
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('profiles')
                .update({
                    subscription_status: 'cancelled',
                    subscription_plan: 'free'
                })
                .eq('id', user.id);

            if (error) throw error;

            alert('Tu suscripción ha sido cancelada. Mantendrás el acceso hasta el final del período pagado.');
            loadUserData(); // Reload data
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Error al cancelar la suscripción');
        }
    };

    if (loading) {
        return (
            <>
                <Navbar lang="es" />
                <div className={styles.profileContainer}>
                    <div className="container">
                        <div className={styles.loading}>Cargando...</div>
                    </div>
                </div>
            </>
        );
    }

    const planNames: { [key: string]: string } = {
        'free': 'Gratis',
        'startup': 'Startup',
        'growth': 'Growth',
        'pro': 'Pro'
    };

    const planName = planNames[profile?.subscription_plan || 'free'] || 'Gratis';
    const isActive = profile?.subscription_status === 'active';

    return (
        <>
            <Navbar lang="es" />
            <div className={styles.profileContainer}>
                <div className="container">
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <h1 className={styles.pageTitle}>Mi Cuenta</h1>
                            <span className={`${styles.planBadge} ${styles.large} ${isActive ? styles.active : ''}`}>
                                {planName}
                            </span>
                        </div>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 6l7-3 7 3v6c0 4-7 8-7 8s-7-4-7-8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.value}>{userEmail}</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Créditos</span>
                                    <span className={styles.value}>{profile?.credits || 0} créditos</span>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <div>
                                    <span className={styles.label}>Estado</span>
                                    <span className={styles.value}>
                                        {isActive ? '✅ Activo' : '❌ Inactivo'}
                                    </span>
                                </div>
                            </div>

                            {profile?.subscription_end_date && (
                                <div className={styles.infoItem}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <div>
                                        <span className={styles.label}>Renovación</span>
                                        <span className={styles.value}>
                                            {new Date(profile.subscription_end_date).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.actionsGrid}>
                            <button onClick={handleUpgrade} className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                                <span>Mejorar Plan</span>
                            </button>

                            <a href="/dashboard" className={styles.actionCard}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Panel</span>
                            </a>

                            {isActive && (
                                <button onClick={handleCancelSubscription} className={`${styles.actionCard} ${styles.danger}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Cancelar suscripción</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

