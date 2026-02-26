import { NextRequest, NextResponse } from 'next/server';
import { siteReviewsDelete } from '@/server/siteReviewRepo';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await siteReviewsDelete(id);
        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed to delete review' }, { status: 500 });
    }
}
