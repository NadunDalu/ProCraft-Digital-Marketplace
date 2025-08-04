import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';
import { cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!getApps().length) {
    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
      );
  initializeApp({
    credential: cert(serviceAccount),
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

    // Set cookie that expires in 1 hour
    const expiresIn = 60 * 60 * 1000;
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: expiresIn / 1000,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    });
    return response;
}
