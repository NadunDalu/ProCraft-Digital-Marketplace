'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/giveaways', label: 'Giveaways' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* frosted glass bar */}
      <div className="border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="mr-6 flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              width={110}
              height={30}
              alt="ProCraft Services Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    active
                      ? 'text-primary bg-primary/10 dark:bg-primary/15'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/6'
                  )}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-foreground/8 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border/40 bg-background/90 backdrop-blur-xl">
          <nav className="container py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/6'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
