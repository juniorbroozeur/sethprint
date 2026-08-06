'use client';

import { useState } from 'react';
import { useCursor } from '@/hooks/useCursor';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

type Category = 'tous' | 'textiles' | 'objets-promo' | 'cartes-badges' | 'emballages' | 'impression-grand-format' | 'packaging';

const CATEGORY_IDS: Category[] = ['tous', 'textiles', 'objets-promo', 'cartes-badges', 'emballages', 'packaging', 'impression-grand-format'];

const PRODUCTS = [
  { id:1,  cat:'textiles',                img:'/images/products/textiles/textile-01.png',                nom:'T-Shirt Personnalisé',           tag:'Impression DTF' },
  { id:2,  cat:'textiles',                img:'/images/products/textiles/textile-02.png',                nom:'Pull-over Branding',             tag:'Impression Premium' },
  { id:3,  cat:'textiles',                img:'/images/products/textiles/textile-03.png',                nom:'Veste Personnalisée',            tag:'Textile Pro' },
  { id:4,  cat:'textiles',                img:'/images/products/textiles/textile-04.png',                nom:'Sweatshirt Custom',              tag:'Branding Textile' },
  { id:5,  cat:'textiles',                img:'/images/products/textiles/textile-05.png',                nom:'Pull-over Événementiel',         tag:'Impression Premium' },
  { id:6,  cat:'textiles',                img:'/images/products/textiles/textile-06.png',                nom:'T-Shirt Logo',                   tag:'DTF Haute Qualité' },
  { id:7,  cat:'textiles',                img:'/images/products/textiles/textile-07.png',                nom:'Pull-over Équipe',               tag:'Personnalisation' },
  { id:8,  cat:'textiles',                img:'/images/products/textiles/textile-08.jpg',                nom:'Textile Corporate',              tag:'Branding' },
  { id:37, cat:'textiles',                img:'/images/products/textiles/textile-09.png',                nom:'Polo Personnalisé',              tag:'Broderie Premium' },
  { id:38, cat:'textiles',                img:'/images/products/textiles/textile-10.png',                nom:'T-Shirt Événementiel',           tag:'Impression DTF' },
  { id:39, cat:'textiles',                img:'/images/products/textiles/textile-11.jpg',                nom:'Textile Personnalisé',           tag:'Branding Textile' },
  { id:40, cat:'textiles',                img:'/images/products/textiles/textile-12.jpg',                nom:'Tenue Corporate',                tag:'Personnalisation' },
  { id:41, cat:'textiles',                img:'/images/products/textiles/textile-13.jpg',                nom:'Sweatshirt Brodé',               tag:'Textile Pro' },
  { id:42, cat:'textiles',                img:'/images/products/textiles/textile-14.jpg',                nom:'Uniforme Personnalisé',          tag:'Branding' },
  { id:43, cat:'textiles',                img:'/images/products/textiles/textile-15.jpg',                nom:'Réalisation Textile',            tag:'Impression Premium' },
  { id:44, cat:'textiles',                img:'/images/products/textiles/textile-16.jpg',                nom:'Tenue Équipe',                   tag:'Textile Corporate' },
  { id:9,  cat:'objets-promo',            img:'/images/products/objets-promo/promo-01.png',              nom:'Bracelet Silicone',              tag:'Objet Promo' },
  { id:10, cat:'objets-promo',            img:'/images/products/objets-promo/promo-02.png',              nom:'Tasse Personnalisée',            tag:'Sublimation' },
  { id:11, cat:'objets-promo',            img:'/images/products/objets-promo/promo-03.png',              nom:'Savon Personnalisé',             tag:'Objet Promo' },
  { id:12, cat:'objets-promo',            img:'/images/products/objets-promo/promo-04.png',              nom:'Gadget Publicitaire',            tag:'Objet Promo' },
  { id:13, cat:'objets-promo',            img:'/images/products/objets-promo/promo-05.png',              nom:'Article Promotionnel',           tag:'Cadeau Client' },
  { id:14, cat:'objets-promo',            img:'/images/products/objets-promo/promo-06.png',              nom:'Objet Cadeau',                   tag:'Personnalisation' },
  { id:15, cat:'cartes-badges',           img:'/images/products/cartes-badges/carte-01.png',             nom:'Carte de Visite Premium',        tag:'350g Mat/Brillant' },
  { id:16, cat:'cartes-badges',           img:'/images/products/cartes-badges/carte-02.png',             nom:'Carte PVC',                      tag:'Plastique Premium' },
  { id:17, cat:'cartes-badges',           img:'/images/products/cartes-badges/carte-03.png',             nom:'Badge STAFF',                    tag:'Événementiel' },
  { id:18, cat:'cartes-badges',           img:'/images/products/cartes-badges/carte-04.png',             nom:'Badge Accréditation',            tag:'Impression HD' },
  { id:19, cat:'emballages',              img:'/images/products/emballages/emballage-01.png',            nom:'Sac Kraft Personnalisé',         tag:'Emballage Custom' },
  { id:20, cat:'emballages',              img:'/images/products/emballages/emballage-02.png',            nom:'Sac Papier Branded',             tag:'Packaging' },
  { id:21, cat:'emballages',              img:'/images/products/emballages/emballage-03.png',            nom:'Emballage Personnalisé',         tag:'Impression Offset' },
  { id:22, cat:'packaging',               img:'/images/products/packaging/packaging-01.png',             nom:'Étiquette Produit',              tag:'Packaging Premium' },
  { id:23, cat:'packaging',               img:'/images/products/packaging/packaging-02.png',             nom:'Pochette Personnalisée',         tag:'Packaging' },
  { id:24, cat:'packaging',               img:'/images/products/packaging/packaging-03.png',             nom:'Boîte Branded',                  tag:'Packaging Custom' },
  { id:25, cat:'packaging',               img:'/images/products/packaging/packaging-04.png',             nom:'Packaging Alimentaire',          tag:'Impression HD' },
  { id:26, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-01.png', nom:'Bâche Publicitaire',        tag:'Grand Format' },
  { id:27, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-02.png', nom:'Affiche Grand Format',      tag:'Impression UV' },
  { id:28, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-03.png', nom:'Portrait sur Toile',        tag:'Canvas Premium' },
  { id:29, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-04.png', nom:'Panneau Publicitaire',      tag:'Grand Format' },
  { id:30, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-05.png', nom:'Sticker Grand Format',     tag:'Vinyle Adhésif' },
  { id:31, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-06.png', nom:'Signalétique',              tag:'Impression Pro' },
  { id:32, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-07.jpg', nom:'Panneau Signalétique',     tag:'Vinyle Réfléchissant' },
  { id:33, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-08.jpg', nom:'Réalisation Grand Format', tag:'Grand Format' },
  { id:34, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-09.jpg', nom:'Bâche Be Forward',         tag:'Grand Format' },
  { id:35, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-10.jpg', nom:'Visuel Be Forward',        tag:'Impression UV' },
  { id:36, cat:'impression-grand-format', img:'/images/products/impression-grand-format/grand-format-11.png', nom:'Réalisation Grand Format', tag:'Impression Pro' },
];

export default function CataloguePage() {
  const locale = useLocale();
  const t = useTranslations('catalogue');
  useCursor();
  const [active, setActive] = useState<Category>('tous');
  const [lightbox, setLightbox] = useState<typeof PRODUCTS[0] | null>(null);

  const filtered = active === 'tous' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);

  return (
    <>
      <div id="cur" />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:'fixed', inset:0, zIndex:9999,
            background:'rgba(0,0,0,.95)', display:'flex',
            alignItems:'center', justifyContent:'center', padding:'16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="lb-inner"
          >
            <div className="lb-img">
              <Image src={lightbox.img} alt={lightbox.nom} fill style={{objectFit:'contain'}} />
            </div>
            <div className="lb-content">
              <div className="s-badge">{lightbox.tag}</div>
              <h2 style={{fontFamily:'var(--font-h)', fontStyle:'italic', fontSize:'clamp(20px,3vw,36px)', color:'#fff', lineHeight:1.2}}>
                {lightbox.nom}
              </h2>
              <p style={{fontFamily:'var(--font-b)', fontSize:'14px', fontWeight:300, color:'var(--muted)', lineHeight:1.7}}>
                {t('lightbox_desc')}
              </p>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginTop:'8px'}}>
                <a
                  href={`https://wa.me/66660246322?text=${t('order_message')} : ${lightbox.nom}`}
                  target="_blank"
                  className="btn-c"
                  style={{borderRadius:'999px', padding:'12px 28px', fontSize:'12px'}}
                >
                  {t('order')} →
                </a>
                <a
                  href="https://wa.me/66660246322"
                  target="_blank"
                  className="btn-m"
                  style={{borderRadius:'999px', padding:'12px 24px', fontSize:'12px'}}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setLightbox(null)}
            style={{
              position:'absolute', top:'16px', right:'16px',
              background:'rgba(255,255,255,.15)', border:'none', color:'#fff',
              width:'40px', height:'40px', borderRadius:'50%', fontSize:'20px',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{background:'var(--bg)', minHeight:'100vh', paddingTop:'100px'}}>
        <div className="cat-container">

          {/* Header */}
          <div style={{marginBottom:'56px'}}>
            <Link
              href={`/${locale}`}
              style={{color:'var(--c)', fontFamily:'var(--font-b)', fontSize:'13px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'6px', marginBottom:'24px'}}
            >
              ← {t('back_home')}
            </Link>
            <div className="s-badge">{t('badge')}</div>
            <h1 className="s-title">
              {t('title_pre')} <span className="wm">{t('title_highlight')}</span>
            </h1>
            <p className="s-sub" style={{maxWidth:'500px'}}>
              {t('subtitle')}
            </p>
          </div>

          {/* Filtres */}
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'48px'}}>
            {CATEGORY_IDS.map(catId => (
              <button
                key={catId}
                onClick={() => setActive(catId)}
                style={{
                  fontFamily:'var(--font-b)', fontSize:'12px', fontWeight:500,
                  letterSpacing:'.08em', textTransform:'uppercase',
                  padding:'8px 20px', borderRadius:'999px', cursor:'pointer',
                  border:'1px solid',
                  borderColor: active === catId ? 'var(--c)' : 'rgba(255,255,255,.12)',
                  background: active === catId ? 'var(--c)' : 'transparent',
                  color: active === catId ? '#000' : 'rgba(255,255,255,.55)',
                  transition:'all .2s',
                }}
              >
                {t(`cat_${catId}`)}
              </button>
            ))}
          </div>

          {/* Grille */}
          <div className="cat-grid">
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => setLightbox(p)}
                className="cat-item"
              >
                <Image
                  src={p.img}
                  alt={p.nom}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  style={{objectFit:'cover', transition:'transform .5s cubic-bezier(.25,.46,.45,.94)'}}
                />
                <div className="cat-overlay">
                  <div style={{fontFamily:'var(--font-b)', fontSize:'10px', color:'var(--c)', letterSpacing:'.16em', textTransform:'uppercase', marginBottom:'4px'}}>{p.tag}</div>
                  <div style={{fontFamily:'var(--font-h)', fontStyle:'italic', fontSize:'18px', color:'#fff'}}>{p.nom}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA bas */}
          <div style={{textAlign:'center', marginTop:'80px', padding:'60px', background:'#080809', borderRadius:'16px'}}>
            <div className="s-badge" style={{justifyContent:'center'}}>{t('cta_badge')}</div>
            <h2 className="s-title" style={{textAlign:'center'}}>
              {t('cta_title_pre')} <span className="wc">{t('cta_title_highlight')}</span>
            </h2>
            <p style={{fontFamily:'var(--font-b)', fontSize:'15px', fontWeight:300, color:'var(--muted)', marginBottom:'32px'}}>
              {t('cta_desc')}
            </p>
            <a
              href="https://wa.me/66660246322"
              target="_blank"
              className="btn-c"
              style={{borderRadius:'999px', padding:'14px 40px'}}
            >
              {t('cta_button')} →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}