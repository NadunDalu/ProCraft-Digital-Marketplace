'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Giveaways', href: '/giveaways' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61565529617958', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/procraft-services/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://tiktok.com', label: 'TikTok' },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="relative overflow-hidden mt-20 border-t border-border/40">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 items-start">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image src="/images/logo.png" width={120} height={32} alt="ProCraft Services Logo" className="h-8 w-auto object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Premium digital products and professional courses to accelerate your growth.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Navigation</p>
          <ul className="space-y-2">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="group flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Follow Us</p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card/70 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:bg-primary/8 hover:shadow-md"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-4 text-xs text-muted-foreground gap-2">
          <span>© {year ?? '...'} ProCraft Services. All rights reserved.</span>
          <span className="opacity-50">Built with 🤖 for Web by Cybor</span>
        </div>
      </div>
    </footer>
  );
}
