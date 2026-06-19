'use client';
import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const revEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revEls.forEach(el => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -30px 0px' }
    );
    revEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      else obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}