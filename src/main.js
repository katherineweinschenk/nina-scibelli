import './style.css'
import './cursor.js'
import { initMarquee } from './marquee.js'

initMarquee()

// Set active nav link based on current path
const path = window.location.pathname
document.querySelectorAll('.nav-btn').forEach(btn => {
  const href = btn.getAttribute('href')
  const isHome = href === '/' && path === '/'
  const isOther = href !== '/' && path.startsWith(href)
  if (isHome || isOther) btn.classList.add('active')
})
