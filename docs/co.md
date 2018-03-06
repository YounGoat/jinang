##	jinang/co

Light-weighted implementation of cocurrency wrapper of generator function.

*   Promise __co__(GeneratorFunction *fn*)

```javascript
const co = require('jinang/co');

// A generator function.
function* success() {
    // yield promise.
    let a = yield Promise.resolve('A');

    // yield thunkified function.
    let b = yield callback => {
        setTimeout(() => callback(null, 'B'), 100);
    };

    return a + b;
}

// A triditional callback is acceptable.
co(success, function(err, data) {
    // err equals null
    // data euqals "AB"
});
// RETURN undefined

// When no callback passed in, an instance of Promise will be returned.
co(success).then(ret => {
    // ret equals "AB"
});
```