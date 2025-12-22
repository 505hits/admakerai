import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enhanceScript } from '@/lib/api/openai';

export async function POST(request: NextRequest) {
    try {
        console.log('🤖 Script enhancement API called');

        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.log('❌ Unauthorized - No user found');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { script, duration = 8 } = body as {
            script: string;
            duration?: number;
        };

        console.log('📝 Original script:', script);
        console.log('⏱️ Duration:', duration);

        // Validate input
        if (!script || script.trim().length === 0) {
            return NextResponse.json(
                { error: 'Script is required' },
                { status: 400 }
            );
        }

        if (script.length > 500) {
            return NextResponse.json(
                { error: 'Script is too long (max 500 characters)' },
                { status: 400 }
            );
        }

        // Enhance the script using OpenAI
        const enhancedScript = await enhanceScript({
            originalScript: script,
            duration
        });

        console.log('✅ Script enhanced successfully');
        return NextResponse.json({
            enhancedScript,
            success: true
        });

    } catch (error) {
        console.error('❌ Error enhancing script:', error);
        return NextResponse.json(
            {
                error: 'Failed to enhance script',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
