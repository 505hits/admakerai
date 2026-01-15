import { NextRequest, NextResponse } from 'next/server';
import { checkUserProfile } from '@/app/actions/check-profile';

export async function GET(request: NextRequest) {
    // Security: Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'Debug endpoints are disabled in production' },
            { status: 403 }
        );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json(
            { error: 'Email parameter required' },
            { status: 400 }
        );
    }

    const result = await checkUserProfile(email);
    return NextResponse.json(result);
}
