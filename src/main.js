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

// Scroll arrow — only visible on home page, hides on scroll
const scrollArrow = document.querySelector('.scroll-arrow')
const scrollContainer = document.querySelector('.site-content-area')
if (scrollArrow && scrollContainer) {
  const isHome = path === '/' || path === '/index.html'
  const isServices = path.startsWith('/services')
  if (!isHome && !isServices) {
    scrollArrow.classList.add('hidden')
  } else {
    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop > 40) {
        scrollArrow.classList.add('hidden')
      } else {
        scrollArrow.classList.remove('hidden')
      }
    }, { passive: true })
  }
}
