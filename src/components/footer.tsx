import { Component } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary/90 text-primary-foreground mt-12">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Component className="h-6 w-6" />
          <p className="font-headline font-bold text-lg">ProCraft Services</p>
        </div>
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} ProCraft Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
