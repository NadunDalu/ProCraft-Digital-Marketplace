
'use server';

import { products as allProducts } from '@/lib/data';
import { Product, ProductSchema, ProductsSchema } from '@/lib/types';

// Simulate an async API call
export async function getProducts(): Promise<Product[]> {
    const products = ProductsSchema.parse(allProducts);
    return new Promise(resolve => setTimeout(() => resolve(products), 200));
}

// Simulate an async API call
export async function getProductById(id: string): Promise<Product | undefined> {
    const product = allProducts.find(p => p.id === id);
    if (!product) return undefined;
    const parsedProduct = ProductSchema.parse(product);
    return new Promise(resolve => setTimeout(() => resolve(parsedProduct), 200));
}

export async function getCategories(): Promise<string[]> {
  const categories = allProducts.map(p => p.category);
  const uniqueCategories = ['All', ...Array.from(new Set(categories))];
  return new Promise(resolve => setTimeout(() => resolve(uniqueCategories), 200));
}
