'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.49 3.994c-1.336 0-2.58.55-3.48 1.44a4.832 4.832 0 0 0-1.44 3.48C11.57 10.25 10.25 11.57 8.914 11.57c-1.337 0-2.58-.55-3.48-1.44A4.832 4.832 0 0 0 4 6.65v10.662a.687.687 0 0 0 .688.688H7.35a.687.687 0 0 0 .688-.688V6.65c0-1.336.55-2.58 1.44-3.48a4.832 4.832 0 0 1 3.48-1.44c1.337 0 2.58.55 3.48 1.44a4.832 4.832 0 0 1 1.44 3.48V12a5.5 5.5 0 1 0-5.5-5.5v3.3a2.2 2.2 0 1 1-2.2-2.2.687.687 0 0 0-.688-.687H6.687a.687.687 0 0 0-.688.688A5.5 5.5 0 1 0 12 17.5v-1.8a2.2 2.2 0 1 1 2.2 2.2.687.687 0 0 0 .688.688h1.325a.687.687 0 0 0 .688-.688V9.134a8.132 8.132 0 0 0-2.407-5.14Z" />
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
          <span className="opacity-50">Built with ❤️ for creators everywhere</span>
        </div>
      </div>
    </footer>
  );
}
