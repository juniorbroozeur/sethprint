'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations('hero');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; video.loop = true; video.playsInline = true;
    const tryPlay = () => {
      video.play().catch(() => {
        const retry = () => { video.play().catch(() => {}); };
        document.addEventListener('touchstart', retry, { once: true });
        document.addEventListener('click', retry, { once: true });
      });
    };
    if (video.readyState >= 2) tryPlay();
    else { video.addEventListener('loadeddata', tryPlay, { once: true }); video.load(); }
    // Animer les mots du titre après le preloader
    const words = document.querySelectorAll('#ht .word span');
    words.forEach((w, i) => {
      setTimeout(() => w.classList.add('vis'), 2500 + i * 120);
    });
  }, []);

  return (
    <section id="hero">
      <div className="hero-video-wrap">
        <video ref={videoRef} id="heroVideo" autoPlay muted loop playsInline>
          <source src="/videos/video_de_fond_seth_print.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="s-badge">{t('badge')}</div>
        <h1 id="ht">
          <div className="word"><span>{t('title_line1')}</span></div>
          <div className="word"><span>{t('title_line2')}</span></div>
        </h1>
        <p className="hero-sub">
          {t('subtitle')} — <em>{t('subtitle_em')}</em>.
        </p>
        <div className="hero-cta">
          <a href="#showcase" className="btn-c">{t('cta_discover')} ↗</a>
          <a href="#contact-wrap" className="btn-outline">{t('cta_quote')}</a>
          <a href="#product" className="btn-outline">{t('cta_studio')} →</a>
        </div>
        <div className="hero-stats">
          <div className="hs"><div className="hs-num">500<span className="wc">+</span></div><div className="hs-lbl">{t('stat_projects')}</div></div>
          <div className="hs"><div className="hs-num">4<span className="wm">+</span></div><div className="hs-lbl">{t('stat_cities')}</div></div>
          <div className="hs"><div className="hs-num">100<span className="wy">%</span></div><div className="hs-lbl">{t('stat_satisfaction')}</div></div>
        </div>
      </div>
      <div className="cmyk-bar" style={{position:'absolute',bottom:0,left:0,right:0,zIndex:10}}>
        <span className="cc"/><span className="mm"/><span className="yy"/><span className="kk"/>
      </div>
    </section>
  );
}