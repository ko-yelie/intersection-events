import { noop, getElements } from './lib/utility'

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
   * @param {boolean} [options.isOnce=false] - Whether to detect enter only once
   */
  constructor (target, options = {}) {
    const {
      onEnter,
      onLeave = noop,
      isOnce = false
    } = options

    if (!'IntersectionObserver' in window) {
      getElements(target).forEach(el => {
        onEnter(el)
      })
      return
    }

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
      isEnter = entry => {
        const enterRatio = Math.abs(entry.intersectionRatio - enterThreshold)
        const leaveRatio = Math.abs(entry.intersectionRatio - leaveThreshold)
        return enterRatio <= leaveRatio
      }
      isLeave = entry => {
        const enterRatio = Math.abs(entry.intersectionRatio - enterThreshold)
        const leaveRatio = Math.abs(entry.intersectionRatio - leaveThreshold)
        return enterRatio >= leaveRatio
      }
    }

    const callback = entries => {
      entries.forEach(entry => {
        const el = entry.target

        if (!el.intersectionEvents.isEnter && isEnter(entry)) {
          // enter
          el.intersectionEvents.isEnter = true
          onEnter(el)

          isOnce && el.intersectionEvents.observer.unobserve(el)
        } else if (el.intersectionEvents.isEnter && isLeave(entry)) {
          // leave
          el.intersectionEvents.isEnter = false
          onLeave(el)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      threshold: [leaveThreshold, enterThreshold]
    })

    getElements(target).forEach(el => {
      el.intersectionEvents = {}
      el.intersectionEvents.isEnter = false

      const rate = window.innerHeight / el.offsetHeight
      const isOverEnter = enterThreshold > rate
      const isOverLeave = leaveThreshold > rate
      el.intersectionEvents.observer = observer

      if (isOverEnter || isOverLeave) {
        // When the height of the element is larger than the window, change threshold so that it fits within the window.
        el.intersectionEvents.observer = new IntersectionObserver(callback, {
          threshold: [
            isOverLeave ? leaveThreshold * rate : leaveThreshold,
            isOverEnter ? enterThreshold * rate : enterThreshold
          ]
        })
      }

      el.intersectionEvents.observer.observe(el)
    })
  }
}

/**
 * @typedef {function} handler
 * @param {Element} el - element object
 */
