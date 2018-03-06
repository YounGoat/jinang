##	jinang/PoC

__PoC__ means *Promise or Callback*. It may be invoked in an asychronuous function to create an return an instance of `Promise` or to invoke the `callback` function if passed.

```javascript
const PoC = require('jinang/PoC');

function asyncDemo(params, callback) {
    return PoC((done) => {
        // ...
        done(error, data);
    }, callback);
};

asyncDemo(params)
    .then((data) => { /* ... */ })
    .catch((error) => { /* ... */ })
    ;

// When callback passed, PoC will return void.
asyncDemo(params, (error, data) => { /* ... */ });
```
