'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

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

export default function ContactPage() {
  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Have a question or feedback? We'd love to hear from you. Connect with us through our channels below.
        </p>
      </div>

      <div className="flex justify-center mt-12">
        <div className="w-full max-w-lg space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-center">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-primary"/>
                        <span>support@procraft.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-primary"/>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin className="w-5 h-5 text-primary"/>
                        <span>123 Digital Lane, Tech City, 45678</span>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-center">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-6 text-muted-foreground">
                    <Link href="https://web.facebook.com/profile.php?id=61565529617958" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                        <Facebook className="h-8 w-8" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="https://www.linkedin.com/company/procraft-services/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                        <Linkedin className="h-8 w-8" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                        <Instagram className="h-8 w-8" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                        <TikTokIcon className="h-8 w-8" />
                        <span className="sr-only">TikTok</span>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
