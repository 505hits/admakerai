// Webhook Validation Utility
// Provides simple secret token validation for webhooks

/**
 * Verify webhook secret from URL query parameter
 */
export function verifyWebhookSecret(url: string, expectedSecret: string | undefined): boolean {
    if (!expectedSecret) {
        console.error('❌ Webhook secret not configured');
        return false;
    }

    const urlObj = new URL(url);
    const providedSecret = urlObj.searchParams.get('secret');

    if (!providedSecret) {
        console.warn('⚠️ Webhook called without secret parameter');
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(providedSecret, expectedSecret);
}

/**
 * Timing-safe string comparison
 */
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

/**
 * Generate a random webhook secret (for documentation/setup)
 */
export function generateWebhookSecret(): string {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Extract secret from request URL
 */
export function getSecretFromRequest(request: Request): string | null {
    const url = new URL(request.url);
    return url.searchParams.get('secret');
}
