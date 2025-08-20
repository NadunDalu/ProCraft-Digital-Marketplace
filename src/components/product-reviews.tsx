
'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle } from 'lucide-react';

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
          <Card key={review.id} className="bg-background">
            <CardContent className="flex flex-col items-center text-center p-6 gap-4">
              <Avatar className="w-20 h-20 border-2 border-primary/20">
                <AvatarImage src={review.avatar} alt={review.name} data-ai-hint="person smiling" />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="text-muted-foreground text-base italic">"{review.review}"</p>
              <p className="font-semibold text-lg mt-2">{review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
