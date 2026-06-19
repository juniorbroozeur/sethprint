'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'th', label: 'ไทย',       flag: '🇹🇭' },
  { code: 'my', label: 'မြန်မာ',     flag: '🇲🇲' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchTo = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/') || '/');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,.15)',
          background: 'linear-gradient(135deg, #6a1b1f, #2a0d0f)',
          color: '#fff',
          fontFamily: 'var(--font-b)',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '15px', opacity: 0.85 }}>🌐</span>
        <span>{current.label}</span>
        <span style={{ fontSize: '10px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: '180px',
            background: '#111',
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,.5)',
            zIndex: 200,
          }}
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => switchTo(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 16px',
                background: lang.code === locale ? 'rgba(255,255,255,.08)' : 'transparent',
                border: 'none',
                color: lang.code === locale ? '#fff' : 'rgba(255,255,255,.7)',
                fontFamily: 'var(--font-b)',
                fontSize: '13px',
                fontWeight: lang.code === locale ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '17px' }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
