
'use server';

import { Product, ProductSchema, ProductsSchema } from '@/lib/types';
import { products as dataProducts } from '@/lib/data';
export type { Product };

// Simulate an async API call
export async function getProducts(): Promise<Product[]> {
  const products = ProductsSchema.parse(dataProducts);
  return new Promise(resolve => setTimeout(() => resolve(products), 50));
}

// Simulate an async API call
export async function getProductById(id: string): Promise<Product | undefined> {
  const product = dataProducts.find(p => p.id === id);
  if (!product) return undefined;
  const parsedProduct = ProductSchema.parse(product);
  return new Promise(resolve => setTimeout(() => resolve(parsedProduct), 50));
}

export async function getCategories(): Promise<string[]> {
  const all = ProductsSchema.parse(dataProducts);
  const categories = all.map(p => p.category);
  const uniqueCategories = ['All', ...Array.from(new Set(categories))];
  return new Promise(resolve => setTimeout(() => resolve(uniqueCategories), 50));
}
