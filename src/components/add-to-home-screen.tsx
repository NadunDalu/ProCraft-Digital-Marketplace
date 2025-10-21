
"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { Banner } from '@/lib/types';

export default function AddToHomeScreen({ banners }: { banners: Banner[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (!banners || banners.length === 0) return null;

  return (
    <div className="mb-12">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {banners.map((b) => (
              <CarouselItem key={b.id}>
                <Card className="border-none relative overflow-hidden rounded-lg">
                  <Image
                    src={b.image}
                    alt="Banner"
                    width={1200}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
    </div>
  );
}
