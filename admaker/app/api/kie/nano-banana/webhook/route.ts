import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { downloadImage, uploadImageToR2 } from '@/lib/r2-upload';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

// Helper function to create Supabase service client
function createServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        console.log('🍌 ============================================');
        console.log('🍌 Nano Banana Webhook POST received');
        console.log('🍌 Timestamp:', new Date().toISOString());

        // Security: Validate webhook signature
        const signature = request.headers.get('x-kie-signature') || request.headers.get('authorization');
        const expectedSecret = process.env.KIE_WEBHOOK_SECRET;

        if (expectedSecret && signature !== expectedSecret) {
            console.warn('❌ Invalid webhook signature');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const contentType = request.headers.get('content-type') || '';
        console.log('📋 Content-Type:', contentType);

        const bodyText = await request.text();
        console.log('📦 Raw body length:', bodyText.length);
        console.log('📦 Raw body preview:', bodyText.substring(0, 500));

        const trimmedBody = bodyText.trim();

        // Try to parse as JSON FIRST (Nano Banana sends JSON)
        let body;
        try {
            body = JSON.parse(trimmedBody);
            console.log('🍌 Parsed JSON callback:', JSON.stringify(body, null, 2));

            const { code, data } = body;
            const { taskId, resultJson } = data || {};

            if (!taskId) {
                console.log('⚠️ No taskId in JSON callback');
                console.log('🍌 ============================================');
                return NextResponse.json(
                    { success: true, message: 'No taskId provided' },
                    { status: 200 }
                );
            }

            if (code === 200 && resultJson) {
                const result = JSON.parse(resultJson);
                const imageUrl = result.resultUrls?.[0];

                if (!imageUrl) {
                    console.log('⚠️ No image URL in callback');
                    console.log('🍌 ============================================');
                    return NextResponse.json(
                        { success: true, message: 'No image URL provided' },
                        { status: 200 }
                    );
                }

                console.log(`✅ Image completed: ${taskId}`);
                console.log(`📸 Image URL: ${imageUrl}`);

                await saveActorToDatabase(taskId, imageUrl);
            } else {
                console.log(`❌ Image generation failed: ${taskId}, code: ${code}`);
            }

            console.log('🍌 ============================================');
            return NextResponse.json({ success: true }, { status: 200 });

        } catch (parseError) {
            // If JSON parsing fails, try URL extraction as fallback
            console.log('⚠️ Not JSON, trying URL extraction...');

            const urlMatch = trimmedBody.match(/https?:\/\/[^\s"'\]]+/);
            if (urlMatch) {
                const imageUrl = urlMatch[0];
                console.log('🖼️ ✅ Received URL callback (extracted from text)');
                console.log(`📸 Image URL: ${imageUrl}`);

                // Extract taskId from URL
                const taskIdMatch = imageUrl.match(/\/([a-f0-9-]{36})/);
                const taskId = taskIdMatch ? taskIdMatch[1] : null;

                if (!taskId) {
                    console.error('❌ Could not extract taskId from URL:', imageUrl);
                    console.log('🍌 ============================================');
                    return NextResponse.json(
                        { success: true, message: 'Could not extract taskId from URL' },
                        { status: 200 }
                    );
                }

                console.log(`🔍 Extracted taskId: ${taskId}`);

                // Save actor image to database
                await saveActorToDatabase(taskId, imageUrl);

                console.log('🍌 ============================================');
                return NextResponse.json({ success: true }, { status: 200 });
            }

            console.error('❌ Failed to parse as JSON or extract URL:', parseError);
            console.log('🍌 ============================================');
            return NextResponse.json(
                { success: true, message: 'Received but could not parse' },
                { status: 200 }
            );
        }

    } catch (error: any) {
        console.error('❌ Webhook error:', error);
        console.error('❌ Error stack:', error.stack);
        console.log('🍌 ============================================');
        return NextResponse.json(
            { success: true, error: error.message },
            { status: 200 }
        );
    }
}

// Helper function to save actor image to database
async function saveActorToDatabase(taskId: string, imageUrl: string) {
    try {
        console.log('💾 ============================================');
        console.log('💾 Starting saveActorToDatabase');
        console.log('💾 TaskId:', taskId);
        console.log('💾 Image URL:', imageUrl);

        const supabase = createServiceClient();

        // Retrieve metadata from Supabase
        console.log(`🔍 Looking for metadata with taskId: ${taskId}`);
        const { data: metadata, error: metadataError } = await supabase
            .from('actor_generation_metadata')
            .select('*')
            .eq('task_id', taskId)
            .maybeSingle();

        if (metadataError) {
            console.error('❌ Error fetching metadata:', metadataError);
            console.error('❌ Error details:', JSON.stringify(metadataError, null, 2));
        }

        if (!metadata) {
            console.log('⚠️ No metadata found for taskId:', taskId);
            console.log('💡 This might mean:');
            console.log('   1. The metadata was not created when the task started');
            console.log('   2. The metadata was already cleaned up');
            console.log('   3. There was an RLS policy issue');
            console.log('💾 ============================================');
            return;
        }

        console.log(`✅ Found metadata for user: ${metadata.user_id}`);
        console.log(`📝 Actor name: ${metadata.actor_name}`);
        console.log(`📝 Prompt: ${metadata.prompt}`);

        // Download image from Kie
        console.log('📥 Downloading image from Kie...');
        const imageBuffer = await downloadImage(imageUrl);
        console.log(`✅ Downloaded ${imageBuffer.length} bytes`);

        // Upload to Cloudflare R2
        console.log('☁️ Uploading image to Cloudflare R2...');
        const fileName = `actors/${taskId}.png`;
        const r2ImageUrl = await uploadImageToR2(imageBuffer, fileName, 'image/png');

        console.log(`✅ Image uploaded to R2: ${r2ImageUrl}`);

        // Insert actor record into Supabase using the actual schema
        console.log('💾 Inserting actor into custom_actors table...');
        const { data: insertedActor, error: insertError } = await supabase
            .from('custom_actors')
            .insert({
                user_id: metadata.user_id,
                name: metadata.actor_name || 'Custom Actor',
                description: metadata.prompt || '',
                reference_image_url: r2ImageUrl, // Use this for the generated image
                metadata: {
                    task_id: taskId,
                    prompt: metadata.prompt,
                    image_url: r2ImageUrl,
                    person_reference_url: metadata.person_reference_url,
                    object_reference_url: metadata.object_reference_url,
                    decor_reference_url: metadata.decor_reference_url,
                    aspect_ratio: metadata.aspect_ratio,
                    resolution: metadata.resolution,
                    generated_at: new Date().toISOString()
                }
            })
            .select()
            .single();

        if (insertError) {
            console.error('❌ Error inserting actor:', insertError);
            console.error('❌ Error details:', JSON.stringify(insertError, null, 2));
            throw insertError;
        }

        console.log('✅ Actor saved to Supabase successfully');
        console.log(`📊 Actor ID: ${insertedActor?.id}`);
        console.log(`📊 Actor details: user=${metadata.user_id}, name=${metadata.actor_name}`);
        console.log(`🔗 R2 URL: ${r2ImageUrl}`);

        // Clean up metadata after successful save
        console.log('🧹 Cleaning up metadata...');
        const { error: deleteError } = await supabase
            .from('actor_generation_metadata')
            .delete()
            .eq('task_id', taskId);

        if (deleteError) {
            console.error('⚠️ Error cleaning up metadata:', deleteError);
        } else {
            console.log('✅ Metadata cleaned up successfully');
        }

        console.log('💾 ============================================');

    } catch (error: any) {
        console.error('❌ ============================================');
        console.error('❌ Error in saveActorToDatabase:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        console.error('❌ ============================================');
        throw error;
    }
}
