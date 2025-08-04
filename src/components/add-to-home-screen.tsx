
'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Download, ArrowDown, Share, AppWindow } from 'lucide-react';

const instructions = [
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Easy Access",
    description: "Get instant access to our store right from your home screen."
  },
  {
    icon: <Download className="h-8 w-8 text-primary" />,
    title: "Install on Any Device",
    description: "Follow simple steps to install on your iOS or Android device."
  },
  {
    icon: (
        <div className="flex items-center gap-2">
            <span className="text-primary">Tap <Share className="inline h-5 w-5" /></span>
        </div>
    ),
    title: "For iOS",
    description: "Tap the 'Share' icon in Safari, then 'Add to Home Screen'."
  },
  {
    icon: (
         <div className="flex items-center gap-2">
            <span className="text-primary">Tap <AppWindow className="inline h-5 w-5" /></span>
        </div>
    ),
    title: "For Android",
    description: "Tap the menu button in Chrome, then 'Install app'."
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
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="h-full bg-primary/10 border-primary/20">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6 gap-3 h-full">
                    <div>{item.icon}</div>
                    <h3 className="font-headline text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
