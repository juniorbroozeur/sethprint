/* ═══════════════════════════════════════════════
   SETH PRINT DESIGN — product3d.js
   Module autonome : canvas 3D T-shirt interactif
   CMYK : Cyan #00AEEF · Magenta #EC008C · Yellow #FCD116
═══════════════════════════════════════════════ */

const CYAN = '#00AEEF';
const MAG  = '#EC008C';
const YEL  = '#FCD116';

/* ── Helpers locaux (pas de dépendance sur $$ global) ── */
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ── Attendre que le DOM soit prêt ── */
function init3D() {
  const cvs = document.getElementById('c3d');
  if (!cvs) {
    console.warn('[product3d] canvas #c3d introuvable');
    return;
  }

  const ctx = cvs.getContext('2d');
  cvs.width  = 320;
  cvs.height = 400;

  /* ── État ── */
  let shirtColor  = '#f5f5f5';
  let rot         = 0;
  let drag        = false;
  let lastX       = 0;
  let canvasActive = true;

  /* ── Sélecteur de couleurs ── */
  $$('.col-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.col-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      shirtColor = btn.dataset.c;
    });
  });

  /* ── Drag souris ── */
  cvs.addEventListener('mousedown', e => {
    drag  = true;
    lastX = e.clientX;
  });
  window.addEventListener('mouseup',   () => { drag = false; });
  window.addEventListener('mousemove', e => {
    if (!drag) return;
    rot  += (e.clientX - lastX) * 0.013;
    lastX = e.clientX;
  });

  /* ── Drag tactile ── */
  cvs.addEventListener('touchstart', e => {
    drag  = true;
    lastX = e.touches[0].clientX;
  }, { passive: true });
  window.addEventListener('touchend',  () => { drag = false; });
  window.addEventListener('touchmove', e => {
    if (!drag) return;
    rot  += (e.touches[0].clientX - lastX) * 0.013;
    lastX = e.touches[0].clientX;
  }, { passive: true });

  /* ── Pause quand hors écran (perf) ── */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      entries => { entries.forEach(e => { canvasActive = e.isIntersecting; }); },
      { threshold: 0 }
    ).observe(cvs);
  }

  /* ── Utilitaires couleur ── */
  function hexToRgb(hex) {
    const v = parseInt(hex.replace('#', ''), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }

  function tint(rgb, factor) {
    const clamp = c => Math.max(0, Math.min(255, Math.round(c * factor)));
    return `rgb(${clamp(rgb[0])},${clamp(rgb[1])},${clamp(rgb[2])})`;
  }

  /* ════════════════════════════════════════
     BOUCLE DE RENDU
  ════════════════════════════════════════ */
  function draw() {
    /* Si hors écran on continue la boucle mais on ne dessine pas */
    if (!canvasActive) {
      requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, 320, 400);

    const rgb = hexToRgb(shirtColor);
    const W   = 320, H = 400;
    const cx  = W / 2;         // centre X
    const cy  = 175;           // centre Y du torse
    const p   = 1 + Math.sin(rot) * 0.1;   // perspective légère
    const sk  = Math.sin(rot) * 24;         // skew pour effet 3D

    /* ── Fond radial CMYK doux ── */
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
    bg.addColorStop(0,   'rgba(0,174,239,.04)');
    bg.addColorStop(0.5, 'rgba(236,0,140,.03)');
    bg.addColorStop(1,   'transparent');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* ── Ombre portée (ellipse sol) ── */
    ctx.beginPath();
    ctx.ellipse(cx, cy + 148, 74 * p, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,.3)';
    ctx.fill();

    /* ── Corps du T-shirt ── */
    ctx.beginPath();
    ctx.moveTo(cx - 82 * p + sk * .25, cy - 108);
    ctx.lineTo(cx + 82 * p + sk * .25, cy - 108);
    ctx.lineTo(cx + 88 * p + sk * .2,  cy + 130);
    ctx.lineTo(cx - 88 * p + sk * .2,  cy + 130);
    ctx.closePath();
    const bodyGrad = ctx.createLinearGradient(cx - 88 * p, cy - 108, cx + 88 * p, cy + 130);
    bodyGrad.addColorStop(0,   tint(rgb, 1.1));
    bodyGrad.addColorStop(0.5, tint(rgb, 1.0));
    bodyGrad.addColorStop(1,   tint(rgb, 0.78));
    ctx.fillStyle   = bodyGrad;
    ctx.fill();
    ctx.strokeStyle = tint(rgb, 0.6);
    ctx.lineWidth   = 1;
    ctx.stroke();

    /* ── Manche gauche ── */
    ctx.beginPath();
    ctx.moveTo(cx - 82 * p + sk * .25, cy - 108);
    ctx.lineTo(cx - 144 * p + sk,       cy - 52);
    ctx.lineTo(cx - 124 * p + sk,       cy - 12);
    ctx.lineTo(cx - 80  * p + sk * .4,  cy - 38);
    ctx.closePath();
    ctx.fillStyle   = tint(rgb, 0.87);
    ctx.fill();
    ctx.stroke();

    /* ── Manche droite ── */
    ctx.beginPath();
    ctx.moveTo(cx + 82 * p + sk * .25, cy - 108);
    ctx.lineTo(cx + 144 * p + sk,       cy - 52);
    ctx.lineTo(cx + 124 * p + sk,       cy - 12);
    ctx.lineTo(cx + 80  * p + sk * .4,  cy - 38);
    ctx.closePath();
    ctx.fillStyle   = tint(rgb, 0.81);
    ctx.fill();
    ctx.stroke();

    /* ── Col ── */
    ctx.beginPath();
    ctx.moveTo(cx - 30 * p + sk * .25, cy - 108);
    ctx.bezierCurveTo(
      cx - 16 * p, cy - 86,
      cx + 16 * p, cy - 86,
      cx + 30 * p + sk * .25, cy - 108
    );
    ctx.strokeStyle = tint(rgb, 0.62);
    ctx.lineWidth   = 3;
    ctx.stroke();

    /* ── Logo CMYK + texte (face avant visible) ── */
    const faceAlpha = Math.abs(Math.cos(rot));
    if (faceAlpha > 0.06) {

      /* Bandes CMYK */
      ctx.save();
      ctx.globalAlpha = faceAlpha * 0.9;
      ctx.translate(cx + sk * .12, cy + 14);
      ctx.transform(p, 0, Math.sin(rot) * 0.14, 1, 0, 0);
      const bw = 60 * p, bh = 5, bx = -30 * p;
      ctx.fillStyle = CYAN; ctx.fillRect(bx,          0,      bw, bh);
      ctx.fillStyle = MAG;  ctx.fillRect(bx,  bh + 2,  bw, bh);
      ctx.fillStyle = YEL;  ctx.fillRect(bx, bh * 2 + 4, bw, bh);
      ctx.restore();

      /* Texte Seth Print Design */
      ctx.save();
      ctx.globalAlpha = faceAlpha;
      ctx.translate(cx + sk * .12, cy + 44);
      ctx.transform(p, 0, Math.sin(rot) * 0.14, 1, 0, 0);
      ctx.textAlign = 'center';

      const isDark = rgb[0] + rgb[1] + rgb[2] < 320;

      ctx.font      = `italic 400 ${Math.round(11 * p)}px 'Instrument Serif', serif`;
      ctx.fillStyle = isDark ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.5)';
      ctx.fillText('Seth Print Design', 0, 0);

      ctx.font      = `300 ${Math.round(7 * p)}px 'Barlow', sans-serif`;
      ctx.fillStyle = isDark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.3)';
      ctx.fillText('WORK PERFECTION', 0, 13);

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    /* ── Reflet lumineux (glossy) ── */
    ctx.save();
    ctx.globalAlpha = 0.09;
    const shineGrad = ctx.createLinearGradient(cx - 88 * p, cy - 108, cx + 24 * p, cy + 50);
    shineGrad.addColorStop(0, 'rgba(255,255,255,1)');
    shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shineGrad;
    ctx.fillRect(cx - 88 * p, cy - 108, 110 * p, 238);
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── Auto-rotation douce ── */
    rot += 0.007;

    requestAnimationFrame(draw);
  }

  /* Lancer la boucle */
  draw();
}

/* ── Point d'entrée : attendre le DOM ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init3D);
} else {
  init3D(); // DOM déjà prêt
}