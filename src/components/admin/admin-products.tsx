"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const empty: Product = {
  id: '',
  name: '',
  category: '',
  description: '',
  longDescription: '',
  image: '',
  price: 0,
  features: [],
  requirements: [],
  rating: 0,
  reviewCount: 0,
  reviews: [],
};

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save(p: Product) {
    if (!p.id) return;
    const exists = items.some(i => i.id === p.id);
    if (exists) {
      await fetch(`/api/products/${encodeURIComponent(p.id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    } else {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    }
    setEditing(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" /> Products
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your digital product catalog</p>
        </div>
        <Dialog open={!!editing && !editing.id} onOpenChange={(open) => { if (!open) setEditing(null); }}>
          <DialogTrigger asChild>
            <button
              onClick={() => setEditing({ ...empty })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="h-4 w-4" /> New Product
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl rounded-2xl">
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <DialogDescription>Create a new product for your catalog.</DialogDescription>
            </DialogHeader>
            {editing && !editing.id && <ProductEditor value={editing} onCancel={() => setEditing(null)} onSave={save} />}
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading products…
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 overflow-hidden bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p, i) => (
                  <tr key={p.id} className={`border-b border-border/30 transition-colors hover:bg-primary/4 ${i % 2 === 1 ? 'bg-muted/20' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                    <td className="px-4 py-3 text-primary font-semibold">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Dialog open={!!editing && editing.id === p.id} onOpenChange={(open) => { if (!open) setEditing(null); }}>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => setEditing(p)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/8 transition-all"
                            >
                              <Pencil className="h-3 w-3" /> Edit
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-3xl rounded-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>Update product information.</DialogDescription>
                            </DialogHeader>
                            {editing && editing.id === p.id && <ProductEditor value={editing} onCancel={() => setEditing(null)} onSave={save} />}
                          </DialogContent>
                        </Dialog>
                        <button
                          onClick={() => remove(p.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900/60 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-muted-foreground">
                      No products yet. Click "New Product" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductEditor({ value, onCancel, onSave }: { value: Product; onCancel: () => void; onSave: (p: Product) => void; }) {
  const [p, setP] = useState<Product>(value);
  return (
    <div className="space-y-3 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <F id="id" label="ID" v={p.id} set={v => setP({ ...p, id: v })} />
        <F id="name" label="Name" v={p.name} set={v => setP({ ...p, name: v })} />
        <F id="price" label="Price" type="number" v={String(p.price)} set={v => setP({ ...p, price: Number(v) || 0 })} />
        <F id="sale" label="Sale Price" type="number" v={p.salePrice ? String(p.salePrice) : ''} set={v => setP({ ...p, salePrice: v ? Number(v) : undefined })} />
        <F id="cat" label="Category" v={p.category} set={v => setP({ ...p, category: v })} />
        <F id="rating" label="Rating" type="number" v={String(p.rating)} set={v => setP({ ...p, rating: Number(v) || 0 })} />
        <F id="rcount" label="Review Count" type="number" v={String(p.reviewCount)} set={v => setP({ ...p, reviewCount: Number(v) || 0 })} />
        <ImageUpload label="Main Product Image" value={p.image} onChange={(d) => setP({ ...p, image: d })} />
        <ImageUpload label="Card Image (shown on listing)" value={(p as any).cardImage || ''} onChange={(d) => setP({ ...p, cardImage: d } as any)} />
      </div>
      <F id="desc" label="Short Description" area v={p.description} set={v => setP({ ...p, description: v })} />
      <F id="longdesc" label="Long Description" area v={p.longDescription} set={v => setP({ ...p, longDescription: v })} />
      <F id="features" label="Features (comma-separated)" area v={(p.features || []).join(',')} set={v => setP({ ...p, features: v.split(',').map(s => s.trim()).filter(Boolean) })} />
      <F id="req" label="Requirements (comma-separated)" area v={(p.requirements || []).join(',')} set={v => setP({ ...p, requirements: v.split(',').map(s => s.trim()).filter(Boolean) })} />
      <DialogFooter className="pt-3 gap-2">
        <DialogClose asChild>
          <button onClick={onCancel} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-muted transition-all">Cancel</button>
        </DialogClose>
        <button onClick={() => onSave(p)} className="rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
          Save Product
        </button>
      </DialogFooter>
    </div>
  );
}

function F({ id, label, v, set, type = 'text', area = false }: { id: string; label: string; v: string; set: (v: string) => void; type?: string; area?: boolean }) {
  const inputClass = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary";
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {area
        ? <textarea id={id} className={`${inputClass} min-h-[80px] resize-y`} value={v} onChange={(e) => set(e.target.value)} />
        : <input id={id} type={type} className={inputClass} value={v} onChange={(e) => set(e.target.value)} />
      }
    </label>
  );
}

function ImageUpload({ value, onChange, label }: { value: string; onChange: (dataUrl: string) => void; label: string }) {
  const [preview, setPreview] = useState<string>(value || '');
  useEffect(() => { setPreview(value || ''); }, [value]);

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) { alert('Image too large. Max 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { const r = reader.result as string; setPreview(r); onChange(r); };
    reader.readAsDataURL(file);
  }

  return (
    <div className="col-span-1 md:col-span-2 space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <label className="flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all p-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="h-24 w-auto rounded-lg border border-border/60 object-cover shadow-sm" />
        ) : (
          <span className="text-xs text-muted-foreground">Click to upload image</span>
        )}
      </label>
    </div>
  );
}
