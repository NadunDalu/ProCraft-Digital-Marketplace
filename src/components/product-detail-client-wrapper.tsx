'use client';

import { useEffect } from 'react';
import type { Product } from '@/lib/products';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { PurchaseForm } from './purchase-form';

const BROWSING_HISTORY_KEY = 'procraft-browsing-history';
const MAX_HISTORY_LENGTH = 10;

type ProductDetailClientWrapperProps = {
  product: Product;
};

export default function ProductDetailClientWrapper({ product }: ProductDetailClientWrapperProps) {
  useEffect(() => {
    let history: string[] = JSON.parse(localStorage.getItem(BROWSING_HISTORY_KEY) || '[]');
    // Add product id to the front, avoiding duplicates
    history = [product.id, ...history.filter(id => id !== product.id)];
    // Limit history length
    if (history.length > MAX_HISTORY_LENGTH) {
      history = history.slice(0, MAX_HISTORY_LENGTH);
    }
    localStorage.setItem(BROWSING_HISTORY_KEY, JSON.stringify(history));
  }, [product.id]);

  return (
    <PurchaseForm product={product}>
      <Button
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
        aria-label={`Buy ${product.name} now`}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Buy Now
      </Button>
    </PurchaseForm>
  );
}
