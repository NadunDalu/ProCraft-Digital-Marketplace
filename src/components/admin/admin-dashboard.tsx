"use client";

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section id="products" className="p-4 border rounded">
        <ProductsSection />
      </section>
      <section id="banners" className="p-4 border rounded">
        <BannersSection />
      </section>
    </div>
  );
}

function ProductsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const Dynamic = require('./admin-products').default as typeof import('./admin-products').default;
  return <Dynamic />;
}

function BannersSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const Dynamic = require('./admin-banners').default as typeof import('./admin-banners').default;
  return <Dynamic />;
}
