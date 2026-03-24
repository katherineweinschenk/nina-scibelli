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
  const isAbout = path.includes('/about')
  if (isAbout) {
    scrollArrow.classList.add('hidden')
  } else {
    // Reset scroll position on fresh load so the arrow stays visible
    scrollContainer.scrollTop = 0

    let userHasScrolled = false
    scrollContainer.addEventListener('scroll', () => {
      userHasScrolled = true
      if (scrollContainer.scrollTop > 40) {
        scrollArrow.classList.add('hidden')
      } else {
        scrollArrow.classList.remove('hidden')
      }
    }, { passive: true })

    // Ignore any scroll shifts from fonts/images loading in the first second
    setTimeout(() => {
      if (!userHasScrolled) {
        scrollContainer.scrollTop = 0
        scrollArrow.classList.remove('hidden')
      }
    }, 1000)
  }
}
