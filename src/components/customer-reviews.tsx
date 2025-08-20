
'use client';

import React from 'react';
import { reviews } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function CustomerReviews() {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <div className="py-12">
      <h2 className="text-center font-headline text-3xl font-bold mb-8 flex items-center justify-center gap-3">
        <MessageCircle className="h-8 w-8 text-primary" />
        What Our Customers Say
      </h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
                <Card className="h-full bg-card overflow-hidden">
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
