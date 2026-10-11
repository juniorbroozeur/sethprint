import 'server-only';
import { createHmac, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'spd_admin';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 heures

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('ADMIN_SESSION_SECRET manquant ou trop court (32 caractères minimum)');
  return s;
}

// ADMIN_PASSWORD_HASH = "sel:hash" en hexadécimal, généré par scripts/hash-password.mjs
export function verifyPassword(password: string): boolean {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored || typeof password !== 'string' || password.length > 200) return false;
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(): string {
  const payload = `admin.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const i = token.lastIndexOf('.');
  if (i <= 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const exp = Number(payload.split('.')[1]);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  return a.length === b.length && timingSafeEqual(a, b);
}

// À appeler côté serveur dans CHAQUE route/page admin (pas seulement un middleware).
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

// Protection CSRF en complément du cookie SameSite=Strict :
// refuse les requêtes qui modifient des données si elles viennent d'un autre site.
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
