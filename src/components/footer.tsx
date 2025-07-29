'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.49 3.994c-1.336 0-2.58.55-3.48 1.44a4.832 4.832 0 0 0-1.44 3.48C11.57 10.25 10.25 11.57 8.914 11.57c-1.337 0-2.58-.55-3.48-1.44A4.832 4.832 0 0 0 4 6.65v10.662a.687.687 0 0 0 .688.688H7.35a.687.687 0 0 0 .688-.688V6.65c0-1.336.55-2.58 1.44-3.48a4.832 4.832 0 0 1 3.48-1.44c1.337 0 2.58.55 3.48 1.44a4.832 4.832 0 0 1 1.44 3.48V12a5.5 5.5 0 1 0-5.5-5.5v3.3a2.2 2.2 0 1 1-2.2-2.2.687.687 0 0 0-.688-.687H6.687a.687.687 0 0 0-.688.688A5.5 5.5 0 1 0 12 17.5v-1.8a2.2 2.2 0 1 1 2.2 2.2.687.687 0 0 0 .688.688h1.325a.687.687 0 0 0 .688-.688V9.134a8.132 8.132 0 0 0-2.407-5.14Z"/>
    </svg>
  );

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary/90 text-primary-foreground mt-12">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={120}
              height={32}
              alt="ProCraft Services Logo"
              data-ai-hint="logo"
              className="brightness-0 invert"
            />
          </Link>
        </div>
        <p className="text-sm text-primary-foreground/80 text-center order-last sm:order-none">
          &copy; {year} ProCraft Services. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
            <a href="https://web.facebook.com/profile.php?id=61565529617958" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.linkedin.com/company/procraft-services/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <TikTokIcon className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
                //commnt
            </a>
        </div>
      </div>
    </footer>
  );
}
