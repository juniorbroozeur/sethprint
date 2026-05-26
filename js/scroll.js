const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const heroVideo = document.getElementById('heroVideo');
const hero = document.getElementById('hero');

let scrollRAF = false;

function onScroll() {
  const sy = window.scrollY;

  $('#nav').classList.toggle('scrolled', sy > 60);

  if (heroVideo && hero) {
    const hh = hero.offsetHeight;

    if (sy < hh * 1.2) {
      heroVideo.style.transform =
        `translate(-50%, calc(-50% + ${sy * 0.4}px)) scale(1.15)`;
    }
  }

  const vh = window.innerHeight;

  $$('#brt .w').forEach(w => {
    w.classList.toggle(
      'lit',
      w.getBoundingClientRect().top < vh * 0.88
    );
  });

  scrollRAF = false;
}

const scrollHandler = () => {
  if (!scrollRAF) {
    scrollRAF = true;
    requestAnimationFrame(onScroll);
  }
};

window.addEventListener('scroll', scrollHandler, { passive: true });

onScroll();