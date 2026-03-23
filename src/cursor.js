const SPARKLE_CHARS = ['✦', '✶', '✸', '✺', '⋆'];
const SPARKLE_COLORS = ['#F5CB5C', '#E8EDDF', '#F5CB5C', '#333533', '#F5CB5C'];
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle > 60) {
    lastSparkle = now;
    spawnSparkle(e.clientX, e.clientY);
  }
});

function spawnSparkle(x, y) {
  const el = document.createElement('div');
  el.className = 'sparkle-particle';
  el.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];

  const offsetX = (Math.random() - 0.5) * 24;
  const offsetY = (Math.random() - 0.5) * 24;

  el.style.left = (x + offsetX) + 'px';
  el.style.top = (y + offsetY) + 'px';
  el.style.color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  el.style.fontSize = (Math.random() * 10 + 8) + 'px';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}
