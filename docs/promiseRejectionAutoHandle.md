##	jinang/promiseRejectionAutoHandle

By default, an instance of `Promise` without `.catch(onReject)` will throw an exception while it is rejected. __promiseRejectionAutoHandle__ will catch the exception automatically in such situations.

```javascript
const handler = (err) => console.log(err);
require('jinang/promiseRejectionAutoHandle')(handler);
// The *handler* is not required

new Promise((resolve, reject) => { /* ... */ })
    .then(data => {
        /* ... */
    })
    ;
```

Read [unit test code](../test/promiseRejectionAutoHandle.js) for more examples.
