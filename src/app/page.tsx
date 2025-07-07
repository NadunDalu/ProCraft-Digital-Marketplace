import { getProducts } from '@/lib/products';
import ProductListings from '@/components/product-listings';
import ProductRecommendations from '@/components/product-recommendations';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const products = getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground">
          ProCraft Digital Marketplace
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Your one-stop shop for premium digital products and professional courses.
        </p>
      </div>

      <ProductListings products={products} />
      
      <Separator className="my-12 bg-primary-foreground/20" />

      <ProductRecommendations />
    </div>
  );
}
