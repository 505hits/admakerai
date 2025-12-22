import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
        const { imageData } = await request.json();

        if (!imageData) {
            return NextResponse.json(
                { error: 'No image data provided' },
                { status: 400 }
            );
        }

        // Convert base64 to buffer first
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

        // Validate base64 size (should be < 10MB)
        const sizeInBytes = (base64Data.length * 3) / 4;
        const sizeInMB = sizeInBytes / (1024 * 1024);

        if (sizeInMB > 10) {
            return NextResponse.json(
                { error: `Image too large (${sizeInMB.toFixed(1)}MB). Maximum size is 10MB.` },
                { status: 413 } // Payload Too Large
            );
        }
        const buffer = Buffer.from(base64Data, 'base64');

        // Generate unique filename
        const filename = `product-${Date.now()}.jpg`;
        const key = `products/${filename}`;

        // Upload to R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: 'image/jpeg',
            })
        );

        // Return public URL
        const publicUrl = `${R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('Product image upload error:', error);

        // Handle specific error types
        if (error.message?.includes('size') || error.message?.includes('large')) {
            return NextResponse.json(
                { error: 'Image size exceeds limit. Please use a smaller image.' },
                { status: 413 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to upload image' },
            { status: 500 }
        );
    }
}
