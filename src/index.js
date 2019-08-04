import { noop, getElements } from './modules/utility'

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
    const { onEnter } = options
    const els = getElements(target)

    if (
      !('IntersectionObserver' in window) ||
      document.body.offsetWidth > window.innerWidth // Because there are elements that IntersectionObserver does not fire.
    ) {
      els.forEach(el => {
        onEnter(el)
      })
      return
    }

    this._ieEls = []

    els.forEach(el => {
      this._ieEls.push(new IntersectionEventsEl(el, options))
    })
  }

  execute () {
    if (!this._ieEls) return

    this._ieEls.forEach(el => {
      el.execute(el._observer.takeRecords())
    })
  }

  destroy () {
    if (!this._ieEls) return

    this._ieEls.forEach(el => {
      el.destroy()
    })
  }
}

/**
 *
 */
class IntersectionEventsEl {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} options
   * @param {handler} options.onEnter - Event handler when the element enters window
   * @param {handler} [options.onLeave=noop] - Event handler when the element leaves window
   * @param {number} [options.enterThreshold=1] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) when element enters window
   * @param {number} [options.leaveThreshold=0] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) when element leaves window
   * @param {number} [options.enterThresholdSp=options.enterThreshold] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) enterThreshold in smartphone view
   * @param {number} [options.leaveThresholdSp=options.leaveThreshold] - [Threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) leaveThreshold in smartphone view
   * @param {boolean} [options.isOnce=false] - Whether to detect enter only once
   * @param {boolean} [options.isSP=noop] - Function to judge whether smartphone view or not
   */
  constructor (el, options = {}) {
    const { onEnter, onLeave = noop, isSP = noop, isOnce = false } = options
    this._onEnter = onEnter
    this._onLeave = onLeave
    this._isOnce = isOnce
    const { enterThreshold = MAX_THRESHOLD, leaveThreshold = 0 } = options
    const {
      enterThresholdSp = enterThreshold,
      leaveThresholdSp = leaveThreshold
    } = options

    this._el = el
    this._isSP = isSP
    const isSPView = isSP()

    this._selfEnterThreshold = isSPView
      ? parseFloat(el.dataset['enterThresholdSp']) || enterThresholdSp
      : parseFloat(el.dataset['enterThreshold']) || enterThreshold
    this._selfLeaveThreshold = isSPView
      ? parseFloat(el.dataset['leaveThresholdSp']) || leaveThresholdSp
      : parseFloat(el.dataset['leaveThreshold']) || leaveThreshold

    this._selfEnterThreshold = Math.min(this._selfEnterThreshold, MAX_THRESHOLD)
    this._selfLeaveThreshold = Math.min(this._selfLeaveThreshold, MAX_THRESHOLD)

    if (this._selfEnterThreshold === this._selfLeaveThreshold) {
      this._checkEnter = entry => entry.isIntersecting
      this._checkLeave = entry =>
        this._selfLeaveThreshold === 0 ? !entry.isIntersecting : entry.isIntersecting
    } else {
      this._checkEnter = (entry, enterRatio, leaveRatio) =>
        entry.isIntersecting && enterRatio <= leaveRatio
      this._checkLeave = (entry, enterRatio, leaveRatio) => enterRatio >= leaveRatio
    }

    this._isEnter = false
    this._prevTop = document.body.offsetHeight

    // When the height of the element is larger than the window, change threshold so that it fits within the window.
    const rate = window.innerHeight / el.offsetHeight
    if (this._selfEnterThreshold > rate) {
      this._selfEnterThreshold *= rate
    }
    if (this._selfLeaveThreshold > rate) {
      this._selfLeaveThreshold *= rate
    }

    this._observer = new IntersectionObserver(this.execute.bind(this), {
      threshold: [this._selfLeaveThreshold, this._selfEnterThreshold]
    })

    this._observer.observe(el)
  }

  execute (entries) {
    entries.forEach(entry => {
      const {
        target,
        intersectionRatio,
        boundingClientRect,
        rootBounds
      } = entry

      const enterRatio = Math.abs(intersectionRatio - this._selfEnterThreshold)
      const leaveRatio = Math.abs(intersectionRatio - this._selfLeaveThreshold)

      const currentTop = boundingClientRect.top
      const isUp = currentTop > this._prevTop
      const relativeTop =
        currentTop + boundingClientRect.height * intersectionRatio
      const topDiff = Math.abs(relativeTop - rootBounds.top)
      const bottomDiff = Math.abs(relativeTop - rootBounds.bottom)
      const isTop = topDiff < bottomDiff
      this._prevTop = currentTop

      if (
        !this._isEnter &&
        ((((!isUp && !isTop) || (isUp && isTop)) &&
        this._checkEnter(entry, enterRatio, leaveRatio)) ||
          entry.intersectionRatio >= this._selfEnterThreshold)
      ) {
        // enter
        this._isEnter = true

        this._onEnter(target, isUp)

        this._isOnce && this.destroy()
      } else if (
        this._isEnter &&
        ((((!isUp && isTop) || (isUp && !isTop)) &&
        this._checkLeave(entry, enterRatio, leaveRatio)) ||
          entry.intersectionRatio < this._selfEnterThreshold)
      ) {
        // leave
        this._isEnter = false

        this._onLeave(target, isUp)
      }
    })
  }

  destroy () {
    this._observer.unobserve(this._el)
  }
}

/**
 * @typedef {function} handler
 * @param {Element} el - element object
 * @param {Boolean} isUp - Whether scroll direction is up
 */
