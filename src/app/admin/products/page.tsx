export const metadata = {
  title: 'Admin - Products',
};

import AdminProducts from '@/components/admin/admin-products';

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
        <AdminProducts />
      </div>
    </div>
  );
}
