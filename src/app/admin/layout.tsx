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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <div className="px-2 font-semibold">Admin</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Products">
                  <Link href="/admin#products">Products</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Site">
                  <Link href="/">View Site</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-3">
          <SidebarTrigger />
          <div className="font-semibold">ProCraft Admin</div>
        </div>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
