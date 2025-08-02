
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  salePrice?: number;
  features: string[];
  requirements?: string[];
  rating: number;
  reviewCount: number;
};

const productsCollection = collection(db, 'products');

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const productDoc = await getDoc(doc(db, 'products', id));
    if (productDoc.exists()) {
        return { id: productDoc.id, ...productDoc.data() } as Product;
    }
    return undefined;
}


export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = products.map(p => p.category);
  return ['All', ...Array.from(new Set(categories))];
}
