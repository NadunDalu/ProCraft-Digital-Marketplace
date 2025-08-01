import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Tag, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import ProductDetailClientWrapper from '@/components/product-detail-client-wrapper';
import Header from '@/components/header';
import Footer from '@/components/footer';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const hasSale = product.salePrice !== undefined;
  const displayPrice = hasSale ? product.salePrice : product.price;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              data-ai-hint="digital product"
            />
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg text-card-foreground">
            {hasSale && (
              <Badge variant="destructive" className="mb-2 bg-accent text-accent-foreground">
                <Tag className="mr-1 h-4 w-4" />
                Special Offer
              </Badge>
            )}
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
            
            <div className="flex items-center mt-3 text-muted-foreground">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm ml-2">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-lg mt-4 text-muted-foreground">{product.longDescription}</p>

            <Separator className="my-6" />

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">{formatCurrency(displayPrice!)}</span>
              {hasSale && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <ProductDetailClientWrapper product={product} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-card rounded-lg p-6 shadow-lg text-card-foreground">
              <h3 className="font-headline text-2xl font-semibold mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {product.requirements && (
               <div className="bg-card rounded-lg p-6 shadow-lg text-card-foreground">
                <h3 className="font-headline text-2xl font-semibold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {product.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}
