import { MongoClient, Db, Document } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'procraft';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;
  if (!uri) throw new Error('MONGODB_URI is required');
  if (!client) client = new MongoClient(uri, { maxPoolSize: 10 });
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function getCollection<T extends Document>(name: string) {
  const database = await getMongoDb();
  return database.collection<T>(name);
}
