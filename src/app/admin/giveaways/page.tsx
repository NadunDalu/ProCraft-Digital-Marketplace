'use client';

import dynamic from 'next/dynamic';

const AdminGiveaways = dynamic(() => import('@/components/admin/admin-giveaways'), { ssr: false });

export default function Page() {
  return (
    <div className="p-4">
      <AdminGiveaways />
    </div>
  );
}
