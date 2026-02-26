import { NextRequest, NextResponse } from 'next/server';
import { siteReviewsGetAll, siteReviewsCreate } from '@/server/siteReviewRepo';

export async function GET() {
    try {
        const reviews = await siteReviewsGetAll();
        return NextResponse.json(reviews);
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const created = await siteReviewsCreate(body);
        return NextResponse.json(created);
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed to create review' }, { status: 500 });
    }
}
