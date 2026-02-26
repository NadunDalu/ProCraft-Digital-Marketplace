import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Star, Tag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasSale = product.salePrice !== undefined;
  const displayPrice = hasSale ? product.salePrice : product.price;
  const cardSrc = product.cardImage ?? product.image;

  return (
    <div className="group relative flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 hover:border-primary/30">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden relative">
        <Image
          src={cardSrc}
          alt={product.name}
          width={600}
          height={400}
          className="object-cover w-full h-52 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sale badge */}
        {hasSale && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-bold text-white shadow-lg">
            <Tag className="h-3 w-3" />
            SALE
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category pill */}
        <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {product.category}
        </span>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-headline font-semibold text-base leading-snug hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">{formatCurrency(displayPrice!)}</span>
            {hasSale && (
              <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
