/* ── CURSOR — desktop only ──
   Hidden on touch/mobile devices
*/
(function () {
  /* Detect touch / mobile — three independent checks */
  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(hover: none)').matches;

  const cur = document.getElementById('cur');
  if (!cur) return;

  if (isTouch) {
    /* Hide the custom cursor entirely on mobile */
    cur.style.display = 'none';
    /* Restore the default system cursor on the whole page */
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
    return;
  }

  /* ── Desktop behaviour ── */
  let cx = 0;
  let cy = 0;
  let curTick = false;

  function updateCur() {
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    curTick = false;
  }

  document.addEventListener(
    'mousemove',
    e => {
      cx = e.clientX - 5;   /* -5 pour centrer l'élément 10px */
      cy = e.clientY - 5;

      if (!curTick) {
        curTick = true;
        requestAnimationFrame(updateCur);
      }
    },
    { passive: true }
  );

  const $$ = s => document.querySelectorAll(s);

  $$('a,button,.srv-row,.sh-cell,.city,.col-btn,.feat-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
})();