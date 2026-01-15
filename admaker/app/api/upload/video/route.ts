import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 Configuration (from lib/r2-upload.ts)
const R2_ACCOUNT_ID = '1defcdb7b33d256403a1c29fc50d14b4';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = 'admakerai-media';
const R2_PUBLIC_URL = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev';

// Create R2 client
let r2Client: S3Client | null = null;

function getR2Client() {
    if (!r2Client) {
        if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
            throw new Error('Missing R2 credentials');
        }

        r2Client = new S3Client({
            region: 'auto',
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: R2_ACCESS_KEY_ID,
                secretAccessKey: R2_SECRET_ACCESS_KEY,
            },
        });
    }
    return r2Client;
}

import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';

// ... existing code ...

export async function POST(request: NextRequest) {
    try {
        console.log('📹 Video upload request received');

        // Rate limiting for uploads
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

        // Authentication Check
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.warn('❌ Unauthorized attempt to upload video');
            return NextResponse.json(
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        console.log(`📹 File received: ${file.name}, size: ${file.size}, type: ${file.type}`);

        // Validate file type
        const validTypes = ['video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload MP4, MOV, MKV, or WebM' },
                { status: 400 }
            );
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log(`📹 Buffer created: ${buffer.length} bytes`);

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = file.name.split('.').pop() || 'mp4';
        const fileName = `winning-ads/${timestamp}-${randomString}.${extension}`;

        console.log(`📹 Uploading to R2: ${fileName}`);

        // Upload to R2
        const client = getR2Client();
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });

        await client.send(command);

        const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
        console.log(`✅ Video uploaded successfully: ${publicUrl}`);

        return NextResponse.json({ url: publicUrl });

    } catch (error: any) {
        console.error('❌ Video upload error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: error.message || 'Failed to upload video' },
            { status: 500 }
        );
    }
}
