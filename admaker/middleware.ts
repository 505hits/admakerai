import { updateSession } from '@/lib/supabase/middleware'
import { requireCsrfToken } from '@/lib/security/csrf'
import { type NextRequest, NextResponse } from 'next/server'

// Generate CSRF token using Web Crypto API (Edge Runtime compatible)
function generateCsrfToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request: NextRequest) {
    // Check if CSRF token exists in cookies
    const existingToken = request.cookies.get('csrf_token');
    let newToken: string | null = null;

    // Generate token if it doesn't exist
    if (!existingToken) {
        newToken = generateCsrfToken();
        console.log('🔑 Generated new CSRF token');
    }

    // Security: CSRF Protection for API routes
    // Exclude webhooks as they have their own signature validation
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const isWebhook = request.nextUrl.pathname.includes('/webhook');

        if (!isWebhook) {
            // Skip CSRF check if no token exists yet (first time user visits)
            // This allows the cookie to be generated
            if (existingToken) {
                const csrfCheck = await requireCsrfToken(request);
                if (!csrfCheck.valid) {
                    console.warn('❌ CSRF validation failed:', {
                        path: request.nextUrl.pathname,
                        error: csrfCheck.error,
                        hasToken: !!existingToken,
                        headerToken: request.headers.get('x-csrf-token') ? 'present' : 'missing'
                    });
                    return NextResponse.json(
                        { error: csrfCheck.error || 'CSRF validation failed' },
                        { status: 403 }
                    );
                }
            } else {
                console.log('⏭️ Skipping CSRF validation - no token exists yet, will generate one');
            }
        }
    }

    // Skip Supabase session validation for webhooks
    // Webhooks are external callbacks that don't have user sessions
    const isWebhook = request.nextUrl.pathname.includes('/webhook');

    if (isWebhook) {
        console.log('🪝 Webhook detected - skipping Supabase session validation');
        // Create a simple NextResponse for webhooks without session validation
        const response = NextResponse.next();

        // Still set CSRF token if needed (not required for webhooks but doesn't hurt)
        if (newToken) {
            console.log('🍪 Setting CSRF cookie on response');
            response.cookies.set('csrf_token', newToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        return response;
    }

    // Security: Enable Supabase authentication for non-webhook routes
    // This validates user sessions and refreshes tokens
    const response = await updateSession(request)

    // IMPORTANT: Add CSRF token to the Supabase response (not a new response)
    // We must set it on the response returned by updateSession to ensure it's sent to client
    if (newToken) {
        console.log('🍪 Setting CSRF cookie on response');
        response.cookies.set('csrf_token', newToken, {
            httpOnly: false, // Must be false so JavaScript can read it for the x-csrf-token header
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)',
    ],
}
