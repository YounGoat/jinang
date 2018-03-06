##	jinang/sleep

Make current process to "sleep" for a while.

```javascript
const sleep = require('jinang/sleep');

// Block the current process for 2000 milliseconds (2 seconds).
sleep(2000);
```

In `co(function*() { /* ... */ })` code block, `sleep.promise()` is recommended because it is more precise.
```javascript
const sleep = require('jinang/sleep');
const co = require('co');

co(function*() {
    yield sleep.promise(2000);
});
```