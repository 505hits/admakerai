import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/payment'

    // Handle Magic Link (email OTP)
    if (token_hash && type) {
        console.log('🔍 [Auth Callback] Verify OTP:', { type, token_hash_present: !!token_hash });
        const supabase = await createClient()
        const { error } = await supabase.auth.verifyOtp({
            type: type as any,
            token_hash,
        })

        if (!error) {
            console.log('✅ [Auth Callback] OTP verified successfully');
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            console.error('❌ [Auth Callback] OTP verification failed:', error);
        }
    }

    // Handle OAuth callback
    if (code) {
        console.log('🔍 [Auth Callback] Exchange Code:', { code_present: !!code });
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            console.log('✅ [Auth Callback] Code exchanged successfully');
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
            console.error('❌ [Auth Callback] Code exchange failed:', error);
        }
    }

    console.warn('⚠️ [Auth Callback] No valid auth parameters or verification failed, redirecting to login');
    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
