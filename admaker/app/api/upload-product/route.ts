import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
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

        // Convert base64 to buffer
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Generate unique filename
        const filename = `product-${Date.now()}.jpg`;
        const key = `products/${filename}`;

        // Upload to R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: buffer,
                ContentType: 'image/jpeg',
            })
        );

        // Return public URL
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('Product image upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload image' },
            { status: 500 }
        );
    }
}
