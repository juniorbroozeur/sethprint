/* ═══════════════════════════════════════════════
   SETH PRINT DESIGN — scroll.js
   Parallax vidéo hero + VS section
   Fix mobile : autoplay, parallax désactivé sur touch,
                Safari iOS black screen
═══════════════════════════════════════════════ */

/* ── Détection mobile/touch ── */
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
  || window.matchMedia('(max-width: 860px)').matches;

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/* ── Références DOM ── */
const heroVideo  = document.getElementById('heroVideo');
const vsVideo    = document.getElementById('vsVideo');
const hero       = document.getElementById('hero');
const vsSection  = document.getElementById('vs');
const navEl      = document.getElementById('nav');

/* ════════════════════════════════════════════════
   FIX AUTOPLAY MOBILE
   iOS / Android ne lancent pas toujours l'autoplay
   même avec muted + playsinline → on force via JS
════════════════════════════════════════════════ */
function forceVideoPlay(video) {
  if (!video) return;

  /* S'assurer que les attributs sont bien en place */
  video.muted    = true;
  video.loop     = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.setAttribute('webkit-playsinline', ''); // Safari iOS legacy

  const tryPlay = () => {
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        /* Si l'autoplay échoue (politique navigateur),
           on réessaie au premier touch utilisateur */
        const retry = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', retry);
          document.removeEventListener('click', retry);
        };
        document.addEventListener('touchstart', retry, { once: true });
        document.addEventListener('click',      retry, { once: true });
      });
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('canplay',    tryPlay, { once: true });
    video.load(); // forcer le chargement si pas encore commencé
  }
}

/* Lancer pour les deux vidéos */
forceVideoPlay(heroVideo);
forceVideoPlay(vsVideo);

/* ════════════════════════════════════════════════
   FIX CSS VIDEO — Safari iOS black screen
   Sur mobile : pas de transform sur la vidéo,
   on utilise object-fit: cover à la place
════════════════════════════════════════════════ */
function applyMobileVideoStyle(video) {
  if (!video) return;
  if (isMobile || isSafari) {
    /* Réinitialiser le transform qui cause l'écran noir */
    video.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: none;
      will-change: auto;
      filter: none;
    `;
  }
}

applyMobileVideoStyle(heroVideo);

/* Pour vsVideo : garder le filtre sombre mais sans transform */
if (isMobile || isSafari) {
  if (vsVideo) {
    vsVideo.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: none;
      will-change: auto;
      filter: saturate(.5) brightness(.35);
    `;
  }
}

/* ════════════════════════════════════════════════
   SCROLL LOOP (RAF unique)
   Sur mobile : pas de parallax vidéo (perf + bugs)
   Sur desktop : parallax complet
════════════════════════════════════════════════ */
let scrollRAF = false;

function onScroll() {
  const sy = window.scrollY;

  /* ── NAV scroll state ── */
  if (navEl) {
    navEl.classList.toggle('scrolled', sy > 60);
  }

  /* ── Parallax hero vidéo (desktop uniquement) ── */
  if (!isMobile && !isSafari && heroVideo && hero) {
    const hh = hero.offsetHeight;
    if (sy < hh * 1.2) {
      heroVideo.style.transform =
        `translate(-50%, calc(-50% + ${sy * 0.4}px)) scale(1.15)`;
    }
  }

  /* ── Parallax VS vidéo (desktop uniquement) ── */
  if (!isMobile && !isSafari && vsVideo && vsSection) {
    const vr  = vsSection.getBoundingClientRect();
    const off = (vr.top + vsSection.offsetHeight / 2 - window.innerHeight / 2) * 0.25;
    vsVideo.style.transform = `scale(1.12) translateY(${off}px)`;
  }

  /* ── Word lighting (about section) ── */
  const vh = window.innerHeight;
  document.querySelectorAll('#brt .w').forEach(w => {
    w.classList.toggle('lit', w.getBoundingClientRect().top < vh * 0.88);
  });

  scrollRAF = false;
}

window.addEventListener('scroll', () => {
  if (!scrollRAF) {
    scrollRAF = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

/* Appel initial */
onScroll();