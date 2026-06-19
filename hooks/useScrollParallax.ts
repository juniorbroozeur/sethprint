'use client';
import { useEffect } from 'react';

export function useScrollParallax() {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement;
    const vsVideo   = document.getElementById('vsVideo')   as HTMLVideoElement;
    const hero      = document.getElementById('hero');
    const vsSection = document.getElementById('vs');
    const navEl     = document.querySelector('nav');

    let raf = false;
    function onScroll() {
      const sy = window.scrollY;
      if (navEl) navEl.classList.toggle('scrolled', sy > 60);
      if (!isMobile && !isSafari) {
        if (heroVideo && hero) {
          if (sy < hero.offsetHeight * 1.2) {
            heroVideo.style.transform = `translate(-50%,calc(-50% + ${sy * 0.4}px)) scale(1.15)`;
          }
        }
        if (vsVideo && vsSection) {
          const vr  = vsSection.getBoundingClientRect();
          const off = (vr.top + vsSection.offsetHeight / 2 - window.innerHeight / 2) * 0.25;
          vsVideo.style.transform = `scale(1.12) translateY(${off}px)`;
        }
      }
      const vh = window.innerHeight;
      document.querySelectorAll('#brt .w').forEach(w => {
        w.classList.toggle('lit', w.getBoundingClientRect().top < vh * 0.88);
      });
      raf = false;
    }

    window.addEventListener('scroll', () => {
      if (!raf) { raf = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }, []);
}
