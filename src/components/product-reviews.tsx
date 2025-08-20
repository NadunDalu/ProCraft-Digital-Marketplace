
'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type ProductReviewsProps = {
  reviews: Review[];
};

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
    );

  return (
    <div className="py-12 bg-card rounded-lg shadow-lg">
      <h2 className="text-center font-headline text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-card-foreground">
        <MessageCircle className="h-8 w-8 text-primary" />
        Customer Reviews
      </h2>
       <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
            {reviews.map((review) => (
            <CarouselItem key={review.id} className="md:basis-1/2">
                <div className="p-4">
                    <Card className="bg-background overflow-hidden">
                        <CardContent className="p-0">
                        {review.reviewImage && (
                            <div className="relative w-full aspect-video">
                                <Image src={review.reviewImage} alt={`Review from ${review.name}`} layout="fill" objectFit="cover" data-ai-hint="screenshot review" />
                            </div>
                        )}
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
