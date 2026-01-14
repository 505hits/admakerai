import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { uploadVideoToR2 } from '@/lib/api/r2-upload';

export async function POST(request: NextRequest) {
    try {
        console.log('📹 Kie.ai Callback POST received');

        const body = await request.json();
        console.log('Callback body:', JSON.stringify(body, null, 2));

        const { data } = body;

        if (!data) {
            console.error('❌ No data in callback');
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const { taskId, state, resultJson, failMsg } = data;

        if (state === 'success' && resultJson) {
            console.log(`✅ Replication task ${taskId} completed successfully`);

            // Parse result JSON
            const result = JSON.parse(resultJson);
            const kieVideoUrl = result.resultUrls?.[0];

            if (!kieVideoUrl) {
                console.error('❌ No video URL in result');
                return NextResponse.json({ success: true }, { status: 200 });
            }

            console.log(`📥 Downloading video from Kie: ${kieVideoUrl}`);

            // Download video from Kie
            const videoResponse = await fetch(kieVideoUrl);
            if (!videoResponse.ok) {
                throw new Error(`Failed to download video: ${videoResponse.status}`);
            }

            const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

            // Upload to R2
            const r2VideoUrl = await uploadVideoToR2(videoBuffer, `replicated-${taskId}.mp4`);

            console.log(`✅ Video uploaded to R2: ${r2VideoUrl}`);

            // Get metadata from Supabase
            const supabase = createServiceClient();
            const { data: metadataRow, error: metadataError } = await supabase
                .from('video_generation_metadata')
                .select('*')
                .eq('task_id', taskId)
                .single();

            if (metadataError || !metadataRow) {
                console.error('❌ No metadata found for taskId:', taskId);
                return NextResponse.json({ success: true }, { status: 200 });
            }

            const metadata = metadataRow;

            // Calculate expiration date (14 days from now)
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 14);

            // Save to videos table
            const { error: saveError } = await supabase
                .from('videos')
                .insert({
                    user_id: metadata.user_id,
                    task_id: taskId,
                    video_url: r2VideoUrl,
                    actor_name: metadata.actor_name,
                    actor_image_url: metadata.actor_image_url,
                    script: metadata.script || 'Replicated from winning ad',
                    scene_description: metadata.scene_description || 'Video replication',
                    duration: metadata.duration,
                    format: metadata.format,
                    expires_at: expiresAt.toISOString(),
                });

            if (saveError) {
                console.error('❌ Error saving video to database:', saveError);
                throw saveError;
            }

            console.log('✅ Replicated video saved to database');

            // Clean up metadata
            await supabase
                .from('video_generation_metadata')
                .delete()
                .eq('task_id', taskId);

        } else if (state === 'fail') {
            console.log(`❌ Replication task ${taskId} failed: ${failMsg}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Kie callback error:', error);
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}
