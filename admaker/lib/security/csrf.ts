// CSRF Protection Utility
import { cookies } from 'next/headers';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Generate a new CSRF token using Web Crypto API (Edge Runtime compatible)
export function generateCsrfToken(): string {
    const array = new Uint8Array(CSRF_TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Set CSRF token in cookie
export async function setCsrfToken(): Promise<string> {
    const token = generateCsrfToken();
    const cookieStore = await cookies();

    cookieStore.set(CSRF_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    });

    return token;
}

// Validate CSRF token from request
export async function validateCsrfToken(request: Request): Promise<boolean> {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken) {
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(cookieToken, headerToken);
}

// Timing-safe string comparison
function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
}

// Get CSRF token for client-side use
export async function getCsrfToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(CSRF_COOKIE_NAME)?.value || null;
}

// Middleware to check CSRF for state-changing operations
export async function requireCsrfToken(request: Request): Promise<{
    valid: boolean;
    error?: string;
}> {
    // Skip CSRF check for GET, HEAD, OPTIONS
    const method = request.method.toUpperCase();
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        return { valid: true };
    }

    // Skip CSRF check for webhooks (they have signature verification)
    const url = new URL(request.url);
    if (url.pathname.includes('/webhook')) {
        return { valid: true };
    }

    const isValid = await validateCsrfToken(request);

    if (!isValid) {
        return {
            valid: false,
            error: 'Invalid or missing CSRF token',
        };
    }

    return { valid: true };
}
