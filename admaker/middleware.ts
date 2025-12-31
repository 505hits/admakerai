import { updateSession } from '@/lib/supabase/middleware'
import { requireCsrfToken, generateCsrfToken } from '@/lib/security/csrf'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    // Get or create CSRF token for this session
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const existingToken = cookieStore.get('csrf_token');

    // Generate token if it doesn't exist
    if (!existingToken) {
        const newToken = generateCsrfToken();
        // We'll set this token in the response below
        request.headers.set('x-new-csrf-token', newToken);
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
    const newToken = request.headers.get('x-new-csrf-token');
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

