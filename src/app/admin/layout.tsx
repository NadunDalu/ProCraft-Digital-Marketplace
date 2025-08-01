
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutGrid, Gift, Package, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.startsWith('/admin/products')) return 'Products';
    if (pathname.startsWith('/admin/giveaways')) return 'Giveaways';
    return 'Admin';
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2">
                <Image
                    src="/images/logo.png"
                    width={120}
                    height={32}
                    alt="ProCraft Services Logo"
                    data-ai-hint="logo"
                />
                <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/admin'}
                  tooltip="Dashboard"
                >
                  <Link href="/admin">
                    <LayoutGrid />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/admin/products')}
                   tooltip="Products"
                >
                  <Link href="/admin/products">
                    <Package />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/admin/giveaways')}
                   tooltip="Giveaways"
                >
                  <Link href="/admin/giveaways">
                    <Gift />
                    <span>Giveaways</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex justify-between items-center p-4 border-b bg-card">
                <h1 className="text-2xl font-bold font-headline">{getPageTitle()}</h1>
                <Button variant="outline" asChild>
                    <Link href="/"> <Home className="mr-2 h-4 w-4" /> Go to Site</Link>
                </Button>
            </header>
            <main className="p-4 bg-muted/40 flex-grow">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
