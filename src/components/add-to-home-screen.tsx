
'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Download, Share, AppWindow } from 'lucide-react';
import Image from 'next/image';

const instructions = [
  {
    icon: <Smartphone className="h-10 w-10 text-white" />,
    title: "Easy Access",
    description: "Get instant access to our store right from your home screen."
  },
  {
    icon: <Download className="h-10 w-10 text-white" />,
    title: "Install on Any Device",
    description: "Follow simple steps for iOS or Android."
  },
  {
    icon: <Share className="h-10 w-10 text-white" />,
    title: "For iOS",
    description: "Tap the 'Share' icon, then 'Add to Home Screen'."
  },
  {
    icon: <AppWindow className="h-10 w-10 text-white" />,
    title: "For Android",
    description: "Tap the menu button, then 'Install app'."
  },
];

export default function AddToHomeScreen() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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
          {instructions.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-full">
                <Card className="h-full bg-primary/10 border-none relative text-white overflow-hidden">
                   <Image
                      src="https://placehold.co/1200x300.png"
                      alt="Add to home screen background"
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0 z-0 opacity-50"
                      data-ai-hint="abstract technology"
                    />
                  <CardContent className="relative z-10 flex flex-col items-center justify-center text-center p-6 gap-3 h-[200px]">
                    <div>{item.icon}</div>
                    <h3 className="font-headline text-2xl font-semibold">{item.title}</h3>
                    <p className="text-base text-white/80 max-w-sm">{item.description}</p>
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
