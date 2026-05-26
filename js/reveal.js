const $$ = s => document.querySelectorAll(s);

function initReveal() {
  const revEls = $$('.reveal');

  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver(
      es => {
        es.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revObs.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
      } else {
        revObs.observe(el);
      }
    });
  } else {
    revEls.forEach(el => el.classList.add('in'));
  }
}

setTimeout(initReveal, 2800);