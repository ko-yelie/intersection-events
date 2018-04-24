# intersection-events
Wrapper of [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

You can detect when elements **enter and leave** window.

Less Size, Less Features

## ES Modules

[npm](https://www.npmjs.com/package/intersection-events)

```sh
npm i intersection-events
```

[Docs](https://ko-yelie.github.io/intersection-events/class/src/index.js~IntersectionEvents.html)

```js
import IntersectionEvents from 'intersection-events'

new IntersectionEvents('.js-target', {
  onEnter: () => {
    // When the whole element enters window
  },
  onLeave: () => {
    // When the whole element leaves window
  }
})
```

## CDN

[Download](https://unpkg.com/intersection-events) (1.4 KB)

```html
<script src="https://unpkg.com/intersection-events"></script>
```

```js
new IntersectionEvents('.js-target', {
  onEnter: () => {}
})
```

---

If you should support browsers that do not support IntersectionObserver, use [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

---

If you want more features, please consider other libraries.

- [Scrollama](https://github.com/russellgoldenberg/scrollama)
