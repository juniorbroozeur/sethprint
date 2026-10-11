-- À exécuter une fois dans Supabase : Dashboard → SQL Editor → New query → Run.

-- 1. Table des produits du catalogue
create table if not exists public.products (
  id          bigint generated always as identity primary key,
  cat         text not null check (cat in (
                'textiles','objets-promo','cartes-badges',
                'emballages','packaging','impression-grand-format')),
  img         text not null,
  nom         jsonb not null check (nom ? 'fr'),   -- {"fr":"...","en":"...","my":"...","th":"..."}
  tag         jsonb not null check (tag ? 'fr'),
  sort        int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists products_cat_sort_idx on public.products (cat, sort);

-- 2. RLS : lecture publique, AUCUNE écriture via la clé anon.
--    Les écritures passent uniquement par les routes API du serveur (clé service_role).
alter table public.products enable row level security;

drop policy if exists "lecture publique" on public.products;
create policy "lecture publique" on public.products
  for select using (true);

-- 3. Bucket de stockage des images (lecture publique, 4 Mo max, images seulement)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('catalogue', 'catalogue', true, 4194304,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
