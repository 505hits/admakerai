'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Component to refresh the session after OAuth redirect
 * This ensures client-side session state is synced with server-side cookies
 */
export default function SessionRefresh() {
    useEffect(() => {
        const refreshSession = async () => {
            const supabase = createClient();

            // Force a session refresh to sync client state with server cookies
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                console.log('✅ Session refreshed on client:', session.user.id);
                // Trigger a re-render of components listening to auth state
                window.dispatchEvent(new Event('supabase.auth.statechange'));
            } else if (error) {
                console.error('❌ Session refresh failed:', error);
            } else {
                console.log('⚠️ No session found after refresh');
            }
        };

        refreshSession();
    }, []);

    return null; // This component doesn't render anything
}
