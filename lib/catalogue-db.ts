import 'server-only';
import { supabaseAdmin } from './supabase';
import { CATEGORIES, type Product } from './catalogue';

// Lit tous les produits, triés comme avant : par catégorie, puis par ordre.
// En cas d'erreur on lève une exception : Next garde alors la dernière version
// valide de la page en cache au lieu d'afficher un catalogue vide.
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin()
    .from('products')
    .select('id, cat, img, nom, tag, sort')
    .order('sort', { ascending: true })
    .order('id', { ascending: true });

  if (error) throw new Error(`Lecture du catalogue impossible : ${error.message}`);

  return (data as Product[]).sort(
    (a, b) => CATEGORIES.indexOf(a.cat) - CATEGORIES.indexOf(b.cat) || a.sort - b.sort || a.id - b.id,
  );
}
