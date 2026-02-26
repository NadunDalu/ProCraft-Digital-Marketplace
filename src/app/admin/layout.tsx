import Link from 'next/link';
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
import { LayoutDashboard, Package, Image as ImageIcon, ExternalLink, Trophy } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/giveaways', label: 'Giveaways', icon: Trophy },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border/40 bg-card">
        {/* Branding */}
        <SidebarHeader className="h-16 flex items-center px-5 border-b border-border/40">
          <div className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight">
            ProCraft Admin
          </div>
        </SidebarHeader>

        <SidebarContent className="py-3">
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
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
