// Rate Limiting Utility
// Implements IP-based rate limiting with sliding window algorithm

interface RateLimitConfig {
    windowMs: number; // Time window in milliseconds
    maxRequests: number; // Max requests per window
}

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach(key => {
        if (store[key].resetTime < now) {
            delete store[key];
        }
    });
}, 5 * 60 * 1000);

export const rateLimitConfigs = {
    // Authentication endpoints - strict limits
    auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes

    // API endpoints - moderate limits
    api: { windowMs: 15 * 60 * 1000, maxRequests: 100 }, // 100 requests per 15 minutes

    // File uploads - strict limits
    upload: { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 requests per hour

    // Script enhancement - moderate limits (costs money)
    enhance: { windowMs: 60 * 60 * 1000, maxRequests: 30 }, // 30 requests per hour
};

export function rateLimit(identifier: string, config: RateLimitConfig): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
} {
    const now = Date.now();
    const key = identifier;

    // Initialize or get existing record
    if (!store[key] || store[key].resetTime < now) {
        store[key] = {
            count: 0,
            resetTime: now + config.windowMs,
        };
    }

    const record = store[key];

    // Check if limit exceeded
    if (record.count >= config.maxRequests) {
        return {
            success: false,
            limit: config.maxRequests,
            remaining: 0,
            reset: record.resetTime,
        };
    }

    // Increment counter
    record.count++;

    return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - record.count,
        reset: record.resetTime,
    };
}

export function getRateLimitHeaders(result: ReturnType<typeof rateLimit>) {
    return {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': new Date(result.reset).toISOString(),
    };
}

// Helper to get client IP from request
export function getClientIp(request: Request): string {
    // Check various headers for IP (Vercel, Cloudflare, etc.)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    // Fallback to a default (shouldn't happen in production)
    return 'unknown';
}
