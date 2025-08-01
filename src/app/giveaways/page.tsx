
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Calendar, Trophy } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export default function GiveawaysPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  
  const giveaway = giveaways[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          ProCraft Giveaways
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          Check out our exciting giveaway and stand a chance to win a premium digital product. Good luck!
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <Card key={giveaway.id} className="flex flex-col max-w-2xl w-full">
            <CardHeader>
              <div className="relative h-64 w-full">
                <Image
                  src={giveaway.image}
                  alt={giveaway.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint="giveaway prize"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="font-headline text-2xl">{giveaway.title}</CardTitle>
              <p className="text-muted-foreground mt-2 text-base">{giveaway.description}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Ends on: {giveaway.endDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg py-6">
                <Gift className="mr-2 h-5 w-5" />
                Enter Giveaway
              </Button>
            </CardFooter>
          </Card>
      </div>
      
      <div className="mt-20">
        <h2 className="text-center font-headline text-3xl font-bold mb-8 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-amber-400" />
          Recent Winners
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
            {winners.map((winner) => (
              <CarouselItem key={winner.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="bg-card">
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                       <Avatar className="w-20 h-20">
                        <AvatarImage src={winner.avatar} alt={winner.name} data-ai-hint="person smiling" />
                        <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-semibold text-lg">{winner.name}</p>
                        <p className="text-sm text-muted-foreground">Won {winner.prize}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

const giveaways = [
  {
    id: 1,
    title: 'Lifetime Canva Pro Subscription',
    description: 'Win a lifetime subscription to Canva Pro and unlock your creative potential. Get access to millions of premium assets and tools to bring your ideas to life.',
    image: 'https://placehold.co/800x400.png',
    endDate: 'August 31, 2024',
  },
];

const winners = [
    { id: 1, name: 'John D.', prize: 'Canva Pro', avatar: 'https://placehold.co/100x100.png' },
    { id: 2, name: 'Sarah L.', prize: 'CCNA Course', avatar: 'https://placehold.co/100x100.png' },
    { id: 3, name: 'Mike R.', prize: 'ChatGPT Plus', avatar: 'https://placehold.co/100x100.png' },
    { id: 4, name: 'Emily T.', prize: 'Full-Stack Course', avatar: 'https://placehold.co/100x100.png' },
    { id: 5, name: 'Chris B.', prize: 'Try Hack Me', avatar: 'https://placehold.co/100x100.png' },
    { id: 6, name: 'Jessica P.', prize: 'UI/UX Masterclass', avatar: 'https://placehold.co/100x100.png' },
];
