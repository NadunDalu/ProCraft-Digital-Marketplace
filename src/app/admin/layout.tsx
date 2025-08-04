
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
} from '@/components/ui/sidebar';
import { LayoutGrid, Gift, Package, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    // Also clear the server-side cookie
    await fetch('/api/auth/session', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
     <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
       <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}


function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // To keep this simple, we'll just check if a user is logged in.
                // For higher security, you could verify the user's claims (e.g., admin role) here.
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false && pathname !== '/admin/login') {
            router.replace('/admin/login');
        }
    }, [isAuthenticated, pathname, router]);

    if (isAuthenticated === null) {
        return (
             <div className="flex h-screen w-full items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }
    
    if (isAuthenticated === false && pathname !== '/admin/login') {
      return null;
    }
    
    return <>{children}</>;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return (
        <AuthGuard>
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                {children}
            </div>
        </AuthGuard>
    );
  }

  return (
    <AuthGuard>
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
                   <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith('/admin/winner-banner')}
                       tooltip="Winner Banner"
                    >
                      <Link href="/admin/winner-banner">
                        <Megaphone />
                        <span>Winner Banner</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <AdminHeader />
                <main className="flex-grow p-6">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
    </AuthGuard>
  );
}
