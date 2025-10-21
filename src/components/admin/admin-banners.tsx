"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
      toast({ title: 'Banner added' });
      await load();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message ?? 'Failed to add banner', variant: 'destructive' });
    }
  }

  async function onDelete(id: string) {
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete banner');
      toast({ title: 'Banner deleted' });
      await load();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message ?? 'Failed to delete banner', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Home Banners</h2>
        <div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onAddBanner(f);
            if (inputRef.current) inputRef.current.value = '';
          }} />
          <Button onClick={() => inputRef.current?.click()}>Add Banner</Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading banners…</p>
      ) : banners.length === 0 ? (
        <p className="text-sm text-muted-foreground">No banners yet. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((b) => (
            <Card key={b.id} className="overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">{new Date(b.createdAt ?? Date.now()).toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="aspect-[16/9] w-full bg-muted rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="Banner" className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="destructive" onClick={() => onDelete(b.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
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
