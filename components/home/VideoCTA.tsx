'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function VideoCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations('videocta');
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; v.loop = true; v.playsInline = true;
    v.play().catch(() => {});
  }, []);
  return (
    <div className="vs" id="vs">
      <video ref={videoRef} className="vs-v" id="vsVideo" autoPlay muted loop playsInline>
        <source src="/videos/video_de_fond_seth_print.mp4" type="video/mp4" />
      </video>
      <div className="vs-fb" />
      <div className="vs-content reveal">
        <div className="s-badge lg">{t('badge')}</div>
        <h2 className="s-title" style={{textAlign:'center',maxWidth:'700px'}}>
          {t('title_pre')} <span className="wc">{t('title_we')}</span> <span className="wm">{t('title_print')}</span>
        </h2>
        <p className="s-sub" style={{textAlign:'center',maxWidth:'480px',margin:'0 auto 32px'}}>
          {t('subtitle')}
        </p>
        <a href="#contact-wrap" className="btn-c">{t('cta')} →</a>
      </div>
    </div>
  );
}
