'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Search } from 'lucide-react';

type ProductListingsProps = {
  products: Product[];
};

export default function ProductListings({ products }: ProductListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search bar */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none transition-colors group-focus-within:text-primary" />
          <input
            type="search"
            placeholder="Search products or courses…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-sm"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border ${selectedCategory === category
                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border/60 bg-card/60">
          <p className="text-xl font-semibold text-foreground/70">No products found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
