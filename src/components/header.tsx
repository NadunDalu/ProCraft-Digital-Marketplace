import Link from 'next/link';
import ShoppingCart from './shopping-cart';
import { CodeXml } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-primary-foreground" />
          <span className="font-bold font-headline text-lg tracking-wider text-primary-foreground">
            ProCraft
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ShoppingCart />
          </nav>
        </div>
      </div>
    </header>
  );
}
