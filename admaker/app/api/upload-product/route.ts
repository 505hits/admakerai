import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { validateBase64Image, generateSafeFilename, getExtensionFromMimeType } from '@/lib/security/file-validation';
import { handleError, ValidationError } from '@/lib/security/error-handler';

// Configure route to accept larger payloads
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

// Cloudflare R2 Configuration (matching r2-upload.ts)
const R2_ACCOUNT_ID = '1defcdb7b33d256403a1c29fc50d14b4';
const R2_BUCKET_NAME = 'admakerai-media';
const R2_PUBLIC_URL = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev';

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: NextRequest) {
    try {
        // Rate limiting - 10 uploads per hour per IP
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.upload);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many upload requests. Please try again later' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        const { imageData } = await request.json();

        if (!imageData) {
            throw new ValidationError('No image data provided');
        }

        // Validate image data
        const validation = validateBase64Image(imageData);
        if (!validation.valid) {
            throw new ValidationError(validation.error || 'Invalid image');
        }

        // Convert base64 to buffer
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Extract MIME type
        const mimeTypeMatch = imageData.match(/^data:([^;]+);base64,/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
        const extension = getExtensionFromMimeType(mimeType);

        // Generate safe filename
        const filename = generateSafeFilename(extension);
        const key = `products/${filename}`;

        // Upload to R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
            })
        );

        // Return public URL
        const publicUrl = `${R2_PUBLIC_URL}/${key}`;

        return NextResponse.json(
            { url: publicUrl },
            { headers: getRateLimitHeaders(rateLimitResult) }
        );
    } catch (error: unknown) {
        console.error('Product image upload error:', error);
        const secureError = handleError(error, 'upload-product');

        return NextResponse.json(
            { error: secureError.message },
            { status: secureError.statusCode }
        );
    }
}
