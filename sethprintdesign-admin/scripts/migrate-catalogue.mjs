// Copie une seule fois les 44 produits actuels dans Supabase.
// Les images existantes RESTENT dans public/images/products/ : seules les données sont migrées.
// Usage : node --env-file=.env.local scripts/migrate-catalogue.mjs
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants (lance avec --env-file=.env.local)');
  process.exit(1);
}

const P = [
  ['textiles','/images/products/textiles/textile-01.png','T-Shirt Personnalisé','Impression DTF'],
  ['textiles','/images/products/textiles/textile-02.png','Pull-over Branding','Impression Premium'],
  ['textiles','/images/products/textiles/textile-03.png','Veste Personnalisée','Textile Pro'],
  ['textiles','/images/products/textiles/textile-04.png','Sweatshirt Custom','Branding Textile'],
  ['textiles','/images/products/textiles/textile-05.png','Pull-over Événementiel','Impression Premium'],
  ['textiles','/images/products/textiles/textile-06.png','T-Shirt Logo','DTF Haute Qualité'],
  ['textiles','/images/products/textiles/textile-07.png','Pull-over Équipe','Personnalisation'],
  ['textiles','/images/products/textiles/textile-08.jpg','Textile Corporate','Branding'],
  ['textiles','/images/products/textiles/textile-09.png','Polo Personnalisé','Broderie Premium'],
  ['textiles','/images/products/textiles/textile-10.png','T-Shirt Événementiel','Impression DTF'],
  ['textiles','/images/products/textiles/textile-11.jpg','Textile Personnalisé','Branding Textile'],
  ['textiles','/images/products/textiles/textile-12.jpg','Tenue Corporate','Personnalisation'],
  ['textiles','/images/products/textiles/textile-13.jpg','Sweatshirt Brodé','Textile Pro'],
  ['textiles','/images/products/textiles/textile-14.jpg','Uniforme Personnalisé','Branding'],
  ['textiles','/images/products/textiles/textile-15.jpg','Réalisation Textile','Impression Premium'],
  ['textiles','/images/products/textiles/textile-16.jpg','Tenue Équipe','Textile Corporate'],
  ['objets-promo','/images/products/objets-promo/promo-01.png','Bracelet Silicone','Objet Promo'],
  ['objets-promo','/images/products/objets-promo/promo-02.png','Tasse Personnalisée','Sublimation'],
  ['objets-promo','/images/products/objets-promo/promo-03.png','Savon Personnalisé','Objet Promo'],
  ['objets-promo','/images/products/objets-promo/promo-04.png','Gadget Publicitaire','Objet Promo'],
  ['objets-promo','/images/products/objets-promo/promo-05.png','Article Promotionnel','Cadeau Client'],
  ['objets-promo','/images/products/objets-promo/promo-06.png','Objet Cadeau','Personnalisation'],
  ['cartes-badges','/images/products/cartes-badges/carte-01.png','Carte de Visite Premium','350g Mat/Brillant'],
  ['cartes-badges','/images/products/cartes-badges/carte-02.png','Carte PVC','Plastique Premium'],
  ['cartes-badges','/images/products/cartes-badges/carte-03.png','Badge STAFF','Événementiel'],
  ['cartes-badges','/images/products/cartes-badges/carte-04.png','Badge Accréditation','Impression HD'],
  ['emballages','/images/products/emballages/emballage-01.png','Sac Kraft Personnalisé','Emballage Custom'],
  ['emballages','/images/products/emballages/emballage-02.png','Sac Papier Branded','Packaging'],
  ['emballages','/images/products/emballages/emballage-03.png','Emballage Personnalisé','Impression Offset'],
  ['packaging','/images/products/packaging/packaging-01.png','Étiquette Produit','Packaging Premium'],
  ['packaging','/images/products/packaging/packaging-02.png','Pochette Personnalisée','Packaging'],
  ['packaging','/images/products/packaging/packaging-03.png','Boîte Branded','Packaging Custom'],
  ['packaging','/images/products/packaging/packaging-04.png','Packaging Alimentaire','Impression HD'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-01.png','Bâche Publicitaire','Grand Format'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-02.png','Affiche Grand Format','Impression UV'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-03.png','Portrait sur Toile','Canvas Premium'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-04.png','Panneau Publicitaire','Grand Format'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-05.png','Sticker Grand Format','Vinyle Adhésif'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-06.png','Signalétique','Impression Pro'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-07.jpg','Panneau Signalétique','Vinyle Réfléchissant'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-08.jpg','Réalisation Grand Format','Grand Format'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-09.jpg','Bâche Be Forward','Grand Format'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-10.jpg','Visuel Be Forward','Impression UV'],
  ['impression-grand-format','/images/products/impression-grand-format/grand-format-11.png','Réalisation Grand Format','Impression Pro'],
];

const sb = createClient(url, key, { auth: { persistSession: false } });

const { count, error: countErr } = await sb.from('products').select('id', { count: 'exact', head: true });
if (countErr) { console.error('Erreur :', countErr.message); process.exit(1); }
if (count > 0) {
  console.log(`La table contient déjà ${count} produit(s) : migration ignorée (pas de doublons).`);
  process.exit(0);
}

const sortByCat = {};
const rows = P.map(([cat, img, nom, tag]) => {
  sortByCat[cat] = (sortByCat[cat] ?? 0) + 1;
  return { cat, img, nom: { fr: nom }, tag: { fr: tag }, sort: sortByCat[cat] };
});

const { error } = await sb.from('products').insert(rows);
if (error) { console.error('Erreur :', error.message); process.exit(1); }
console.log(`${rows.length} produits migrés.`);
