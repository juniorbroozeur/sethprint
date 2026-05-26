const $$ = s => document.querySelectorAll(s);

const cur = document.getElementById('cur');

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
    cx = e.clientX;
    cy = e.clientY;

    if (!curTick) {
      curTick = true;
      requestAnimationFrame(updateCur);
    }
  },
  { passive: true }
);

$$('a,button,.srv-row,.sh-cell,.city,.col-btn,.feat-card').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});