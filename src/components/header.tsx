import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const navLinkClasses = cn(
    buttonVariants({ variant: 'ghost' }),
    "text-foreground hover:bg-primary hover:text-primary-foreground"
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center">
          <Image 
            src="https://placehold.co/150x40.png"
            width={120}
            height={32}
            alt="ProCraft Services Logo"
            data-ai-hint="logo"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          <Link href="/" className={navLinkClasses}>
            Home
          </Link>
          <Link href="/about" className={navLinkClasses}>
            About Us
          </Link>
          <Link href="/contact" className={navLinkClasses}>
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
        </div>
      </div>
    </header>
  );
}
