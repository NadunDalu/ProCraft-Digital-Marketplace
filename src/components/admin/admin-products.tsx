"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

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

type AdminProductsProps = { items: Product[]; readOnly?: boolean };

export default function AdminProducts({ items: initialItems, readOnly = false }: AdminProductsProps) {
  const [items, setItems] = useState<Product[]>(initialItems);
  const [editing, setEditing] = useState<Product | null>(null);

  function saveLocal(p: Product) {
    if (!p.id) return;
    setItems(prev => {
      const exists = prev.some(i => i.id === p.id);
      if (exists) return prev.map(i => (i.id === p.id ? p : i));
      return [...prev, p];
    });
    setEditing(null);
  }

  function removeLocal(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Products</h2>
        {readOnly ? (
          <div className="text-xs text-muted-foreground">Read-only preview</div>
        ) : (
          <Dialog open={!!editing && !editing.id} onOpenChange={(open) => { if (!open) setEditing(null); }}>
            <DialogTrigger asChild>
              <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => setEditing({ ...empty })}>New</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
                <DialogDescription>Create a new product for your catalog.</DialogDescription>
              </DialogHeader>
              {editing && !editing.id && (
                <ProductEditor value={editing} onCancel={() => setEditing(null)} onSave={saveLocal} />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              {!readOnly && <th className="p-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.price}</td>
                <td className="p-2 border">{p.category}</td>
                {!readOnly && (
                  <td className="p-2 border">
                    <Dialog open={!!editing && editing.id === p.id} onOpenChange={(open) => { if (!open) setEditing(null); }}>
                      <DialogTrigger asChild>
                        <button className="mr-2 underline" onClick={() => setEditing(p)}>Edit</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>Update product information.</DialogDescription>
                        </DialogHeader>
                        {editing && editing.id === p.id && (
                          <ProductEditor value={editing} onCancel={() => setEditing(null)} onSave={saveLocal} />
                        )}
                      </DialogContent>
                    </Dialog>
                    <button className="text-red-600 underline" onClick={() => removeLocal(p.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function ProductEditor({ value, onCancel, onSave }: { value: Product; onCancel: () => void; onSave: (p: Product) => void; }) {
  const [p, setP] = useState<Product>(value);
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <L id="id" label="ID" v={p.id} set={v => setP({ ...p, id: v })} />
        <L id="name" label="Name" v={p.name} set={v => setP({ ...p, name: v })} />
        <L id="price" label="Price" type="number" v={String(p.price)} set={v => setP({ ...p, price: Number(v) || 0 })} />
        <L id="salePrice" label="Sale Price" type="number" v={p.salePrice ? String(p.salePrice) : ''} set={v => setP({ ...p, salePrice: v ? Number(v) : undefined })} />
        <L id="category" label="Category" v={p.category} set={v => setP({ ...p, category: v })} />
  <ImageUpload label="Main Product Image" value={p.image} onChange={(dataUrl: string) => setP({ ...p, image: dataUrl })} />
  <ImageUpload label="Card Image (used on item cards)" value={(p as any).cardImage || ''} onChange={(dataUrl: string) => setP({ ...p, cardImage: dataUrl } as any)} />
        <L id="rating" label="Rating" type="number" v={String(p.rating)} set={v => setP({ ...p, rating: Number(v) || 0 })} />
        <L id="reviewCount" label="Review Count" type="number" v={String(p.reviewCount)} set={v => setP({ ...p, reviewCount: Number(v) || 0 })} />
      </div>
      <L id="description" label="Short Description" area v={p.description} set={v => setP({ ...p, description: v })} />
      <L id="longDescription" label="Long Description" area v={p.longDescription} set={v => setP({ ...p, longDescription: v })} />
      <L id="features" label="Features (comma-separated)" area v={(p.features || []).join(',')} set={v => setP({ ...p, features: v.split(',').map(s => s.trim()).filter(Boolean) })} />
      <L id="requirements" label="Requirements (comma-separated)" area v={(p.requirements || []).join(',')} set={v => setP({ ...p, requirements: v.split(',').map(s => s.trim()).filter(Boolean) })} />
      <DialogFooter className="pt-2">
        <DialogClose asChild>
          <button className="px-3 py-1 border rounded" onClick={onCancel}>Cancel</button>
        </DialogClose>
        <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => onSave(p)}>Save</button>
      </DialogFooter>
    </div>
  );
}

function L({ id, label, v, set, type = 'text', area = false }: { id: string; label: string; v: string; set: (v: string) => void; type?: string; area?: boolean }) {
  return (
    <label className="block">
      <div className="text-sm text-muted-foreground">{label}</div>
      {area ? (
        <textarea id={id} className="w-full p-2 border rounded" value={v} onChange={(e) => set(e.target.value)} />
      ) : (
        <input id={id} type={type} className="w-full p-2 border rounded" value={v} onChange={(e) => set(e.target.value)} />
      )}
    </label>
  );
}

function ImageUpload({ value, onChange, label = 'Product Image' }: { value: string; onChange: (dataUrl: string) => void; label?: string }) {
  const [preview, setPreview] = useState<string>(value || '');

  useEffect(() => {
    setPreview(value || '');
  }, [value]);

  async function handleFile(file: File) {
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Image too large. Max ${maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="col-span-1 md:col-span-2">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        className="w-full p-2 border rounded"
      />
      {preview && (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="h-32 w-auto rounded border" />
        </div>
      )}
    </div>
  );
}
