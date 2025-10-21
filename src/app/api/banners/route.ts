import { NextResponse } from 'next/server';
import { bannerGetAll, bannerCreate } from '@/server/bannerRepo';
import { BannerSchema } from '@/lib/types';

export async function GET() {
  try {
    const banners = await bannerGetAll();
    return NextResponse.json(banners);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const parsed = BannerSchema.parse(payload);
    const created = await bannerCreate(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    const status = e?.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: e?.message ?? 'Failed to create banner' }, { status });
  }
}
