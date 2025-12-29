// File Validation Utility
import { validateFileType, sanitizeFilename } from './validation';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_DIMENSION = 4096; // 4K max

interface FileValidationResult {
    valid: boolean;
    error?: string;
    sanitizedFilename?: string;
}

// Validate uploaded image file
export function validateImageFile(
    buffer: Buffer,
    filename: string,
    mimeType: string
): FileValidationResult {
    // Check file size
    if (buffer.length > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        };
    }

    // Check MIME type
    if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
        return {
            valid: false,
            error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed',
        };
    }

    // Validate file magic numbers (prevent fake extensions)
    if (!validateFileType(buffer, ALLOWED_IMAGE_TYPES)) {
        return {
            valid: false,
            error: 'File content does not match its extension',
        };
    }

    // Sanitize filename
    const sanitized = sanitizeFilename(filename);

    return {
        valid: true,
        sanitizedFilename: sanitized,
    };
}

// Validate base64 image data
export function validateBase64Image(base64Data: string): FileValidationResult {
    // Extract MIME type
    const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
        return {
            valid: false,
            error: 'Invalid base64 image format',
        };
    }

    const mimeType = matches[1];
    const data = matches[2];

    // Check MIME type
    if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
        return {
            valid: false,
            error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed',
        };
    }

    // Check size
    const sizeInBytes = (data.length * 3) / 4;
    if (sizeInBytes > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `Image too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        };
    }

    // Convert to buffer for magic number validation
    try {
        const buffer = Buffer.from(data, 'base64');

        if (!validateFileType(buffer, ALLOWED_IMAGE_TYPES)) {
            return {
                valid: false,
                error: 'Image content does not match declared type',
            };
        }

        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            error: 'Invalid base64 encoding',
        };
    }
}

// Check for potentially malicious file content
export function scanForMaliciousContent(buffer: Buffer): boolean {
    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 1024));

    // Check for script tags, PHP code, etc.
    const maliciousPatterns = [
        /<\?php/i,
        /<script/i,
        /eval\(/i,
        /exec\(/i,
        /system\(/i,
        /passthru\(/i,
        /shell_exec\(/i,
    ];

    return maliciousPatterns.some(pattern => pattern.test(content));
}

// Generate safe random filename
export function generateSafeFilename(extension: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}.${extension}`;
}

// Get file extension from MIME type
export function getExtensionFromMimeType(mimeType: string): string {
    const extensions: { [key: string]: string } = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
    };

    return extensions[mimeType] || 'bin';
}
