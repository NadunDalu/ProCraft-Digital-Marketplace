import Link from 'next/link';
import { CodeXml } from 'lucide-react';
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
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-foreground" />
          <span className="font-bold font-headline text-lg tracking-wider text-foreground">
            ProCraft
          </span>
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
