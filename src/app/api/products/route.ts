import { NextRequest, NextResponse } from 'next/server';
import { repoGetAll, repoCreate } from '@/server/productRepo';
import { ProductSchema } from '@/lib/types';

export async function GET() {
  const products = await repoGetAll();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = ProductSchema.parse(body);
  const created = await repoCreate(parsed);
  return NextResponse.json(created, { status: 201 });
}
