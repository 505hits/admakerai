import { NextRequest, NextResponse } from 'next/server';
import { checkNanoBananaTaskStatus, extractImageUrl } from '@/lib/api/kie-nano-banana';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const taskId = searchParams.get('taskId');

        if (!taskId) {
            return NextResponse.json(
                { error: 'Missing taskId parameter' },
                { status: 400 }
            );
        }

        const apiKey = process.env.KIE_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'KIE_API_KEY not configured' },
                { status: 500 }
            );
        }

        console.log(`🔍 Checking status for task: ${taskId}`);

        const statusResponse = await checkNanoBananaTaskStatus(taskId, apiKey);
        const imageUrl = extractImageUrl(statusResponse);

        return NextResponse.json({
            success: true,
            taskId,
            state: statusResponse.data.state,
            imageUrl,
            failMsg: statusResponse.data.failMsg
        });

    } catch (error: any) {
        console.error('❌ Error checking status:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to check status' },
            { status: 500 }
        );
    }
}
