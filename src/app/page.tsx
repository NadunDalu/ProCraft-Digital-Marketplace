

import { getProducts } from '@/lib/products';
import { getBanners } from '@/lib/banners';
import ProductListings from '@/components/product-listings';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AddToHomeScreen from '@/components/add-to-home-screen';
import CustomerReviews from '@/components/customer-reviews';

export default async function Home() {
  const [products, banners] = await Promise.all([
    getProducts(),
    getBanners(),
  ]);

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          ProCraft Services
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Your one-stop shop for premium digital products and professional courses.
        </p>
      </div>

      <AddToHomeScreen banners={banners} />

      <ProductListings products={products} />

    </div>
    <CustomerReviews />
    <Footer />
    </>
  );
}
