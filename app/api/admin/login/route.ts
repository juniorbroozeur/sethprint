import { NextResponse } from 'next/server';
import { createSessionToken, isSameOrigin, SESSION_COOKIE, SESSION_MAX_AGE, verifyPassword } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 });

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyPassword(password)) {
    // Petit délai pour freiner le brute-force (voir README : à compléter par un vrai rate-limit si besoin)
    await new Promise(r => setTimeout(r, 800));
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
