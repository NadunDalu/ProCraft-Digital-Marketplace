
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
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { giveaways, winners } from '@/lib/data';

const WINNER_BANNER_KEY = 'procraft-winner-banner';

type WinnerBannerData = {
    winnerName: string;
    giveawayName: string;
    winnerImage: string;
}

export default function GiveawaysPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [latestWinner, setLatestWinner] = useState<WinnerBannerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you might fetch this from a CMS or have it stored differently.
    // For this dummy data version, we'll just use the first winner from our data file.
    const defaultWinner = winners[0];
    setLatestWinner({
      winnerName: defaultWinner.name,
      giveawayName: defaultWinner.prize,
      winnerImage: defaultWinner.avatar
    });
    setIsLoading(false);
  }, []);

  const giveaway = giveaways[0];

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          ProCraft Giveaways
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          Check out our exciting giveaway and stand a chance to win a premium digital product. Good luck!
        </p>
      </div>

      <div className="mt-12">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-center text-2xl text-primary flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              Latest Winner Announcement!
            </CardTitle>
          </CardHeader>
           <CardContent className="flex flex-col items-center text-center gap-4">
              {isLoading ? (
                <>
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="h-6 w-3/4" />
                </>
              ) : latestWinner && (
                <>
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={latestWinner.winnerImage} alt={latestWinner.winnerName} data-ai-hint="person smiling" />
                    <AvatarFallback>{latestWinner.winnerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg text-foreground/90">
                    Congratulations to <span className="font-bold text-primary">{latestWinner.winnerName}</span> for winning the <span className="font-semibold">{latestWinner.giveawayName}</span> giveaway!
                    Stay tuned for our next exciting prize.
                  </p>
                </>
              )}
            </CardContent>
        </Card>
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
    <Footer />
    </>
  );
}
