'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, LOCALES, type CategoryId, type Product } from '@/lib/catalogue';
import { box, ghostBtn, input, label, page, primaryBtn } from './styles';

const CAT_LABELS: Record<CategoryId, string> = {
  'textiles': 'Textiles',
  'objets-promo': 'Objets Promo',
  'cartes-badges': 'Cartes & Badges',
  'emballages': 'Emballages',
  'packaging': 'Packaging',
  'impression-grand-format': 'Grand Format',
};

const LOC_LABELS: Record<string, string> = { fr: 'Français', en: 'English', my: 'Myanmar', th: 'ไทย' };

const MAX_BYTES = 4 * 1024 * 1024;

export default function AdminPanel({ products }: { products: Product[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<CategoryId | 'tous'>('tous');

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
    if (f && f.size > MAX_BYTES) setMsg({ ok: false, text: 'Image trop lourde : 4 Mo maximum. Compresse-la avant (ex. squoosh.app).' });
    else setMsg(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await fetch('/api/admin/products', { method: 'POST', body: new FormData(e.currentTarget) });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (res.ok) {
      formRef.current?.reset();
      setPreview(null);
      setMsg({ ok: true, text: 'Produit ajouté au catalogue.' });
      router.refresh();
    } else {
      setMsg({ ok: false, text: data?.error ?? `Erreur ${res.status}` });
      if (res.status === 401) router.refresh();
    }
  }

  async function onDelete(p: Product) {
    if (!confirm(`Supprimer « ${p.nom.fr} » du catalogue ?`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
    else alert((await res.json().catch(() => null))?.error ?? 'Suppression impossible');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  const list = filter === 'tous' ? products : products.filter(p => p.cat === filter);

  return (
    <div style={page}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: 32 }}>Catalogue — Admin</h1>
          <button onClick={logout} style={ghostBtn}>Se déconnecter</button>
        </div>

        {/* Formulaire d'ajout */}
        <form ref={formRef} onSubmit={onSubmit} style={{ ...box, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, marginBottom: 20 }}>Ajouter une réalisation</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div>
              <label style={label} htmlFor="file">Image (JPG, PNG, WebP — 4 Mo max)</label>
              <input id="file" name="file" type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} required style={{ ...input, padding: 10 }} />
              <div style={{
                marginTop: 12, aspectRatio: '1', borderRadius: 12, overflow: 'hidden',
                background: '#16161a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', fontSize: 13,
              }}>
                {preview
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={preview} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : 'Aperçu'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={label} htmlFor="cat">Catégorie</label>
                <select id="cat" name="cat" required defaultValue="" style={input}>
                  <option value="" disabled>Choisir…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
                </select>
              </div>

              <div>
                <label style={label} htmlFor="nom_fr">Titre (français) *</label>
                <input id="nom_fr" name="nom_fr" required maxLength={80} placeholder="ex. T-Shirt Personnalisé" style={input} />
              </div>
              <div>
                <label style={label} htmlFor="tag_fr">Sous-titre (français) *</label>
                <input id="tag_fr" name="tag_fr" required maxLength={80} placeholder="ex. Impression DTF" style={input} />
              </div>

              <details>
                <summary style={{ cursor: 'pointer', fontSize: 13, color: 'var(--c)' }}>
                  Traductions (facultatif — sinon le français s’affiche)
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                  {LOCALES.filter(l => l !== 'fr').map(l => (
                    <div key={l} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <input name={`nom_${l}`} maxLength={80} placeholder={`Titre — ${LOC_LABELS[l]}`} style={input} />
                      <input name={`tag_${l}`} maxLength={80} placeholder={`Sous-titre — ${LOC_LABELS[l]}`} style={input} />
                    </div>
                  ))}
                </div>
              </details>

              {msg && <p style={{ fontSize: 13, color: msg.ok ? 'var(--c)' : '#ff6b6b' }}>{msg.text}</p>}

              <button type="submit" disabled={busy} style={{ ...primaryBtn, alignSelf: 'flex-start', opacity: busy ? 0.6 : 1 }}>
                {busy ? 'Envoi…' : 'Ajouter au catalogue'}
              </button>
            </div>
          </div>
        </form>

        {/* Liste des produits */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {(['tous', ...CATEGORIES] as const).map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ ...ghostBtn, ...(filter === c ? { background: 'var(--c)', color: '#000', borderColor: 'var(--c)' } : {}) }}>
              {c === 'tous' ? `Tous (${products.length})` : CAT_LABELS[c]}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
          {list.map(p => (
            <div key={p.id} style={{ ...box, padding: 0, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.nom.fr} loading="lazy" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--c)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{p.tag.fr}</div>
                <div style={{ fontSize: 14, margin: '4px 0 10px' }}>{p.nom.fr}</div>
                <button onClick={() => onDelete(p)} style={{ ...ghostBtn, padding: '6px 14px', fontSize: 11, color: '#ff6b6b', borderColor: 'rgba(255,107,107,.4)' }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
