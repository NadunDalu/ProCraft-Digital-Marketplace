
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/site-reviews')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews([...data, ...data]); // duplicate for marquee
        }
      })
      .catch(err => console.error("Failed to fetch reviews", err));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Real Customers
        </div>
        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          What Our <span className="gradient-text">Customers</span> Say
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="w-full overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
          {reviews.map((review, index) => (
            <div key={index} className="w-[380px] flex-shrink-0">
              <div className="h-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
                {review.image ? (
                  <div className="relative w-full aspect-video border-b border-border/40">
                    <Image
                      src={review.image}
                      alt={`Review from ${review.name}`}
                      fill
                      className="object-cover"
                      sizes="380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="flex-grow p-6 flex flex-col justify-center bg-primary/5">
                    <MessageSquareQuote className="h-8 w-8 text-primary/40 mb-3" />
                    <p className="text-foreground/90 italic text-sm leading-relaxed mb-4">"{review.text}"</p>
                  </div>
                )}
                <div className="p-4 bg-muted/20 border-t border-border/40">
                  <p className="font-semibold text-sm truncate">— {review.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
