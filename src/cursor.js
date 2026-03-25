const GLITTER_CHARS = ['·', '•', '✦', '✧', '*', '⁺'];
const GLITTER_COLORS = ['#ffffff', '#fff', '#f0f0ff', '#e8e8ff', '#fafafa'];
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle > 10) {
    lastSparkle = now;
    const count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
      spawnGlitter(e.clientX, e.clientY);
    }
  }
});

function spawnGlitter(x, y) {
  const el = document.createElement('div');
  el.className = 'sparkle-particle';
  el.textContent = GLITTER_CHARS[Math.floor(Math.random() * GLITTER_CHARS.length)];

  const offsetX = (Math.random() - 0.5) * 16;
  const offsetY = (Math.random() - 0.5) * 16;
  const size = 3 + Math.random() * 4;
  const duration = 600 + Math.random() * 1200;

  el.style.left = (x + offsetX) + 'px';
  el.style.top = (y + offsetY) + 'px';
  el.style.color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
  el.style.fontSize = size + 'px';
  el.style.textShadow = '0 0 2px #fff, 0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.4)';
  el.style.animationDuration = duration + 'ms';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
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
