import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/payment'

    console.log('🔄 Auth Callback triggered', { type, hasCode: !!code, next });

    // Handle Magic Link (email OTP)
    if (token_hash && type) {
        const supabase = await createClient()
        const { error } = await supabase.auth.verifyOtp({
            type: type as any,
            token_hash,
        })

        if (!error) {
            console.log('✅ OTP Verified successfully');
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            console.error('❌ OTP Verification failed:', error);
        }
    }

    // Handle OAuth callback
    if (code) {
        const supabase = await createClient()

        console.log('🔄 Exchanging OAuth code for session...');
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data?.session) {
            console.log('✅ Session established for user:', data.user?.id);

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            console.error('❌ Code exchange failed:', error);
            // Redirect to login with specific error
            return NextResponse.redirect(`${origin}/login?error=oauth_exchange_failed`)
        }
    }

    // return the user to an error page with instructions
    console.warn('⚠️ Invalid auth callback parameters');
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
