'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nav-logo">
          <Image
            src="/images/team/Seth_logo_transparent.png"
            alt="Seth Print Design"
            width={192}
            height={192}
            style={{objectFit:'contain', width:'auto', height:'72px'}}
          />
        </Link>

        <div className="nav-pill">
          <a href={`/${locale}#services`}>Services</a>
          <a href={`/${locale}#showcase`}>Réalisations</a>
          <Link href={`/${locale}/catalogue`}>Catalogue</Link>
          <a href={`/${locale}#product`}>Studio 3D</a>
          <a href={`/${locale}#delivery`}>Livraison</a>
        </div>

        <div className="nav-right">
          <a href={`/${locale}#contact-wrap`} className="nav-contact">Contact</a>
          <LanguageSwitcher />
          <a href="https://wa.me/66660246322" target="_blank" className="nav-wa">
            WhatsApp ↗
          </a>
        </div>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={{background: menuOpen ? 'transparent' : '#fff'}} />
          <span style={{transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none'}} />
          <span style={{transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none'}} />
        </button>
      </nav>

      {menuOpen && (
        <div className="nav-mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href={`/${locale}#services`}>Services</a>
          <a href={`/${locale}#showcase`}>Réalisations</a>
          <Link href={`/${locale}/catalogue`}>Catalogue</Link>
          <a href={`/${locale}#product`}>Studio 3D</a>
          <a href={`/${locale}#delivery`}>Livraison</a>
          <a href={`/${locale}#contact-wrap`}>Contact</a>
          <div onClick={(e) => e.stopPropagation()} style={{marginTop:'8px'}}>
            <LanguageSwitcher />
          </div>
          <a href="https://wa.me/66660246322" target="_blank" className="nav-wa" style={{marginTop:'8px'}}>
            WhatsApp ↗
          </a>
        </div>
      )}
    </>
  );
}