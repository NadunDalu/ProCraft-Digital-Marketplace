import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const response = NextResponse.json({ success: true });

    // Store token in a secure httpOnly cookie
    response.cookies.set('admin-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
