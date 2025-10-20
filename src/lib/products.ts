
'use server';

import { Product, ProductSchema, ProductsSchema } from '@/lib/types';
import { repoGetAll, repoGetById as repoGetByIdFn } from '@/server/productRepo';
export type { Product };

// Simulate an async API call
export async function getProducts(): Promise<Product[]> {
  const products = await repoGetAll();
  return new Promise(resolve => setTimeout(() => resolve(products), 50));
}

// Simulate an async API call
export async function getProductById(id: string): Promise<Product | undefined> {
  const product = await repoGetByIdFn(id);
  if (!product) return undefined;
  const parsedProduct = ProductSchema.parse(product);
  return new Promise(resolve => setTimeout(() => resolve(parsedProduct), 50));
}

export async function getCategories(): Promise<string[]> {
  const all = await repoGetAll();
  const categories = all.map(p => p.category);
  const uniqueCategories = ['All', ...Array.from(new Set(categories))];
  return new Promise(resolve => setTimeout(() => resolve(uniqueCategories), 50));
}
