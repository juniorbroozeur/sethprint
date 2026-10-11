'use client';

import { useState } from 'react';
import { useCursor } from '@/hooks/useCursor';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CATEGORIES, tr, type CategoryId, type Product } from '@/lib/catalogue';

type Category = 'tous' | CategoryId;

const CATEGORY_IDS: Category[] = ['tous', ...CATEGORIES];

export default function CatalogueClient({ products }: { products: Product[] }) {
  const locale = useLocale();
  const t = useTranslations('catalogue');
  useCursor();
  const [active, setActive] = useState<Category>('tous');
  const [lightbox, setLightbox] = useState<Product | null>(null);

  const filtered = active === 'tous' ? products : products.filter(p => p.cat === active);

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
              <Image src={lightbox.img} alt={tr(lightbox.nom, locale)} fill style={{objectFit:'contain'}} />
            </div>
            <div className="lb-content">
              <div className="s-badge">{tr(lightbox.tag, locale)}</div>
              <h2 style={{fontFamily:'var(--font-h)', fontStyle:'italic', fontSize:'clamp(20px,3vw,36px)', color:'#fff', lineHeight:1.2}}>
                {tr(lightbox.nom, locale)}
              </h2>
              <p style={{fontFamily:'var(--font-b)', fontSize:'14px', fontWeight:300, color:'var(--muted)', lineHeight:1.7}}>
                {t('lightbox_desc')}
              </p>
              <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginTop:'8px'}}>
                <a
                  href={`https://wa.me/66660246322?text=${encodeURIComponent(`${t('order_message')} : ${tr(lightbox.nom, locale)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-c"
                  style={{borderRadius:'999px', padding:'12px 28px', fontSize:'12px'}}
                >
                  {t('order')} →
                </a>
                <a
                  href="https://wa.me/66660246322"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  alt={tr(p.nom, locale)}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  style={{objectFit:'cover', transition:'transform .5s cubic-bezier(.25,.46,.45,.94)'}}
                />
                <div className="cat-overlay">
                  <div style={{fontFamily:'var(--font-b)', fontSize:'10px', color:'var(--c)', letterSpacing:'.16em', textTransform:'uppercase', marginBottom:'4px'}}>{tr(p.tag, locale)}</div>
                  <div style={{fontFamily:'var(--font-h)', fontStyle:'italic', fontSize:'18px', color:'#fff'}}>{tr(p.nom, locale)}</div>
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
              rel="noopener noreferrer"
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
