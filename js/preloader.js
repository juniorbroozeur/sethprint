setTimeout(() => {
  const pl = document.getElementById('preloader');

  pl.style.transition =
    'opacity .7s, transform .7s cubic-bezier(.77,0,.175,1)';

  pl.style.opacity = '0';
  pl.style.transform = 'scale(1.04)';

  setTimeout(() => pl.remove(), 750);
}, 2400);

setTimeout(() => {
  document.querySelectorAll('#ht .word').forEach((w, i) => {
    setTimeout(() => w.classList.add('vis'), 2500 + i * 100);
  });
}, 0);