'use client';

import { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendation';
import { getProductById, type Product } from '@/lib/products';
import ProductCard from './product-card';
import { Sparkles } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const BROWSING_HISTORY_KEY = 'procraft-browsing-history';

export default function ProductRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const history: string[] = JSON.parse(localStorage.getItem(BROWSING_HISTORY_KEY) || '[]');
        if (history.length === 0) {
          setIsLoading(false);
          return;
        }

        const result = await getProductRecommendations({
          browsingHistory: history,
          numberOfRecommendations: 3,
        });

        if (result && result.recommendations) {
          const recommendedProducts = result.recommendations
            .map(id => getProductById(id))
            .filter((p): p is Product => p !== undefined);
          setRecommendations(recommendedProducts);
        }
      } catch (e) {
        console.error("Failed to fetch product recommendations:", e);
        setError("Could not load recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground mb-6 flex items-center">
          <Sparkles className="mr-3 h-8 w-8 text-accent" />
          Recommended For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return null; // Don't show the component if there's an error or no recommendations
  }

  return (
    <div>
      <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground mb-6 flex items-center">
        <Sparkles className="mr-3 h-8 w-8 text-accent" />
        Recommended For You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
