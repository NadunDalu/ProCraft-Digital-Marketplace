import { NextRequest, NextResponse } from 'next/server';
import { winnersDelete } from '@/server/winnerRepo';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return NextResponse.json({ id });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await winnersDelete(id);
        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Failed to delete winner' }, { status: 500 });
    }
}
