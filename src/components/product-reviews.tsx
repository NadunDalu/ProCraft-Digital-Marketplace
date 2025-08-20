
'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

type ProductReviewsProps = {
  reviews: Review[];
};

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <div className="py-12 bg-card rounded-lg shadow-lg">
      <h2 className="text-center font-headline text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-card-foreground">
        <MessageCircle className="h-8 w-8 text-primary" />
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-background overflow-hidden">
            <CardContent className="p-0">
               {review.reviewImage && (
                <div className="relative w-full aspect-video">
                    <Image src={review.reviewImage} alt={`Review from ${review.name}`} layout="fill" objectFit="cover" data-ai-hint="screenshot review" />
                </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
