'use client';

import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const contacts = [
  { icon: Mail, label: 'Email', value: 'support@procraft.com' },
  { icon: Phone, label: 'Phone', value: '+94 78 559 3170' },
  { icon: MapPin, label: 'Address', value: 'Colombo, Sri Lanka' },
];

const socials = [
  { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61565529617958', label: 'Facebook', color: 'hover:text-blue-500  hover:border-blue-400/50' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/procraft-services/', label: 'LinkedIn', color: 'hover:text-sky-500   hover:border-sky-400/50' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500  hover:border-pink-400/50' },
  { icon: TikTokIcon, href: 'https://tiktok.com', label: 'TikTok', color: 'hover:text-teal-500  hover:border-teal-400/50' },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="glow-orb animate-float absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-accent/15 opacity-60" />
        </div>
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Get In Touch
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a question or feedback? We'd love to hear from you. Connect with us through our channels below.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24 flex flex-col items-center gap-6 max-w-xl">
        {/* Contact info card */}
        <div className="w-full rounded-2xl border border-border/60 bg-card overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-border/40">
            <h2 className="font-headline text-lg font-bold">Contact Information</h2>
          </div>
          <div className="px-6 py-5 space-y-4">
            {contacts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="group flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-primary/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Icon className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Socials card */}
        <div className="w-full rounded-2xl border border-border/60 bg-card overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-4 border-b border-border/40">
            <h2 className="font-headline text-lg font-bold">Follow Us</h2>
          </div>
          <div className="px-6 py-5 flex justify-center gap-4">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/80 text-muted-foreground transition-all duration-200 hover:shadow-lg ${color}`}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
