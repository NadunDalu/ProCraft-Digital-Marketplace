import { z } from 'zod';
import { getCollection } from '@/server/mongo';
import { Product, ProductSchema, ProductsSchema } from '@/lib/types';

const ProductDocSchema = ProductSchema.extend({ _id: z.any().optional() });
type ProductDoc = z.infer<typeof ProductDocSchema>;

const COLLECTION = 'products';

function toDoc(p: Product): ProductDoc {
  return { ...p } as ProductDoc;
}

function fromDoc(doc: ProductDoc): Product {
  const { _id, ...rest } = doc;
  return ProductSchema.parse(rest);
}

export async function repoGetAll(): Promise<Product[]> {
  const col = await getCollection<ProductDoc>(COLLECTION);
  const docs = await col.find({}).sort({ _id: -1 }).toArray();
  return ProductsSchema.parse(docs.map(fromDoc));
}

export async function repoGetById(id: string): Promise<Product | undefined> {
  const col = await getCollection<ProductDoc>(COLLECTION);
  const doc = await col.findOne({ id });
  return doc ? fromDoc(doc) : undefined;
}

export async function repoCreate(data: Product): Promise<Product> {
  const p = ProductSchema.parse(data);
  const col = await getCollection<ProductDoc>(COLLECTION);
  await col.updateOne({ id: p.id }, { $set: toDoc(p) }, { upsert: true });
  return p;
}

export async function repoUpdate(id: string, partial: Partial<Product>): Promise<Product | undefined> {
  const current = await repoGetById(id);
  if (!current) return undefined;
  const updated = ProductSchema.parse({ ...current, ...partial });
  const col = await getCollection<ProductDoc>(COLLECTION);
  await col.updateOne({ id }, { $set: toDoc(updated) });
  return updated;
}

export async function repoDelete(id: string): Promise<boolean> {
  const col = await getCollection<ProductDoc>(COLLECTION);
  const res = await col.deleteOne({ id });
  return (res.deletedCount ?? 0) > 0;
}
