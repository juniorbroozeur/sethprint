const $$ = s => document.querySelectorAll(s);

$$('.btn-c,.btn-m,.nav-cta').forEach(el => {
  let magRAF = false;

  el.addEventListener('mousemove', e => {
    if (!magRAF) {
      magRAF = true;

      requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();

        el.style.transform =
          `translate(
            ${(e.clientX - r.left - r.width / 2) * .12}px,
            ${(e.clientY - r.top - r.height / 2) * .12}px
          )`;

        magRAF = false;
      });
    }
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    magRAF = false;
  });
});