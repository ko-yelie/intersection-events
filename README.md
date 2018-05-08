# intersection-events
Wrapper of [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

You can detect when **the whole element enters and leaves** window.

Less Features, Less Size

## ES Modules

[npm](https://www.npmjs.com/package/intersection-events)

```sh
npm i intersection-events
```

[Docs](https://ko-yelie.github.io/intersection-events/class/src/index.js~IntersectionEvents.html)

```js
import IntersectionEvents from 'intersection-events'

new IntersectionEvents('.js-target', {
  onEnter: el => {
    // When the whole element enters window
  },
  onLeave: el => {
    // When the whole element leaves window
  }
})
```

## CDN

[Download](https://unpkg.com/intersection-events) (1.7 KB)

```html
<script src="https://unpkg.com/intersection-events"></script>
```

```js
new IntersectionEvents('.js-target', {
  onEnter: () => {}
})
```

## Note

**If you should support browsers that do not support IntersectionObserver, use [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).**

---

If you want more features, please consider other libraries.

- [Scrollama](https://github.com/russellgoldenberg/scrollama)
