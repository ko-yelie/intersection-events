import { noop } from './lib/utility'
import getElements from 'get-elements-array'

const MAX_THRESHOLD = 0.99 // If it is 1, a device that will not fire an animation comes out, so avoid it.

/**
 * Wrapper of IntersectionObserver
 */
export default class IntersectionEvents {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} options
   * @param {handler} options.onEnter - Event handler when the element enters window
   * @param {handler} [options.onLeave=noop] - Event handler when the element leaves window
   * @param {number} [options.enterThreshold=1] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) when element enters window
   * @param {number} [options.leaveThreshold=0] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) when element leaves window
   */
  constructor (target, options = {}) {
    const { onEnter, onLeave = noop } = options
    let { enterThreshold = MAX_THRESHOLD, leaveThreshold = 0 } = options

    if (enterThreshold === 1) {
      enterThreshold = MAX_THRESHOLD
    }
    if (leaveThreshold === 1) {
      leaveThreshold = MAX_THRESHOLD
    }

    let isEnter
    let isLeave
    if (enterThreshold === leaveThreshold) {
      isEnter = entry => entry.isIntersecting
      isLeave = entry =>
        leaveThreshold === 0 ? !entry.isIntersecting : entry.isIntersecting
    } else {
      isEnter = entry =>
        Math.abs(entry.intersectionRatio - enterThreshold) <=
        Math.abs(entry.intersectionRatio - leaveThreshold)
      isLeave = entry =>
        Math.abs(entry.intersectionRatio - enterThreshold) >=
        Math.abs(entry.intersectionRatio - leaveThreshold)
    }

    const callback = entries => {
      entries.forEach(entry => {
        const el = entry.target

        if (!el.isEnter && isEnter(entry)) {
          // enter
          el.isEnter = true
          onEnter(el)
        } else if (el.isEnter && isLeave(entry)) {
          // leave
          el.isEnter = false
          onLeave(el)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      threshold: [leaveThreshold, enterThreshold]
    })

    getElements(target).forEach(el => {
      el.isEnter = false

      const rate = window.innerHeight / el.offsetHeight
      const isOverEnter = enterThreshold > rate
      const isOverLeave = leaveThreshold > rate
      let currentObserver = observer

      if (isOverEnter || isOverLeave) {
        // When the height of the element is larger than the window, change threshold so that it fits within the window.
        currentObserver = new IntersectionObserver(callback, {
          threshold: [
            isOverLeave ? leaveThreshold * rate : leaveThreshold,
            isOverEnter ? enterThreshold * rate : enterThreshold
          ]
        })
      }

      currentObserver.observe(el)
    })
  }
}

/**
 * @typedef {function} handler
 * @param {Element} el - element object
 */
