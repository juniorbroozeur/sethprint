export type ProductCategory =
  | 'tous'
  | 't-shirts'
  | 'tasses'
  | 'cartes'
  | 'baches'
  | 'flyers';

export interface Product {
  slug: string;
  nom: string;
  categorie: ProductCategory;
  description: string;
  images: string[];       // chemins depuis /public/images/products/
  whatsapp?: string;      // message pré-rempli WhatsApp
}

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'tous',     label: 'Tous' },
  { id: 't-shirts', label: 'T-Shirts & Pull-over' },
  { id: 'tasses',   label: 'Tasses & Bracelets' },
  { id: 'cartes',   label: 'Cartes de visite' },
  { id: 'baches',   label: 'Bâches & Affiches' },
  { id: 'flyers',   label: 'Flyers & Dépliants' },
];

export const PRODUCTS: Product[] = [
  /* ── T-SHIRTS ── */
  {
    slug: 't-shirt-premium-blanc',
    nom: 'T-Shirt Premium Blanc',
    categorie: 't-shirts',
    description: 'Impression DTF haute définition sur coton 180g. Rendu éclatant, lavable 60°C.',
    images: ['/images/products/t-shirts/tshirt-blanc.jpg'],
    whatsapp: 'Bonjour, je voudrais commander un T-Shirt Premium Blanc.',
  },
  {
    slug: 't-shirt-noir-personnalise',
    nom: 'T-Shirt Noir Personnalisé',
    categorie: 't-shirts',
    description: 'Fond noir profond avec impression couleurs vives. Idéal pour événements et équipes.',
    images: ['/images/products/t-shirts/tshirt-noir.jpg'],
    whatsapp: 'Bonjour, je voudrais commander un T-Shirt Noir Personnalisé.',
  },

  /* ── TASSES ── */
  {
    slug: 'tasse-ceramique-personnalisee',
    nom: 'Tasse Céramique 330ml',
    categorie: 'tasses',
    description: 'Sublimation full-wrap 360°. Photo ou logo en qualité photo, résistant lave-vaisselle.',
    images: ['/images/products/tasses/tasse-ceramique.jpg'],
    whatsapp: 'Bonjour, je voudrais commander une Tasse Céramique personnalisée.',
  },

  /* ── CARTES ── */
  {
    slug: 'carte-visite-premium',
    nom: 'Carte de Visite Premium',
    categorie: 'cartes',
    description: 'Papier 350g couché mat ou brillant. Recto/verso couleur, coins carrés ou arrondis.',
    images: ['/images/products/cartes/carte-visite.jpg'],
    whatsapp: 'Bonjour, je voudrais commander des Cartes de Visite Premium.',
  },

  /* ── BACHES ── */
  {
    slug: 'bache-publicitaire',
    nom: 'Bâche Publicitaire',
    categorie: 'baches',
    description: 'Impression grand format sur bâche 510g. Résistante aux intempéries, ourlets et œillets inclus.',
    images: ['/images/products/baches/bache-pub.jpg'],
    whatsapp: 'Bonjour, je voudrais commander une Bâche Publicitaire.',
  },

  /* ── FLYERS ── */
  {
    slug: 'flyer-a5-couleur',
    nom: 'Flyer A5 Couleur',
    categorie: 'flyers',
    description: 'Papier 150g couché brillant, impression 4 couleurs recto/verso. Minimum 100 exemplaires.',
    images: ['/images/products/flyers/flyer-a5.jpg'],
    whatsapp: 'Bonjour, je voudrais commander des Flyers A5.',
  },
];

/* ── Helpers ── */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(cat: ProductCategory): Product[] {
  if (cat === 'tous') return PRODUCTS;
  return PRODUCTS.filter(p => p.categorie === cat);
}