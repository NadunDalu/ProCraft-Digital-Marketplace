export const metadata = {
  title: 'Admin - ProCraft',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">ProCraft Admin Panel</h1>
        <p className="text-sm text-muted-foreground mb-6">Use the sidebar to manage Products and Banners.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/admin/products">Manage Products</a></li>
          <li><a className="underline" href="/admin/banners">Manage Banners</a></li>
        </ul>
      </div>
    </div>
  );
}
