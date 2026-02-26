import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { verifyAdminPassword } from '@/server/adminUserRepo';

const JWT_SECRET = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'procraft-admin-super-secret-key-2024'
);

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const valid = await verifyAdminPassword(username, password);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Create JWT token (valid for 10 minutes)
        const token = await new SignJWT({ username, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('10m')
            .sign(JWT_SECRET);

        const response = NextResponse.json({ ok: true });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        return response;
    } catch (e: any) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
