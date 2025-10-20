// Server-only SQLite access with graceful fallback if better-sqlite3 is not installed.
import fs from 'node:fs';
import path from 'node:path';
import { products as seedProducts } from '@/lib/data';

type BetterSqlite3 = any;

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'procraft.db');

let Database: BetterSqlite3 | null = null;
let db: any = null as any;
let available = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Database = require('better-sqlite3');
  available = true;
} catch {
  available = false;
}

export function isDbAvailable() {
  return available;
}

export function getDb() {
  if (!available) return null;
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  migrate(db);
  return db;
}

function migrate(database: any) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      longDescription TEXT NOT NULL,
      image TEXT NOT NULL,
      cardImage TEXT,
      price REAL NOT NULL,
      salePrice REAL,
      features TEXT,
      requirements TEXT,
      rating REAL DEFAULT 0,
      reviewCount INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Defensive migration for existing DBs missing newer columns
  try {
    const cols = database.prepare(`PRAGMA table_info(products)`).all() as Array<{ name: string }>;
    const hasCardImage = cols.some((c) => c.name === 'cardImage');
    if (!hasCardImage) {
      database.exec(`ALTER TABLE products ADD COLUMN cardImage TEXT`);
    }
  } catch {
    // ignore
  }

  // Seed if empty
  const row = database.prepare('SELECT COUNT(1) as c FROM products').get();
  if (row.c === 0) {
    const insert = database.prepare(`
      INSERT INTO products (
        id,name,category,description,longDescription,image,cardImage,price,salePrice,features,requirements,rating,reviewCount
      ) VALUES (
        @id,@name,@category,@description,@longDescription,@image,@cardImage,@price,@salePrice,@features,@requirements,@rating,@reviewCount
      )
    `);
    const tx = database.transaction((items: any[]) => {
      for (const p of items) {
        insert.run({
          id: p.id,
          name: p.name,
          category: p.category,
          description: p.description,
          longDescription: p.longDescription,
          image: p.image,
          cardImage: (p as any).cardImage ?? null,
          price: p.price,
          salePrice: p.salePrice ?? null,
          features: JSON.stringify(p.features ?? []),
          requirements: JSON.stringify(p.requirements ?? []),
          rating: p.rating ?? 0,
          reviewCount: p.reviewCount ?? 0,
        });
      }
    });
    tx(seedProducts as any);
  }
}

export type DbProductRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  cardImage: string | null;
  price: number;
  salePrice: number | null;
  features: string | null; // JSON
  requirements: string | null; // JSON
  rating: number;
  reviewCount: number;
};
