import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createNanoBananaTask } from '@/lib/api/kie-nano-banana';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
        console.log('🍌 Create Actor API called');

        const apiKey = process.env.KIE_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'KIE_API_KEY not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const {
            userId,
            actorName,
            prompt,
            personImageUrl,
            objectImageUrl,
            decorImageUrl,
            aspectRatio = '1:1',
            resolution = '1K'
        } = body;

        if (!userId || !prompt) {
            return NextResponse.json(
                { error: 'Missing required fields: userId, prompt' },
                { status: 400 }
            );
        }

        console.log(`👤 Creating actor for user: ${userId}`);
        console.log(`📝 Prompt: ${prompt}`);

        // Build image_input array from provided reference images
        const imageInput: string[] = [];
        if (personImageUrl) imageInput.push(personImageUrl);
        if (objectImageUrl) imageInput.push(objectImageUrl);
        if (decorImageUrl) imageInput.push(decorImageUrl);

        console.log(`🖼️ Reference images: ${imageInput.length}`);

        // Get callback URL for webhook
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admakerai.vercel.app';
        const callBackUrl = `${baseUrl}/api/kie/nano-banana/webhook`;

        // Create Nano Banana task
        const taskResponse = await createNanoBananaTask(
            {
                prompt,
                image_input: imageInput,
                aspect_ratio: aspectRatio as any,
                resolution: resolution as any,
                output_format: 'png'
            },
            apiKey,
            callBackUrl
        );

        const taskId = taskResponse.data.taskId;
        console.log(`✅ Task created: ${taskId}`);

        // Store metadata in Supabase for webhook to use later
        const supabase = createServiceClient();
        const { error: metadataError } = await supabase
            .from('actor_generation_metadata')
            .insert({
                task_id: taskId,
                user_id: userId,
                actor_name: actorName || 'Custom Actor',
                prompt,
                person_reference_url: personImageUrl || null,
                object_reference_url: objectImageUrl || null,
                decor_reference_url: decorImageUrl || null,
                aspect_ratio: aspectRatio,
                resolution
            });

        if (metadataError) {
            console.error('⚠️ Error storing metadata:', metadataError);
            // Don't fail the request, webhook can still work
        }

        return NextResponse.json({
            success: true,
            taskId,
            message: 'Actor generation started'
        });

    } catch (error: any) {
        console.error('❌ Error creating actor:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create actor' },
            { status: 500 }
        );
    }
}
