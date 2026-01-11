import { NextRequest, NextResponse } from 'next/server';
import { checkUserProfile } from '@/app/actions/check-profile';

export async function GET(request: NextRequest) {
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
