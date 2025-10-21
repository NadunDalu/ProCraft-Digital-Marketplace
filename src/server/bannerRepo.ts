import { z } from 'zod';
import { getCollection } from '@/server/mongo';
import { BannerSchema, type Banner, BannersSchema } from '@/lib/types';

const collectionName = 'banners';

export async function bannerGetAll(): Promise<Banner[]> {
  const col = await getCollection<Banner>(collectionName);
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return BannersSchema.parse(docs);
}

export async function bannerCreate(data: Banner): Promise<Banner> {
  const parsed = BannerSchema.parse({ ...data, createdAt: data.createdAt ?? new Date().toISOString() });
  const col = await getCollection<Banner>(collectionName);
  await col.updateOne({ id: parsed.id }, { $set: parsed }, { upsert: true });
  return parsed;
}

export async function bannerDelete(id: string): Promise<boolean> {
  const col = await getCollection<Banner>(collectionName);
  const res = await col.deleteOne({ id });
  return res.deletedCount === 1;
}