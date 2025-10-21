"use server";

import type { Banner } from '@/lib/types';
import { bannerGetAll } from '@/server/bannerRepo';

export async function getBanners(): Promise<Banner[]> {
  return await bannerGetAll();
}
