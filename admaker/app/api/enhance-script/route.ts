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

        // Check AI script uses remaining
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('ai_script_uses')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
            return NextResponse.json(
                { error: 'Failed to check usage limit' },
                { status: 500 }
            );
        }

        const remainingUses = profile?.ai_script_uses ?? 0;

        if (remainingUses <= 0) {
            console.log('❌ User has no AI script uses remaining');
            return NextResponse.json(
                { error: 'You have used all 50 AI script enhancements. This feature is limited to 50 uses per account.' },
                { status: 403 }
            );
        }

        console.log(`✅ User has ${remainingUses} AI script uses remaining`);

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

        // Decrement ai_script_uses
        const newUsesRemaining = remainingUses - 1;
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ ai_script_uses: newUsesRemaining })
            .eq('id', user.id);

        if (updateError) {
            console.error('❌ Error updating ai_script_uses:', updateError);
            // Don't fail the request, just log the error
        } else {
            console.log(`✅ AI script uses decremented: ${remainingUses} → ${newUsesRemaining}`);
        }

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
