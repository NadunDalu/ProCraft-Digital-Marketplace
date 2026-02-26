'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { LayoutDashboard, Package, Image as ImageIcon, ExternalLink, Trophy, LogOut, MessageSquareQuote } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/giveaways', label: 'Giveaways', icon: Trophy },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareQuote },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border/40 bg-card">
        {/* Branding */}
        <SidebarHeader className="h-16 flex items-center px-5 border-b border-border/40">
          <div className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight">
            ProCraft Admin
          </div>
        </SidebarHeader>

        <SidebarContent className="py-3 flex flex-col justify-between h-full">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-widest px-5 text-muted-foreground/70 mb-1">
                Menu
              </SidebarGroupLabel>
              <SidebarMenu>
                {navItems.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild tooltip={label}>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl mx-1 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-primary/8 transition-all group"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 group-hover:from-primary/25 group-hover:to-accent/25 transition-all">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator className="my-2 mx-4 opacity-50" />

            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="View Site">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl mx-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/6 transition-all group"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 group-hover:border-primary/30 transition-all">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                      <span>View Site</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </div>

          {/* Logout at the bottom */}
          <div className="pb-3 px-1">
            <SidebarSeparator className="my-2 mx-3 opacity-50" />
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl mx-1 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all group disabled:opacity-50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-red-200 dark:border-red-900/50 group-hover:border-red-400/50 transition-all">
                <LogOut className="h-3.5 w-3.5" />
              </span>
              <span>{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
            </button>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="bg-muted/20 dark:bg-muted/10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-xl px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg" />
            <h1 className="hidden sm:block font-semibold text-sm text-muted-foreground">
              ProCraft Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 transition-all disabled:opacity-50"
            >
              <LogOut className="h-3 w-3" />
              {loggingOut ? 'Signing out…' : 'Sign Out'}
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
