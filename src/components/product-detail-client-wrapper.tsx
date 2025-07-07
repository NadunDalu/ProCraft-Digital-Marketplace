'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const BROWSING_HISTORY_KEY = 'procraft-browsing-history';
const MAX_HISTORY_LENGTH = 10;

type ProductDetailClientWrapperProps = {
  product: Product;
};

export default function ProductDetailClientWrapper({ product }: ProductDetailClientWrapperProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center border rounded-md">
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
          <Minus className="h-5 w-5" />
        </Button>
        <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQuantity(q => q + 1)}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <Button
        size="lg"
        className="flex-grow bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
        onClick={handleAddToCart}
        aria-label={`Add ${quantity} of ${product.name} to cart`}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}
