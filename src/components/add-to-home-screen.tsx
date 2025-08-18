
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function AddToHomeScreen() {
  return (
    <div className="mb-12">
      <Card className="h-full bg-primary/10 border-none relative text-white overflow-hidden">
         <Image
            src="https://placehold.co/1200x300.png"
            alt="Add to home screen background"
            width={1200}
            height={300}
            className="w-full h-auto object-cover"
            data-ai-hint="abstract technology"
          />
      </Card>
    </div>
  );
}
