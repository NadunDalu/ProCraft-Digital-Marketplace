import { getDb, isDbAvailable, type DbProductRow } from './db';
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
  if (!isDbAvailable()) return [];
  const db = getDb();
  const rows = db.prepare('SELECT * FROM products ORDER BY createdAt DESC').all() as DbProductRow[];
  return ProductsSchema.parse(rows.map(rowToProduct));
}

export async function repoGetById(id: string): Promise<Product | undefined> {
  if (!isDbAvailable()) return undefined;
  const db = getDb();
  const r = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as DbProductRow | undefined;
  return r ? ProductSchema.parse(rowToProduct(r)) : undefined;
}

export async function repoCreate(data: Product): Promise<Product> {
  const p = ProductSchema.parse(data);
  if (!isDbAvailable()) throw new Error('Database is not available');
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

export async function repoUpdate(id: string, partial: Partial<Product>): Promise<Product | undefined> {
  const current = await repoGetById(id);
  if (!current) return undefined;
  const updated = ProductSchema.parse({ ...current, ...partial });
  if (!isDbAvailable()) throw new Error('Database is not available');
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

export async function repoDelete(id: string): Promise<boolean> {
  if (!isDbAvailable()) throw new Error('Database is not available');
  const db = getDb();
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return info.changes > 0;
}
