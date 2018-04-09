import noop from 'noop-es2015'
import getElements from 'get-elements-array'

const MAX_THRESHOLD = 0.99 // 1 だとアニメーションが発火しない端末が出るのでそれを回避

/**
 * Wrapper of IntersectionObserver
 *
 * @example
 * new IntersectionEvents('.js-target', {
 *   onEnter: () => {
 *     // 要素がウィンドウ内に入ったとき
 *   },
 *   onLeave: () => {
 *     // 要素がウィンドウ外に出たとき
 *   }
 * })
 */
export default class IntersectionEvents {
  /**
   * @param {string|NodeList|Element|Element[]} target - IntersectionObserver 対象要素
   * @param {Object} options
   * @param {function} options.onEnter - 要素がウィンドウ内に入ったときに実行する関数
   * @param {function} [options.onLeave=noop] - 要素がウィンドウ外に出たときに実行する関数
   * @param {number} [options.enterThreshold=MAX_THRESHOLD] - 要素がウィンドウ内に入るときの threshold
   * @param {number} [options.leaveThreshold=0] - 要素がウィンドウ外に出るときの threshold
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
          // 要素全体がウィンドウ内に入ったとき
          el.isEnter = true
          onEnter()
        } else if (el.isEnter && isLeave(entry)) {
          // 要素全体がウィンドウ外に出たとき
          el.isEnter = false
          onLeave()
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
        // 要素の高さがウィンドウより大きいときは、 threshold をウィンドウ内に収まるように変更する
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
