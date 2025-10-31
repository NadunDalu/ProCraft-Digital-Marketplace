import { NextResponse } from 'next/server';
import { GiveawaySchema } from '@/lib/types';
import { giveawaysCreate, giveawaysGetAll } from '@/server/giveawayRepo';

export async function GET() {
  try {
    const items = await giveawaysGetAll();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to fetch giveaways' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = GiveawaySchema.parse(body);
    const created = await giveawaysCreate(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    const status = e?.name === 'ZodError' ? 400 : 500;
    return NextResponse.json({ error: e?.message ?? 'Failed to create giveaway' }, { status });
  }
}
