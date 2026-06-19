'use client';
import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;
    const cur = document.getElementById('cur');
    if (!cur) return;
    if (isTouch) { cur.style.display = 'none'; document.body.style.cursor = 'auto'; return; }

    let cx = 0, cy = 0, tick = false;
    const update = () => { cur.style.transform = `translate(${cx}px,${cy}px)`; tick = false; };
    const onMove = (e: MouseEvent) => {
      cx = e.clientX - 5; cy = e.clientY - 5;
      if (!tick) { tick = true; requestAnimationFrame(update); }
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    document.querySelectorAll('a,button,.srv-row,.sh-cell,.city,.col-btn,.feat-card').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('big'));
      el.addEventListener('mouseleave', () => cur.classList.remove('big'));
    });

    return () => document.removeEventListener('mousemove', onMove);
  }, []);
}