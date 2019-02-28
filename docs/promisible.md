##	jinang/promisible

According to Node.js docs about `util.promisify(original)`:
> Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.

Here, __promisible__ does similar to `util.promisify` but the position for *callback* is reserved.

```javascript
const promisible = require('jinang/promisible');

function old_fn(params, callback) {
    // ...
};

let new_fn = promisible(old_fn);

// If callback not offered, a promise will be returned.
new_fn(params)
    .then((data) => { /* ... */ })
    .catch((error) => { /* ... */ })
    ;

// Otherwise, it behaves just as nothing changed.
new_fn(params, (error, data) => { /* ... */ });
```
