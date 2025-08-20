
'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type ProductReviewsProps = {
  reviews: Review[];
};

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="py-12 bg-card rounded-lg shadow-lg">
      <h2 className="text-center font-headline text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-card-foreground">
        <MessageCircle className="h-8 w-8 text-primary" />
        Customer Reviews
      </h2>
      <div
        className="w-full max-w-6xl mx-auto overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, index) => (
            <div key={index} className="w-[400px] flex-shrink-0 p-4">
              <Card className="bg-background overflow-hidden">
                <CardContent className="p-0">
                  {review.reviewImage && (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={review.reviewImage}
                        alt={`Review from ${review.name}`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="screenshot review"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
