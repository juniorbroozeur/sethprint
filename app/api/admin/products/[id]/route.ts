import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin, isSameOrigin } from '@/lib/auth';
import { supabaseAdmin, BUCKET } from '@/lib/supabase';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> | { id: string } }; // Next 14 et 15

export async function DELETE(req: Request, ctx: Ctx) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await ctx.params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId <= 0)
    return NextResponse.json({ error: 'Identifiant invalide' }, { status: 400 });

  const sb = supabaseAdmin();
  const del = await sb.from('products').delete().eq('id', productId).select('img').single();
  if (del.error) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });

  // Supprime le fichier seulement s'il est dans notre bucket Supabase
  // (les anciennes images de public/ restent dans le repo).
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const img: string = del.data.img;
  const at = img.indexOf(marker);
  if (at !== -1) await sb.storage.from(BUCKET).remove([img.slice(at + marker.length)]);

  revalidatePath('/[locale]/catalogue', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return NextResponse.json({ ok: true });
}
