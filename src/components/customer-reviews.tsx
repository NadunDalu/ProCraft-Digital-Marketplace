
'use client';

import React from 'react';
import { reviews } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function CustomerReviews() {
  const duplicatedReviews = [...reviews, ...reviews];

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
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, index) => (
            <div key={index} className="w-[380px] flex-shrink-0 p-3">
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                {review.reviewImage && (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={review.reviewImage}
                      alt={`Review from ${review.name}`}
                      fill
                      className="object-cover"
                      sizes="380px"
                      data-ai-hint="screenshot review"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
