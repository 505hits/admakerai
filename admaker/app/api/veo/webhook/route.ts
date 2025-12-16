import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

/**
 * Callback endpoint for Veo API
 * Handles video completion and saves to Supabase
 */

// Force dynamic rendering - critical for webhooks
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds max

// In-memory storage for task metadata (user_id, actor info, etc.)
// This is populated before video generation and used by the webhook
export const taskMetadata = new Map<string, {
    userId: string;
    actorName: string;
    actorImageUrl: string;
    script: string;
    sceneDescription: string;
    duration: number;
    format: string;
}>();


export async function POST(request: NextRequest) {
    try {
        console.log('📹 Veo Callback POST received - Build: 2025-12-16-14:38');
        console.log('🔄 SIMPLIFIED ARCHITECTURE - Direct Kie URL storage');

        const contentType = request.headers.get('content-type') || '';
        console.log('Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('Raw body length:', bodyText.length);

        // Check if body is a URL (plain text) - Kie sends this format
        const trimmedBody = bodyText.trim();
        if (trimmedBody.startsWith('http://') || trimmedBody.startsWith('https://')) {
            console.log('📹 Received plain URL callback');
            const veoVideoUrl = trimmedBody;
            console.log(`📺 Veo URL: ${veoVideoUrl}`);

            // Extract taskId from URL - Kie uses UUID format with dashes
            // Example: /r/45b73df1-b7d6-41d5-98fa-6455de802e58_watermarked.mp4
            const taskIdMatch = veoVideoUrl.match(/\/([a-f0-9-]{36})/);
            const taskId = taskIdMatch ? taskIdMatch[1] : null;

            if (!taskId) {
                console.error('❌ Could not extract taskId from URL:', veoVideoUrl);
                return NextResponse.json(
                    { success: true, message: 'Could not extract taskId from URL' },
                    { status: 200 }
                );
            }

            console.log(`🔍 Extracted taskId: ${taskId}`);

            // Store Veo URL directly to Supabase
            await saveVideoToDatabase(taskId, veoVideoUrl);

            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Try to parse as JSON
        let body;
        try {
            body = JSON.parse(trimmedBody);
        } catch (parseError) {
            console.error('❌ Failed to parse as JSON:', parseError);
            console.log('Body was not a URL and not valid JSON');

            return NextResponse.json(
                { success: true, message: 'Received but could not parse' },
                { status: 200 }
            );
        }

        console.log('📹 Parsed JSON callback:', JSON.stringify(body, null, 2));

        const { code, msg, data } = body;
        const { taskId, info } = data || {};

        if (!taskId) {
            console.log('⚠️ No taskId in callback');
            return NextResponse.json(
                { success: true, message: 'No taskId provided' },
                { status: 200 }
            );
        }

        if (code === 200) {
            // Extract video URL from resultUrls
            const videoUrls = info?.resultUrls ? JSON.parse(info.resultUrls) : [];
            const veoVideoUrl = videoUrls[0];

            if (!veoVideoUrl) {
                console.log('⚠️ No video URL in callback');
                return NextResponse.json(
                    { success: true, message: 'No video URL provided' },
                    { status: 200 }
                );
            }

            console.log(`✅ Video completed: ${taskId}`);
            console.log(`📺 Veo URL: ${veoVideoUrl}`);

            // Store Veo URL directly to Supabase
            await saveVideoToDatabase(taskId, veoVideoUrl);

        } else {
            console.log(`❌ Video generation failed: ${taskId}, code: ${code}, msg: ${msg}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Callback error:', error);
        // Always return 200 to avoid Kie retrying
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}

// Helper function to save video to database
async function saveVideoToDatabase(taskId: string, videoUrl: string) {
    try {
        console.log('💾 Saving Veo URL directly to Supabase...');
        const supabase = createServiceClient();
        const metadata = taskMetadata.get(taskId);

        if (!metadata) {
            console.log('⚠️ No metadata found for taskId:', taskId);
            console.log('Cannot save to database without user info');
            return;
        }

        // Calculate expiration date (60 days from now - Kie URL expiration)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 60);

        const { error: dbError } = await supabase
            .from('videos')
            .insert({
                user_id: metadata.userId,
                task_id: taskId,
                video_url: videoUrl, // Store Kie URL directly!
                actor_name: metadata.actorName,
                actor_image_url: metadata.actorImageUrl,
                script: metadata.script,
                scene_description: metadata.sceneDescription,
                duration: metadata.duration,
                format: metadata.format,
                status: 'completed',
                expires_at: expiresAt.toISOString()
            });

        if (dbError) {
            console.error('❌ Error saving to Supabase:', dbError);
        } else {
            console.log('✅ Veo URL saved to Supabase (expires in 60 days)');
            // Clean up metadata
            taskMetadata.delete(taskId);
        }
    } catch (dbErr: any) {
        console.error('❌ Database error:', dbErr.message);
    }
}

// GET endpoint removed - no longer needed with simplified architecture
// Videos are stored directly via webhook callback
