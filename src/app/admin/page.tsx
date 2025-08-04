import { cookies } from 'next/headers';
import { getAuth } from '@/lib/firebase-admin';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package, Gift } from 'lucide-react';

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin-auth')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const user = await getAuth().verifyIdToken(token);

    if (user.email !== 'admin@example.com') {
      redirect('/admin/login');
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">All available products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Giveaways</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (err) {
    redirect('/admin/login');
  }
}
