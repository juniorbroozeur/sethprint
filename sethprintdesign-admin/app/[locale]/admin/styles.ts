import type { CSSProperties } from 'react';

// Styles du panel admin, basés sur les variables CSS existantes du site (--bg, --c, --muted, --font-*).
export const page: CSSProperties = {
  background: 'var(--bg)', minHeight: '100vh', padding: '100px 16px 60px',
  fontFamily: 'var(--font-b)', color: '#fff',
};

export const box: CSSProperties = {
  background: '#0d0d0f', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: 28,
};

export const label: CSSProperties = {
  display: 'block', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
  color: 'var(--muted)', marginBottom: 6,
};

export const input: CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
  background: '#16161a', border: '1px solid rgba(255,255,255,.12)', color: '#fff', outline: 'none',
};

export const primaryBtn: CSSProperties = {
  background: 'var(--c)', color: '#000', border: 'none', borderRadius: 999,
  padding: '12px 28px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

export const ghostBtn: CSSProperties = {
  background: 'transparent', color: 'rgba(255,255,255,.7)', border: '1px solid rgba(255,255,255,.15)',
  borderRadius: 999, padding: '8px 18px', fontSize: 12, cursor: 'pointer',
};
