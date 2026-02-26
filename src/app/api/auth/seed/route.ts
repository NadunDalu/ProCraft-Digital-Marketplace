import { NextResponse } from 'next/server';
import { createAdminUser } from '@/server/adminUserRepo';

// One-time setup endpoint to seed the admin user.
// Call GET /api/auth/seed to create/update the admin user.
export async function GET() {
    try {
        await createAdminUser('scaty2001', 'scaty2001');
        return NextResponse.json({ ok: true, message: 'Admin user created/updated successfully.' });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? 'Seed failed' }, { status: 500 });
    }
}
