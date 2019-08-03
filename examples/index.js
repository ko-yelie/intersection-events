import IntersectionEvents from '../src/index.js'

const intersectionEvents = new IntersectionEvents('.js-target', {
  onEnter: (el, isUp) => {
    el.innerText = `enter\nisUp: ${isUp}`
    el.classList.add('show')
  },
  onLeave: (el, isUp) => {
    el.innerText = `leave\nisUp: ${isUp}`
    el.classList.remove('show')
  }
})
