# intersection-events
Wrapper of [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

You can detect when **the whole element enters and leaves** window.

## Installation

### ES Modules

[npm](https://www.npmjs.com/package/intersection-events)

```sh
npm i intersection-events
```

```js
import IntersectionEvents from 'intersection-events'
```

### CDN

[unpkg](https://unpkg.com/intersection-events) (1.33 KB)

```html
<script src="https://unpkg.com/intersection-events"></script>
```

## Usage

[Docs](https://ko-yelie.github.io/intersection-events/class/src/index.js~IntersectionEvents.html)

```js
new IntersectionEvents('.js-target', {
  onEnter: el => {
    // When the whole element enters window
  },
  onLeave: el => {
    // When the whole element leaves window
  }
})
```

```html
<div class="js-target"></div>

<!-- Set threshold only for this element -->
<div class="js-target" data-enter-threshold="0.5" data-leave-threshold="0.5"></div>
```

If you want to detect enter only once, set `isOnce` option to `true`.

```js
new IntersectionEvents('.js-target', {
  onEnter: el => {
    // Do only once
  },
  isOnce: true
})
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome |
| --------- | --------- | --------- |
| Edge| last version| last version

### Note

If you need to support browsers that do **not** support `IntersectionObserver`, load the **[`IntersectionObserver` polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).**

If the `IntersectionObserver` polyfill is loaded, browsers support is as follows.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last version| last version| last version| last version

---

If you want more features, please consider other libraries.

- [Scrollama](https://github.com/russellgoldenberg/scrollama)
