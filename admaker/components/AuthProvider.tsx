'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { trackSignUp, trackLogin } from '@/lib/gtag';


interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();
    const authTracked = useRef(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);

            // Track sign_up or login event (only once per auth state change)
            if (event === 'SIGNED_IN' && session?.user && !authTracked.current) {
                authTracked.current = true;

                // Determine auth method
                const provider = session.user.app_metadata?.provider || 'email';
                const isGoogle = provider === 'google';
                const method = isGoogle ? 'google' : 'magic_link';

                // Check if this is a new user (created within last 60 seconds)
                const createdAt = new Date(session.user.created_at || 0);
                const now = new Date();
                const isNewUser = (now.getTime() - createdAt.getTime()) < 60000;

                if (isNewUser) {
                    trackSignUp(method);
                } else {
                    trackLogin(method);
                }
            }

            // Reset tracking when user signs out
            if (event === 'SIGNED_OUT') {
                authTracked.current = false;
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut: handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
