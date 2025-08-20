
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle } from 'lucide-react';

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
            <CarouselItem key={review.id} className="md:basis-1/2">
              <div className="p-4">
                <Card className="h-full bg-card">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
