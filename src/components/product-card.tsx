import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasSale = product.salePrice !== undefined;
  const displayPrice = hasSale ? product.salePrice : product.price;
  const cardSrc = product.cardImage ?? product.image;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <Image
            src={cardSrc}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-48"
            data-ai-hint="digital product"
          />
        </Link>
        {hasSale && (
          <Badge
            variant="destructive"
            className="absolute top-3 right-3 text-sm bg-accent text-accent-foreground"
          >
            <Tag className="mr-1 h-4 w-4" />
            SALE
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow text-card-foreground">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="font-headline text-lg leading-tight hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm mt-2">{product.description}</p>
        
        <div className="flex items-center mt-3 text-muted-foreground">
          <div className="flex items-center gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs ml-2">({product.reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-card-foreground">
        <div>
          <p className="text-xl font-bold">
            {formatCurrency(displayPrice!)}
          </p>
          {hasSale && (
            <p className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
