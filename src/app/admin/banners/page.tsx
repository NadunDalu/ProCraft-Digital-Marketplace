export const metadata = {
  title: 'Admin - Banners',
};

import AdminBanners from '@/components/admin/admin-banners';

export default function AdminBannersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>
        <AdminBanners />
      </div>
    </div>
  );
}
