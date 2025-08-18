
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function AddToHomeScreen() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const images = [
    { src: 'https://placehold.co/1200x300.png', alt: 'Banner image 1', hint: 'abstract technology' },
    { src: 'https://placehold.co/1200x300.png', alt: 'Banner image 2', hint: 'digital product' },
    { src: 'https://placehold.co/1200x300.png', alt: 'Banner image 3', hint: 'online course' },
  ];

  return (
    <div className="mb-12">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="border-none relative overflow-hidden rounded-lg">
                   <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={300}
                      className="w-full h-auto object-cover"
                      data-ai-hint={image.hint}
                    />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
    </div>
  );
}
