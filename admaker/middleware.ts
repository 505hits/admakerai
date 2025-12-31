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
    }

    // Security: CSRF Protection for API routes
    // Exclude webhooks as they have their own signature validation
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const isWebhook = request.nextUrl.pathname.includes('/webhook');

        if (!isWebhook) {
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
        }
    }

    // Security: Enable Supabase authentication
    // This validates user sessions and refreshes tokens
    const response = await updateSession(request)

    // Add CSRF token to response if we generated a new one
    if (newToken) {
        response.cookies.set('csrf_token', newToken, {
            httpOnly: true,
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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
