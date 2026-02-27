
'use client';

import { useEffect } from 'react';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const BROWSING_HISTORY_KEY = 'procraft-browsing-history';
const MAX_HISTORY_LENGTH = 10;
// Invite link used when no custom message is set
const WHATSAPP_LINK = 'https://wa.me/message/4EMAE4VL2K5DM1';
// Phone-number based URL — the ONLY format that supports ?text= pre-fill
const WHATSAPP_PHONE_URL = 'https://wa.me/94785593170';

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

  const whatsappUrl = product.whatsappMessage
    ? `${WHATSAPP_PHONE_URL}?text=${encodeURIComponent(product.whatsappMessage)}`
    : WHATSAPP_LINK;

  return (
    <Button
      asChild
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
      aria-label={`Buy ${product.name} now`}
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <ShoppingBag className="mr-2 h-5 w-5" />
        Buy Now
      </Link>
    </Button>
  );
}
