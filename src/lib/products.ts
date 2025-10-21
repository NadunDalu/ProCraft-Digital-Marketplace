
"use server";

import type { Product } from '@/lib/types';
import { repoGetAll, repoGetById as repoGetByIdFn } from '@/server/productRepo';

export async function getProducts(): Promise<Product[]> {
  const products = await repoGetAll();
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const product = await repoGetByIdFn(id);
  return product ?? undefined;
}

export async function getCategories(): Promise<string[]> {
  const all = await repoGetAll();
  const categories = all.map(p => p.category);
  const uniqueCategories = ['All', ...Array.from(new Set(categories))];
  return uniqueCategories;
}
