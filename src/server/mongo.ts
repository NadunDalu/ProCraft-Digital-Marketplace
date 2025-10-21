import { MongoClient, Db, Document, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'procraft';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;
  if (!uri) throw new Error('MONGODB_URI is required');
  if (!client) {
    const allowInvalid = (process.env.MONGODB_TLS_ALLOW_INVALID_CERT || '').toLowerCase() === 'true';
    const direct = (process.env.MONGODB_DIRECT_CONNECTION || '').toLowerCase() === 'true';
    const forceTls = (process.env.MONGODB_TLS || '').toLowerCase() === 'true';
    const caFile = process.env.MONGODB_TLS_CA_FILE;

    const opts: MongoClientOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
    };
    if (direct) opts.directConnection = true;
    if (forceTls) opts.tls = true;
    if (caFile) {
      // Enable TLS and use the custom CA file (Windows path supported)
      opts.tls = true;
      (opts as any).tlsCAFile = caFile;
    }
    if (allowInvalid) {
      // DEV ONLY: allow invalid/self-signed certs
      opts.tls = true;
      (opts as any).tlsAllowInvalidCertificates = true;
      // Also relax Node's TLS verification globally for this process (dev convenience)
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    client = new MongoClient(uri, opts);
  }
  try {
    await client.connect();
  } catch (err: any) {
    const hint = [
      'Failed to connect to MongoDB. Check MONGODB_URI, network access, and TLS settings.',
      'Try one of:',
      '- MONGODB_DIRECT_CONNECTION=true (for single-node URIs)',
      '- MONGODB_TLS=true (if your server requires TLS)',
      '- MONGODB_TLS_ALLOW_INVALID_CERT=true (DEV ONLY for self-signed/SSL interception)',
      '- MONGODB_TLS_CA_FILE=path/to/ca.pem (for a custom CA)'
    ].join('\n');
    err.message = `${err.message}\n${hint}`;
    throw err;
  }
  db = client.db(dbName);
  return db;
}

export async function getCollection<T extends Document>(name: string) {
  const database = await getMongoDb();
  return database.collection<T>(name);
}
