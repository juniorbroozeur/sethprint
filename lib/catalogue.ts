// Types et constantes partagés entre le catalogue public et le panel admin.

// Ordre d'affichage des catégories dans la grille "Tous".
export const CATEGORIES = [
  'textiles',
  'objets-promo',
  'cartes-badges',
  'emballages',
  'packaging',
  'impression-grand-format',
] as const;

export type CategoryId = (typeof CATEGORIES)[number];

// Les 4 langues du site (fichiers messages/*.json).
export const LOCALES = ['fr', 'en', 'my', 'th'] as const;
export type Loc = (typeof LOCALES)[number];

// Texte traduit : le français est obligatoire, les autres langues retombent sur le français.
export type I18nText = Partial<Record<Loc, string>> & { fr: string };

export type Product = {
  id: number;
  cat: CategoryId;
  img: string;          // '/images/products/...' (anciennes images) ou URL Supabase (nouvelles)
  nom: I18nText;
  tag: I18nText;
  sort: number;
};

export function tr(text: I18nText, locale: string): string {
  return (text as Record<string, string | undefined>)[locale] || text.fr;
}
