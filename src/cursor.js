const GLITTER_CHARS = ['✦', '✧', '·'];
const GLITTER_COLORS = ['#ffffff', '#d8d8d8', '#c0c0c0'];
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle > 20) {
    lastSparkle = now;
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      spawnGlitter(e.clientX, e.clientY);
    }
  }
});

function spawnGlitter(x, y) {
  const el = document.createElement('div');
  el.className = 'sparkle-particle';
  el.textContent = GLITTER_CHARS[Math.floor(Math.random() * GLITTER_CHARS.length)];

  const offsetX = (Math.random() - 0.5) * 24;
  const offsetY = (Math.random() - 0.5) * 24;

  el.style.left = (x + offsetX) + 'px';
  el.style.top = (y + offsetY) + 'px';
  el.style.color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
  el.style.fontSize = '7px';
  el.style.textShadow = '0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(200,200,200,0.5)';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 500);
}

/* --- Ambient rock glitter --- */
function spawnRockGlitter() {
  const rock = document.querySelector('.pixel-sprite--rock');
  if (!rock) return;

  const rect = rock.getBoundingClientRect();
  const x = rect.left + rect.width * (0.25 + Math.random() * 0.5);
  const y = rect.top + rect.height * (0.15 + Math.random() * 0.4);
  spawnGlitter(x, y);
}

setInterval(spawnRockGlitter, 80);
