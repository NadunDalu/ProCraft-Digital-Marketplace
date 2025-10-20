import { NextRequest, NextResponse } from 'next/server';
import { repoGetById, repoUpdate, repoDelete } from '@/server/productRepo';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const item = await repoGetById(id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { id } = await params;
  const updated = await repoUpdate(id, body);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const ok = await repoDelete(id);
  return NextResponse.json({ ok });
}
