"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon, Plus, Trash2, Loader2 } from 'lucide-react';

type Banner = { id: string; image: string; createdAt?: string };

export default function AdminBanners() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<Banner[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/banners');
      if (!res.ok) throw new Error('Failed to load banners');
      setBanners(await res.json());
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message ?? 'Failed to load banners', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onAddBanner(file: File) {
    try {
      const base64 = await toBase64(file);
      const newBanner: Banner = { id: crypto.randomUUID(), image: base64 };
      const res = await fetch('/api/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBanner) });
      if (!res.ok) throw new Error('Failed to add banner');
      toast({ title: '✅ Banner added' });
      await load();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message ?? 'Failed to add banner', variant: 'destructive' });
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this banner?')) return;
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete banner');
      toast({ title: '🗑️ Banner deleted' });
      await load();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message ?? 'Failed to delete banner', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" /> Banners
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Manage homepage promotional banners</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onAddBanner(f);
              if (inputRef.current) inputRef.current.value = '';
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Banner
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading banners…
        </div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 py-16 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No banners yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Click "Add Banner" to upload one</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-200">
              {/* Image */}
              <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt="Banner" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-xs text-muted-foreground truncate">
                  {new Date(b.createdAt ?? Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <button
                  onClick={() => onDelete(b.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
