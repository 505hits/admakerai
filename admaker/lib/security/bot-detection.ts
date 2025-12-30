// Bot Detection Utility
// Detects suspicious user agents and bot-like behavior

const SUSPICIOUS_USER_AGENTS = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'python-requests',
    'python/3',
    'curl/',
    'wget/',
    'go-http-client',
    'axios/',
    'node-fetch',
    'postman',
    'insomnia',
    'httpie',
];

/**
 * Check if User-Agent appears to be from a bot/automation tool
 */
export function isSuspiciousUserAgent(userAgent: string | null): boolean {
    if (!userAgent) {
        // Missing User-Agent is suspicious
        return true;
    }

    const ua = userAgent.toLowerCase();

    // Check against known bot patterns
    return SUSPICIOUS_USER_AGENTS.some(pattern => ua.includes(pattern));
}

/**
 * Get User-Agent from request
 */
export function getUserAgent(request: Request): string | null {
    return request.headers.get('user-agent');
}

/**
 * Validate User-Agent and return result
 */
export function validateUserAgent(request: Request): {
    valid: boolean;
    userAgent: string | null;
    reason?: string;
} {
    const userAgent = getUserAgent(request);

    if (!userAgent) {
        return {
            valid: false,
            userAgent,
            reason: 'Missing User-Agent header',
        };
    }

    if (isSuspiciousUserAgent(userAgent)) {
        return {
            valid: false,
            userAgent,
            reason: 'Suspicious User-Agent detected',
        };
    }

    return {
        valid: true,
        userAgent,
    };
}
