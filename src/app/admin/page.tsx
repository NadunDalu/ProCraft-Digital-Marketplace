import AdminDashboard from '@/components/admin/admin-dashboard';

export const metadata = {
  title: 'Admin - ProCraft',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ProCraft Admin Panel</h1>
        <AdminDashboard />
      </div>
    </div>
  );
}
