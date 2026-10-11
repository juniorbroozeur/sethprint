import { NextResponse } from 'next/server';
import { isSameOrigin, SESSION_COOKIE } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
