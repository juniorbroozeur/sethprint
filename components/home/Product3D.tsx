'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Product3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('product3d');
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const velRef  = useRef({ x: 0, y: 0 });
  const rotRef  = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    function loop() {
      if (!dragging) {
        t += 0.007;
        const y = Math.sin(t) * 18;
        const x = Math.sin(t * 0.6) * 6;
        rotRef.current = { x, y };
        setRot({ x, y });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    velRef.current = { x: dy * 0.3, y: dx * 0.5 };
    rotRef.current = {
      x: rotRef.current.x + dy * 0.3,
      y: rotRef.current.y + dx * 0.5,
    };
    setRot({ ...rotRef.current });
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - lastPos.current.x;
    const dy = e.touches[0].clientY - lastPos.current.y;
    rotRef.current = {
      x: rotRef.current.x + dy * 0.3,
      y: rotRef.current.y + dx * 0.5,
    };
    setRot({ ...rotRef.current });
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = () => setDragging(false);

  const clampX = Math.max(-25, Math.min(25, rot.x));
  const clampY = Math.max(-35, Math.min(35, rot.y));

  return (
    <section id="product">
      <div className="prod-l">
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            width: '100%',
            maxWidth: '420px',
            aspectRatio: '3/4',
            cursor: dragging ? 'grabbing' : 'grab',
            perspective: '1000px',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${clampX}deg) rotateY(${clampY}deg)`,
              transition: dragging ? 'none' : 'transform 0.05s ease-out',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: `
                ${clampY * 0.8}px ${clampX * 0.5}px 40px rgba(0,0,0,.6),
                ${clampY * 0.3}px ${clampX * 0.2}px 80px rgba(0,0,0,.3)
              `,
            }}
          >
            <Image
              src="/images/portfolio/068EBA34-56CE-4ECB-A584-4798713E5CAF.PNG"
              alt="Pull-over Seth Print Design"
              fill
              style={{ objectFit: 'cover', pointerEvents: 'none' }}
              priority
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at ${50 + clampY * 1.2}% ${50 - clampX * 1.5}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
                pointerEvents: 'none',
                borderRadius: '16px',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00AEEF 25%, #EC008C 25% 50%, #FCD116 50% 75%, rgba(255,255,255,.3) 75%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
        <p className="prod-hint">↔ {t('hint')}</p>
      </div>

      <div className="prod-r reveal">
        <div className="s-badge">{t('badge')}</div>
        <h3 className="prod-title">{t('title_pre')} <span className="wc">{t('title_highlight')}</span></h3>
        <p className="prod-desc">
          {t('desc')}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
          <a href="#contact-wrap" className="btn-c" style={{ borderRadius: '999px', padding: '13px 32px', fontSize: '12px' }}>
            {t('cta_order')} →
          </a>
          <a href="https://wa.me/66660246322" className="btn-wa" style={{ borderRadius: '999px', padding: '13px 28px', fontSize: '12px' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
