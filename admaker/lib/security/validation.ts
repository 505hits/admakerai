// Input Validation and Sanitization Utility
import { z } from 'zod';

// Common validation schemas
export const schemas = {
    // Email validation
    email: z.string().email().max(255),

    // Script validation (for video generation)
    script: z.string()
        .min(1, 'Script cannot be empty')
        .max(500, 'Script too long (max 500 characters)')
        .refine(
            (val) => !containsSqlInjection(val),
            'Invalid characters detected'
        ),

    // Duration validation
    duration: z.number().int().min(5).max(60),

    // Image data validation
    imageData: z.string()
        .refine(
            (val) => val.startsWith('data:image/'),
            'Invalid image format'
        )
        .refine(
            (val) => {
                const base64 = val.replace(/^data:image\/\w+;base64,/, '');
                const sizeInBytes = (base64.length * 3) / 4;
                const sizeInMB = sizeInBytes / (1024 * 1024);
                return sizeInMB <= 10;
            },
            'Image too large (max 10MB)'
        ),

    // User ID validation
    userId: z.string().uuid(),

    // Metadata validation for Stripe
    stripeMetadata: z.object({
        userId: z.string().uuid(),
        videoCredits: z.string().regex(/^\d+$/),
        actorCredits: z.string().regex(/^\d+$/),
        replicatorCredits: z.string().regex(/^\d+$/),
    }),
};

// SQL Injection detection
function containsSqlInjection(input: string): boolean {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
        /(--|\;|\/\*|\*\/)/g,
        /(\bOR\b.*=.*)/gi,
        /(\bAND\b.*=.*)/gi,
        /(UNION.*SELECT)/gi,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
}

// XSS prevention - sanitize HTML
export function sanitizeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Validate file type by magic numbers (not just extension)
export function validateFileType(buffer: Buffer, allowedTypes: string[]): boolean {
    const magicNumbers: { [key: string]: string } = {
        'image/jpeg': 'ffd8ff',
        'image/png': '89504e47',
        'image/webp': '52494646',
        'image/gif': '47494638',
    };

    const header = buffer.toString('hex', 0, 4);

    return allowedTypes.some(type => {
        const magic = magicNumbers[type];
        return magic && header.startsWith(magic);
    });
}

// Sanitize filename to prevent path traversal
export function sanitizeFilename(filename: string): string {
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_') // Remove special chars
        .replace(/\.{2,}/g, '_') // Remove .. sequences
        .replace(/^\./, '_') // Remove leading dot
        .substring(0, 255); // Limit length
}

// Validate and parse request body with schema
export async function validateRequest<T>(
    request: Request,
    schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
    try {
        const body = await request.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            const errors = result.error.issues.map((e: z.ZodIssue) => e.message).join(', ');
            return { success: false, error: errors };
        }

        return { success: true, data: result.data };
    } catch (error) {
        return { success: false, error: 'Invalid request body' };
    }
}

// Check for common attack patterns
export function containsMaliciousContent(input: string): boolean {
    const maliciousPatterns = [
        /<script/gi,
        /javascript:/gi,
        /on\w+\s*=/gi, // Event handlers like onclick=
        /eval\(/gi,
        /expression\(/gi,
        /vbscript:/gi,
        /data:text\/html/gi,
    ];

    return maliciousPatterns.some(pattern => pattern.test(input));
}

// Validate URL
export function isValidUrl(url: string, allowedDomains?: string[]): boolean {
    try {
        const parsed = new URL(url);

        // Only allow http and https
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return false;
        }

        // Check allowed domains if specified
        if (allowedDomains && !allowedDomains.includes(parsed.hostname)) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}
