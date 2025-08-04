import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

if (!getAuth().app) {
  initializeApp({
    credential: applicationDefault(),
  });
}

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const isAdmin = decoded.email === 'admin@example.com'; // Or check Firebase custom claims

    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
