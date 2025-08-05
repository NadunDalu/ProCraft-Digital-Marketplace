
'use server';

import { db } from '@/lib/firebase-db';
import { Product, ProductSchema, ProductsSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getProducts(): Promise<Product[]> {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return ProductsSchema.parse(products);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
        return undefined;
    }
    const product = { id: doc.id, ...doc.data() };
    return ProductSchema.parse(product);
}

export async function addProduct(productData: Omit<Product, 'id'>) {
    const docRef = await db.collection('products').add(productData);
    revalidatePath('/admin/products');
    revalidatePath('/');
    return docRef.id;
}

export async function updateProduct(id: string, productData: Partial<Omit<Product, 'id'>>) {
    await db.collection('products').doc(id).update(productData);
    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/');
}

export async function deleteProduct(id: string) {
    await db.collection('products').doc(id).delete();
    revalidatePath('/admin/products');
    revalidatePath('/');
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = products.map(p => p.category);
  return ['All', ...Array.from(new Set(categories))];
}
