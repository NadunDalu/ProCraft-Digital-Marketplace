import { NextRequest, NextResponse } from 'next/server';
import { WinnerSchema } from '@/lib/types';
import { winnersCreate, winnersGetAll, winnersGetByGiveaway } from '@/server/winnerRepo';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const giveawayId = searchParams.get('giveawayId');
  try {
    if (giveawayId) {
      const list = await winnersGetByGiveaway(giveawayId);
      return NextResponse.json(list);
    }
    const items = await winnersGetAll();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to fetch winners' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = WinnerSchema.parse(body);
    const created = await winnersCreate(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    const status = e?.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: e?.message ?? 'Failed to create winner' }, { status });
  }
}
