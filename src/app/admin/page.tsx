import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Package, Image, Trophy, BarChart3, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Admin - ProCraft',
};

const sections = [
  {
    title: 'Products',
    desc: 'Manage your digital product catalog',
    href: '/admin/products',
    icon: Package,
    gradient: 'from-blue-500 to-primary',
    bg: 'from-blue-500/10 to-primary/10',
  },
  {
    title: 'Banners',
    desc: 'Upload and manage homepage banners',
    href: '/admin/banners',
    icon: Image,
    gradient: 'from-primary to-accent',
    bg: 'from-primary/10 to-accent/10',
  },
  {
    title: 'Giveaways',
    desc: 'Manage giveaways and prizes',
    href: '/admin/giveaways',
    icon: Trophy,
    gradient: 'from-accent to-pink-500',
    bg: 'from-accent/10 to-pink-500/10',
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <Sparkles className="h-3 w-3" />
          Dashboard
        </div>
        <h2 className="text-3xl font-bold tracking-tight gradient-text">Admin Panel</h2>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back. Manage your store from here.</p>
      </div>

      {/* Quick action cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ title, desc, href, icon: Icon, gradient, bg }) => (
          <a
            key={href}
            href={href}
            className="group block rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${gradient}`} />
            <div className="p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${bg} border border-border/40`}>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                Manage <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
