import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createNanoBananaTask } from '@/lib/api/kie-nano-banana';
import { uploadImageToR2 } from '@/lib/r2-upload';
import { rateLimit, rateLimitConfigs, getClientIp, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { validateUserAgent } from '@/lib/security/bot-detection';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

// Helper to convert base64 to buffer
function base64ToBuffer(base64: string): Buffer {
    // Remove data:image/...;base64, prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
}

export async function POST(request: NextRequest) {
    try {
        console.log('🎭 Create Nano-Banana Actor API called');

        // Rate limiting for actor creation (costs money)
        const clientIp = getClientIp(request);
        const rateLimitResult = rateLimit(clientIp, rateLimitConfigs.actorCreation);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Too many actor creation requests. Please try again later' },
                {
                    status: 429,
                    headers: getRateLimitHeaders(rateLimitResult),
                }
            );
        }

        // Authentication Check
        const authClient = await createClient();
        const { data: { user }, error: authError } = await authClient.auth.getUser();

        if (authError || !user) {
            console.warn('❌ Unauthorized attempt to create actor');
            return NextResponse.json(
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        // Bot detection
        const uaValidation = validateUserAgent(request);
        if (!uaValidation.valid) {
            console.warn('❌ Suspicious User-Agent blocked:', {
                userAgent: uaValidation.userAgent,
                reason: uaValidation.reason,
            });
            return NextResponse.json(
                { error: 'Suspicious bot activity detected' },
                { status: 403 }
            );
        }

        const apiKey = process.env.KIE_API_KEY || process.env.VEO_API_KEY;
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

        // Upload base64 images to R2 and get public URLs
        const imageInput: string[] = [];
        const timestamp = Date.now();

        if (personImageUrl) {
            console.log('📤 Uploading person image to R2...');
            const personBuffer = base64ToBuffer(personImageUrl);
            const personR2Url = await uploadImageToR2(
                personBuffer,
                `temp-actors/${userId}/${timestamp}-person.png`,
                'image/png'
            );
            imageInput.push(personR2Url);
            console.log(`✅ Person image uploaded: ${personR2Url}`);
        }

        if (objectImageUrl) {
            console.log('📤 Uploading object image to R2...');
            const objectBuffer = base64ToBuffer(objectImageUrl);
            const objectR2Url = await uploadImageToR2(
                objectBuffer,
                `temp-actors/${userId}/${timestamp}-object.png`,
                'image/png'
            );
            imageInput.push(objectR2Url);
            console.log(`✅ Object image uploaded: ${objectR2Url}`);
        }

        if (decorImageUrl) {
            console.log('📤 Uploading decor image to R2...');
            const decorBuffer = base64ToBuffer(decorImageUrl);
            const decorR2Url = await uploadImageToR2(
                decorBuffer,
                `temp-actors/${userId}/${timestamp}-decor.png`,
                'image/png'
            );
            imageInput.push(decorR2Url);
            console.log(`✅ Decor image uploaded: ${decorR2Url}`);
        }

        console.log(`🖼️ Reference images uploaded: ${imageInput.length}`);

        // Get callback URL for webhook
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admakerai.app';
        const callBackUrl = `${baseUrl}/api/kie/nano-banana/webhook`;

        console.log('🔗 Callback URL configuration:');
        console.log(`   NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL || '(not set, using default)'}`);
        console.log(`   Base URL: ${baseUrl}`);
        console.log(`   Full callback URL: ${callBackUrl}`);

        console.log('🍌 Calling Nano Banana API...');

        // Create Nano Banana task with R2 URLs
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

        if (!taskResponse || !taskResponse.data || !taskResponse.data.taskId) {
            console.error('❌ Invalid response from Nano Banana:', taskResponse);
            throw new Error('Invalid response from Nano Banana API');
        }

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
                person_reference_url: imageInput[0] || null,
                object_reference_url: imageInput[1] || null,
                decor_reference_url: imageInput[2] || null,
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
        console.error('Error details:', error.stack);
        return NextResponse.json(
            { error: error.message || 'Failed to create actor' },
            { status: 500 }
        );
    }
}
