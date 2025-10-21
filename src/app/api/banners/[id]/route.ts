import { NextResponse } from 'next/server';
import { bannerDelete } from '@/server/bannerRepo';

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
    const ok = await bannerDelete(id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to delete banner' }, { status: 500 });
  }
}
