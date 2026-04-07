const PHRASE = 'slow down'
const SEPARATOR = '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'
const PHRASES_PER_ITEM = 8
const ITEM_COUNT = 4

function createItem() {
  const el = document.createElement('div')
  el.className = 'marquee-item'
  el.textContent = Array(PHRASES_PER_ITEM).fill(PHRASE).join(SEPARATOR) + SEPARATOR
  return el
}

export function initMarquee() {
  const wrapper = document.createElement('div')
  wrapper.className = 'marquee-wrapper'
  wrapper.setAttribute('aria-hidden', 'true')

  const track = document.createElement('div')
  track.className = 'marquee-track'

  for (let i = 0; i < ITEM_COUNT; i++) {
    track.appendChild(createItem())
  }

  wrapper.appendChild(track)

  const slot = document.querySelector('.marquee-slot')
  if (slot) slot.appendChild(wrapper)
}
