import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';
import { isAdmin, isSameOrigin } from '@/lib/auth';
import { supabaseAdmin, BUCKET } from '@/lib/supabase';
import { CATEGORIES, LOCALES, type CategoryId, type I18nText } from '@/lib/catalogue';

export const runtime = 'nodejs';

// Vercel limite le corps d'une requête à 4,5 Mo : on reste en dessous.
const MAX_BYTES = 4 * 1024 * 1024;
const MAX_TEXT = 80;

// Type réel du fichier d'après ses premiers octets (on ne fait pas confiance au nom ni au MIME envoyé).
function detectImage(buf: Buffer): { ext: string; mime: string } | null {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: 'jpg', mime: 'image/jpeg' };
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return { ext: 'png', mime: 'image/png' };
  if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP')
    return { ext: 'webp', mime: 'image/webp' };
  return null;
}

function readI18n(form: FormData, field: 'nom' | 'tag'): I18nText | string {
  const out: Partial<Record<string, string>> = {};
  for (const loc of LOCALES) {
    const v = form.get(`${field}_${loc}`);
    if (typeof v !== 'string') continue;
    const s = v.trim();
    if (s.length > MAX_TEXT) return `Le champ ${field} (${loc}) dépasse ${MAX_TEXT} caractères`;
    if (s) out[loc] = s;
  }
  if (!out.fr) return `Le champ ${field} en français est obligatoire`;
  return out as I18nText;
}

function revalidateCatalogue() {
  revalidatePath('/[locale]/catalogue', 'page');
  revalidatePath('/[locale]/admin', 'page');
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: 'Formulaire invalide' }, { status: 400 });

  const cat = form.get('cat');
  if (typeof cat !== 'string' || !CATEGORIES.includes(cat as CategoryId))
    return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 });

  const nom = readI18n(form, 'nom');
  if (typeof nom === 'string') return NextResponse.json({ error: nom }, { status: 400 });
  const tag = readI18n(form, 'tag');
  if (typeof tag === 'string') return NextResponse.json({ error: tag }, { status: 400 });

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'Image manquante' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'Image trop lourde (4 Mo max)' }, { status: 413 });

  const buf = Buffer.from(await file.arrayBuffer());
  const type = detectImage(buf);
  if (!type) return NextResponse.json({ error: 'Format refusé (JPG, PNG ou WebP uniquement)' }, { status: 415 });

  const sb = supabaseAdmin();

  // Nom de fichier généré côté serveur : aucun contrôle de l'utilisateur sur le chemin.
  const path = `${cat}/${randomUUID()}.${type.ext}`;
  const up = await sb.storage.from(BUCKET).upload(path, buf, { contentType: type.mime, upsert: false });
  if (up.error) return NextResponse.json({ error: `Upload échoué : ${up.error.message}` }, { status: 500 });

  const img = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  // Nouveau produit placé à la fin de sa catégorie
  const last = await sb.from('products').select('sort').eq('cat', cat).order('sort', { ascending: false }).limit(1);
  const sort = (last.data?.[0]?.sort ?? 0) + 1;

  const ins = await sb.from('products').insert({ cat, img, nom, tag, sort }).select().single();
  if (ins.error) {
    await sb.storage.from(BUCKET).remove([path]); // pas d'image orpheline
    return NextResponse.json({ error: `Enregistrement échoué : ${ins.error.message}` }, { status: 500 });
  }

  revalidateCatalogue();
  return NextResponse.json({ product: ins.data }, { status: 201 });
}
