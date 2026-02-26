
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

const WINNER_BANNER_KEY = 'procraft-winner-banner';

type WinnerBannerData = {
  winnerName: string;
  giveawayName: string;
  winnerImage: string;
}

function GiveawayCard({ giveaway }: { giveaway: any }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const end = new Date(giveaway.endDate).getTime();
    if (isNaN(end)) return;

    const tick = () => {
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setIsEnded(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [giveaway.endDate]);

  return (
    <Card className={`flex flex-col w-full transition-colors ${isEnded ? 'opacity-80' : 'hover:border-primary/50'}`}>
      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
        <div className={`relative h-48 w-full bg-muted flex items-center justify-center ${isEnded ? 'grayscale object-cover object-center' : ''}`}>
          {giveaway.image ? (
            <Image
              src={giveaway.image}
              alt={giveaway.title}
              layout="fill"
              objectFit="cover"
              className={`rounded-t-lg ${!isEnded && 'hover:scale-105 transition-transform duration-300'}`}
            />
          ) : (
            <Gift className="h-10 w-10 text-muted-foreground/30" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <CardTitle className="font-headline text-xl">{giveaway.title}</CardTitle>
        {giveaway.description && (
          <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{giveaway.description}</p>
        )}
        <div className="mt-4 space-y-2 text-sm font-medium text-foreground/80">
          <div className="flex items-center gap-2">
            <Calendar className={`h-4 w-4 ${isEnded ? 'text-muted-foreground' : 'text-primary'}`} />
            <span>
              {isEnded ? (
                <span className="text-red-500/80 font-bold">Giveaway Ended</span>
              ) : timeLeft ? (
                <span>Ends in: <span className="text-primary font-semibold">{timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s</span></span>
              ) : (
                <span>Ends: <span className="text-primary">{new Date(giveaway.endDate).toLocaleString()}</span></span>
              )}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isEnded ? (
          <div className="w-full text-center p-2 rounded-lg bg-muted text-muted-foreground font-semibold border text-sm">
            Ended
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full font-semibold shadow-sm shadow-primary/20">
                <Gift className="mr-2 h-4 w-4" />
                Enter Giveaway
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl rounded-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">{giveaway.title}</DialogTitle>
                <DialogDescription>
                  Giveaway Details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {giveaway.image && (
                  <div className="relative h-64 w-full bg-muted rounded-xl overflow-hidden">
                    <Image
                      src={giveaway.image}
                      alt={giveaway.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}

                <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {giveaway.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-primary/10 text-primary rounded-xl border border-primary/20 font-medium text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Contest Ends: {new Date(giveaway.endDate).toLocaleString()}</span>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl">
                  <h4 className="font-semibold text-sm mb-2">How to enter:</h4>
                  {giveaway.instructions ? (
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {giveaway.instructions}
                    </p>
                  ) : (
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Create an account or log in to ProCraft.</li>
                      <li>Make sure your contact information is up to date.</li>
                    </ul>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}

export default function GiveawaysPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [latestWinner, setLatestWinner] = useState<WinnerBannerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [giveawaysList, setGiveawaysList] = useState<any[]>([]);
  const [winnersList, setWinnersList] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [gRes, wRes] = await Promise.all([
          fetch('/api/giveaways', { next: { revalidate: 0 } }),
          fetch('/api/winners', { next: { revalidate: 0 } })
        ]);
        const gData = await gRes.json();
        const wData = await wRes.json();

        setGiveawaysList(gData);
        setWinnersList(wData);

        if (wData && wData.length > 0) {
          const first = wData[0];
          setLatestWinner({
            winnerName: first.name,
            giveawayName: first.prize || (first.giveawayId ? gData.find((g: any) => g.id === first.giveawayId)?.title : 'a mystery prize'),
            winnerImage: first.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${first.name}`
          });
        }
      } catch (err) {
        console.error("Failed to load giveaways info", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            ProCraft Giveaways
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Check out our exciting giveaways and stand a chance to win premium digital products. Good luck!
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loader for giveaways
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col w-full">
                <CardHeader><Skeleton className="h-48 w-full rounded-t-lg" /></CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : giveawaysList.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed rounded-xl">
              <Gift className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p>No active giveaways right now. Check back later!</p>
            </div>
          ) : giveawaysList.map((giveaway) => (
            <GiveawayCard key={giveaway.id || giveaway._id} giveaway={giveaway} />
          ))}
        </div>

        {winnersList.length > 0 && (
          <div className="mt-24">
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
                {winnersList.map((winner, index) => (
                  <CarouselItem key={winner.id || index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="bg-card">
                        <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={winner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.name}`} alt={winner.name} data-ai-hint="person smiling" />
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
        )}
      </div>
      <Footer />
    </>
  );
}
