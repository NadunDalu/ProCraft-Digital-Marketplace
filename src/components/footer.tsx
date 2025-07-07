import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary/90 text-primary-foreground mt-12">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <Image
            src="https://placehold.co/150x40.png"
            width={120}
            height={32}
            alt="ProCraft Services Logo"
            data-ai-hint="logo"
            className="brightness-0 invert"
          />
        </div>
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} ProCraft Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
