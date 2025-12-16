import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 Configuration
const R2_ACCOUNT_ID = '1defcdb7b33d256403a1c29fc50d14b4';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '170995158ee7d1a859e96c903dfef11f';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'f22849b2e2a591517f2680cc8021d7e0a7ef3ade6dca6732e67ed236d0fefe51';
const R2_BUCKET_NAME = 'admakerai-media';
const R2_PUBLIC_URL = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev';

// Create S3 client configured for Cloudflare R2
const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

/**
 * Upload a video to Cloudflare R2
 * @param videoBuffer - The video file buffer
 * @param fileName - The name to save the file as (e.g., 'videos/task-id.mp4')
 * @returns The public URL of the uploaded video
 */
export async function uploadVideoToR2(
    videoBuffer: Buffer,
    fileName: string
): Promise<string> {
    try {
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: videoBuffer,
            ContentType: 'video/mp4',
        });

        await r2Client.send(command);

        // Return the public URL
        const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
        console.log(`✅ Video uploaded to R2: ${publicUrl}`);
        return publicUrl;
    } catch (error) {
        console.error('❌ Error uploading to R2:', error);
        throw error;
    }
}

/**
 * Download a video from a URL and return as buffer
 * @param url - The URL to download from
 * @returns The video buffer
 */
export async function downloadVideo(url: string): Promise<Buffer> {
    try {
        console.log(`📥 Downloading video from: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download video: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`✅ Video downloaded: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
        return buffer;
    } catch (error) {
        console.error('❌ Error downloading video:', error);
        throw error;
    }
}
