##	jinang/co

Light-weighted implementation of cocurrency wrapper of generator function.

*   Promise __co__(GeneratorFunction *fn*)
*   Promise __co.easy__(GeneratorFunction *fn*)

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

    let c = yield subtask;

    return a + b;
}

function* subtask() {
    let m = yield Promise.resolve(1);
    let n = yield Promise.resolve(1);
    return m + n;
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

##  Difference between `co` and `co.easy`

For `co`, operator `yield` expects a *promise*, *generator function* or *thunkify function*. If something following `yield` is not expected, an error will be thrown.

For `co.easy`, anything is allowed to follow `yield` operator. If it is instance of `Promise` or `Function`, itself will be returned by `yield`. E.g.

```javascript
const co = require('jinang/co');

// A generator function.
co.easy(function* success() {
    let a = yield Promise.resolve('A');
    // `a` now equals 'A'.

    let b = yield 'B';
    // `b` now equals 'B';

    return a + b;
});
```