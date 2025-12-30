import { updateSession } from '@/lib/supabase/middleware'
import { requireCsrfToken } from '@/lib/security/csrf'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
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

