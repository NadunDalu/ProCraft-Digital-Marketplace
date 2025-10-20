import { getDb, isDbAvailable, type DbProductRow } from './db';
import { products as memoryProducts } from '@/lib/data';
import { Product, ProductSchema, ProductsSchema } from '@/lib/types';

function rowToProduct(r: DbProductRow): Product {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    description: r.description,
    longDescription: r.longDescription,
    image: r.image,
    cardImage: r.cardImage ?? undefined,
    price: r.price,
    salePrice: r.salePrice ?? undefined,
    features: r.features ? JSON.parse(r.features) : [],
    requirements: r.requirements ? JSON.parse(r.requirements) : [],
    rating: r.rating,
    reviewCount: r.reviewCount,
  };
}

export async function repoGetAll(): Promise<Product[]> {
  if (isDbAvailable()) {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM products ORDER BY createdAt DESC').all() as DbProductRow[];
    return ProductsSchema.parse(rows.map(rowToProduct));
  }
  return ProductsSchema.parse(memoryProducts);
}

export async function repoGetById(id: string): Promise<Product | undefined> {
  if (isDbAvailable()) {
    const db = getDb();
    const r = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as DbProductRow | undefined;
    return r ? ProductSchema.parse(rowToProduct(r)) : undefined;
  }
  const p = memoryProducts.find(p => p.id === id);
  return p ? ProductSchema.parse(p) : undefined;
}

export async function repoCreate(data: Product): Promise<Product> {
  const p = ProductSchema.parse(data);
  if (isDbAvailable()) {
    const db = getDb();
    db.prepare(`INSERT INTO products (id,name,category,description,longDescription,image,cardImage,price,salePrice,features,requirements,rating,reviewCount)
                VALUES (@id,@name,@category,@description,@longDescription,@image,@cardImage,@price,@salePrice,@features,@requirements,@rating,@reviewCount)`) 
      .run({
        ...p,
        cardImage: (p as any).cardImage ?? null,
        salePrice: p.salePrice ?? null,
        features: JSON.stringify(p.features ?? []),
        requirements: JSON.stringify(p.requirements ?? []),
      });
    return p;
  }
  // In-memory fallback: add or replace
  const idx = memoryProducts.findIndex(mp => mp.id === p.id);
  if (idx >= 0) (memoryProducts as any)[idx] = p; else (memoryProducts as any).push(p);
  return p;
}

export async function repoUpdate(id: string, partial: Partial<Product>): Promise<Product | undefined> {
  const current = await repoGetById(id);
  if (!current) return undefined;
  const updated = ProductSchema.parse({ ...current, ...partial });
  if (isDbAvailable()) {
    const db = getDb();
    db.prepare(`UPDATE products SET name=@name, category=@category, description=@description, longDescription=@longDescription, image=@image, cardImage=@cardImage,
                price=@price, salePrice=@salePrice, features=@features, requirements=@requirements, rating=@rating, reviewCount=@reviewCount,
                updatedAt=CURRENT_TIMESTAMP WHERE id=@id`) 
      .run({
        ...updated,
        cardImage: (updated as any).cardImage ?? null,
        salePrice: updated.salePrice ?? null,
        features: JSON.stringify(updated.features ?? []),
        requirements: JSON.stringify(updated.requirements ?? []),
      });
    return updated;
  }
  const idx = memoryProducts.findIndex(mp => mp.id === id);
  if (idx >= 0) (memoryProducts as any)[idx] = updated;
  return updated;
}

export async function repoDelete(id: string): Promise<boolean> {
  if (isDbAvailable()) {
    const db = getDb();
    const info = db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return info.changes > 0;
  }
  const idx = memoryProducts.findIndex(mp => mp.id === id);
  if (idx >= 0) {
    (memoryProducts as any).splice(idx, 1);
    return true;
  }
  return false;
}
