# Panel admin du catalogue — installation

Les fichiers de ce dossier reprennent l'arborescence de ton projet : copie-les à la racine de `sethprintdesign/`.
On suppose que ta page catalogue est dans `app/[locale]/catalogue/page.tsx` ; si elle est ailleurs (par ex. `src/app/...`), garde la même logique de dossier.

| Fichier | Action |
| --- | --- |
| `lib/catalogue.ts`, `lib/products.ts`, `lib/supabase.ts`, `lib/auth.ts` | nouveaux |
| `app/[locale]/catalogue/page.tsx` | **remplace** ton fichier actuel (devient un composant serveur) |
| `app/[locale]/catalogue/CatalogueClient.tsx` | nouveau (ton ancien code, sans le tableau `PRODUCTS`) |
| `app/[locale]/admin/*` | nouveaux (page `/fr/admin`) |
| `app/api/admin/*` | nouveaux (login, logout, ajout, suppression) |
| `scripts/*`, `supabase/schema.sql`, `.env.example` | nouveaux |

**Les 4 fichiers `messages/*.json` ne changent pas.** Les titres des produits ne sont plus dans les JSON mais en base, avec un champ par langue (fr obligatoire, en/my/th facultatifs ; si une traduction manque, le français s'affiche — exactement comme aujourd'hui).

## 1. Supabase (5 min)

1. Crée un projet gratuit sur supabase.com.
2. **SQL Editor** → colle le contenu de `supabase/schema.sql` → **Run**. Ça crée la table `products` et le bucket d'images `catalogue`.
3. **Project Settings → API** : note l'URL et la clé `service_role`.

## 2. Local

```bash
npm install @supabase/supabase-js server-only
cp .env.example .env.local
node scripts/hash-password.mjs 'UnMotDePasseLongEtSolide'   # colle la ligne dans .env.local
openssl rand -hex 32                                         # → ADMIN_SESSION_SECRET
node --env-file=.env.local scripts/migrate-catalogue.mjs     # copie les 44 produits actuels
npm run dev
```

Dans `next.config` (js/mjs/ts), autorise les images Supabase pour `next/image` :

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
  ],
},
```

Vérifie que `.env.local` est bien dans `.gitignore`.

Test : `http://localhost:3000/fr/catalogue` doit être identique à avant, puis `http://localhost:3000/fr/admin` → connexion → ajoute une image → elle apparaît dans le catalogue.

## 3. Preview Vercel

1. `git checkout -b feature/admin` → commit → `git push -u origin feature/admin`.
2. Vercel → ton projet → **Settings → Environment Variables** : ajoute les 4 variables de `.env.local` (cocher *Preview* et *Production*).
3. Vercel crée automatiquement une URL de preview pour la branche. Teste `/fr/admin` dessus.
4. Si tout est bon : merge dans `main` → la prod est mise à jour.

## Sécurité — ce qui est en place

- Mot de passe stocké en hash scrypt (jamais en clair), comparaison à temps constant.
- Session : cookie `httpOnly`, `Secure`, `SameSite=Strict`, signé HMAC, expire après 8 h.
- Contrôle de session **dans chaque route API**, pas seulement dans un middleware.
- Vérification de l'en-tête `Origin` sur toutes les requêtes qui modifient des données (CSRF).
- Upload : type réel vérifié par les octets magiques (JPG/PNG/WebP), 4 Mo max, nom de fichier généré par le serveur (UUID).
- La clé `service_role` ne quitte jamais le serveur ; RLS activé, la clé publique ne peut qu'en lecture.
- Page admin en `noindex`.

**Limite connue** : pas de vrai rate-limit sur la connexion (juste un délai de 800 ms). Avec un mot de passe long c'est acceptable ; pour aller plus loin, ajoute Upstash Ratelimit ou le Firewall Vercel sur `/api/admin/login`.

## Limite de taille

Vercel refuse les requêtes de plus de 4,5 Mo : les images sont donc limitées à 4 Mo. Compresse les grosses photos (squoosh.app, en WebP) avant de les envoyer.
