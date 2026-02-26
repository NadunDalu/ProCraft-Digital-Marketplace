
import { getProducts } from '@/lib/products';
import { getBanners } from '@/lib/banners';
import ProductListings from '@/components/product-listings';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AddToHomeScreen from '@/components/add-to-home-screen';
import CustomerReviews from '@/components/customer-reviews';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default async function Home() {
  const [products, banners] = await Promise.all([
    getProducts(),
    getBanners(),
  ]);

  return (
    <>
      <Header />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Animated bg orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="glow-orb animate-float absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/20 opacity-60" />
          <div className="glow-orb animate-float-slow absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-accent/25 opacity-50" />
          <div className="glow-orb animate-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-primary/10 opacity-40" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Premium Digital Marketplace
          </div>

          <h1 className="animate-fade-up font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
            style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">ProCraft</span>{' '}
            <span className="text-foreground">Services</span>
          </h1>

          <p className="animate-fade-up mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed"
            style={{ animationDelay: '0.2s' }}>
            Your one-stop shop for premium digital products and professional courses.
          </p>

          {/* Feature pills */}
          <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3 text-sm"
            style={{ animationDelay: '0.3s' }}>
            {[
              { icon: ShieldCheck, text: 'Secure Checkout' },
              { icon: Zap, text: 'Instant Access' },
              { icon: Sparkles, text: 'Top-rated Products' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-foreground/70 backdrop-blur-sm">
                <Icon className="h-4 w-4 text-primary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Banner Carousel ─── */}
      <div className="container mx-auto px-4">
        <AddToHomeScreen banners={banners} />
      </div>

      {/* ─── Products ─── */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Browse Our <span className="gradient-text">Catalog</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Explore our hand-picked selection of top-tier digital products.
          </p>
        </div>
        <ProductListings products={products} />
      </section>

      {/* ─── Reviews ─── */}
      <CustomerReviews />

      <Footer />
    </>
  );
}
