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

    if (!('IntersectionObserver' in window)) {
      getElements(target).forEach(el => {
        onEnter(el)
      })
      return
    }

    let { enterThreshold = MAX_THRESHOLD, leaveThreshold = 0 } = options

    getElements(target).forEach(el => {
      let selfEnterThreshold = parseFloat(el.dataset.enterThreshold) || enterThreshold
      let selfLeaveThreshold = parseFloat(el.dataset.leaveThreshold) || leaveThreshold

      if (selfEnterThreshold === 1) {
        selfEnterThreshold = MAX_THRESHOLD
      }
      if (selfLeaveThreshold === 1) {
        selfLeaveThreshold = MAX_THRESHOLD
      }

      let checkEnter
      let checkLeave
      if (selfEnterThreshold === selfLeaveThreshold) {
        checkEnter = entry => entry.isIntersecting
        checkLeave = entry =>
          selfLeaveThreshold === 0 ? !entry.isIntersecting : entry.isIntersecting
      } else {
        checkEnter = entry => {
          const enterRatio = Math.abs(entry.intersectionRatio - selfEnterThreshold)
          const leaveRatio = Math.abs(entry.intersectionRatio - selfLeaveThreshold)
          return enterRatio <= leaveRatio
        }
        checkLeave = entry => {
          const enterRatio = Math.abs(entry.intersectionRatio - selfEnterThreshold)
          const leaveRatio = Math.abs(entry.intersectionRatio - selfLeaveThreshold)
          return enterRatio >= leaveRatio
        }
      }

      let isEnter = false
      const callback = entries => {
        entries.forEach(entry => {
          const el = entry.target

          if (!isEnter && checkEnter(entry)) {
            // enter
            isEnter = true
            onEnter(el)

            isOnce && observer.unobserve(el)
          } else if (isEnter && checkLeave(entry)) {
            // leave
            isEnter = false
            onLeave(el)
          }
        })
      }

      // When the height of the element is larger than the window, change threshold so that it fits within the window.
      const rate = window.innerHeight / el.offsetHeight
      const isOverEnter = selfEnterThreshold > rate
      const isOverLeave = selfLeaveThreshold > rate

      const observer = new IntersectionObserver(callback, {
        threshold: [
          isOverLeave ? selfLeaveThreshold * rate : selfLeaveThreshold,
          isOverEnter ? selfEnterThreshold * rate : selfEnterThreshold
        ]
      })

      observer.observe(el)
    })
  }
}

/**
 * @typedef {function} handler
 * @param {Element} el - element object
 */
