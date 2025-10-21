import AdminProducts from './admin-products';
import { getProducts } from '@/lib/products';

export default async function AdminDashboard() {
  const items = await getProducts();
  return (
    <div className="space-y-6">
      <section id="products" className="p-4 border rounded">
        <AdminProducts items={items} readOnly />
      </section>
    </div>
  );
}
