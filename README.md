# intersection-events
Wrapper of IntersectionObserver

```js
import IntersectionEvents from 'intersection-events'

new IntersectionEvents('.js-target', {
  onEnter: () => {
    // when element enter the window
  },
  onLeave: () => {
    // when element leave the window
  }
})
```

---

```html
<script src="https://unpkg.com/intersection-events"></script>
```

```js
new IntersectionEvents('.js-target', {
  onEnter: () => {
  }
})
```
