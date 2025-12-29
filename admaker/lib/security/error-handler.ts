// Error Handler Utility - Secure error responses
export interface SecureError {
    message: string;
    statusCode: number;
    code?: string;
}

// Log detailed errors server-side, return generic errors to client
export function handleError(error: unknown, context?: string): SecureError {
    // Log full error server-side
    console.error(`[Security Error] ${context || 'Unknown context'}:`, error);

    // Determine error type and return appropriate response
    if (error instanceof ValidationError) {
        return {
            message: error.message,
            statusCode: 400,
            code: 'VALIDATION_ERROR',
        };
    }

    if (error instanceof AuthenticationError) {
        return {
            message: 'Authentication required',
            statusCode: 401,
            code: 'UNAUTHORIZED',
        };
    }

    if (error instanceof AuthorizationError) {
        return {
            message: 'Insufficient permissions',
            statusCode: 403,
            code: 'FORBIDDEN',
        };
    }

    if (error instanceof RateLimitError) {
        return {
            message: 'Too many requests. Please try again later',
            statusCode: 429,
            code: 'RATE_LIMIT_EXCEEDED',
        };
    }

    // Default: Don't expose internal errors
    return {
        message: 'An error occurred. Please try again',
        statusCode: 500,
        code: 'INTERNAL_ERROR',
    };
}

// Custom error classes
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends Error {
    constructor(message: string = 'Authentication required') {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends Error {
    constructor(message: string = 'Insufficient permissions') {
        super(message);
        this.name = 'AuthorizationError';
    }
}

export class RateLimitError extends Error {
    constructor(message: string = 'Rate limit exceeded') {
        super(message);
        this.name = 'RateLimitError';
    }
}

// Sanitize error for client response
export function sanitizeErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        // Only return safe error messages
        const safeErrors = [
            'Validation',
            'Authentication',
            'Authorization',
            'Rate limit',
            'Not found',
            'Invalid',
        ];

        if (safeErrors.some(safe => error.message.includes(safe))) {
            return error.message;
        }
    }

    return 'An error occurred';
}
