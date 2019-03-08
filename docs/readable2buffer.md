##	jinang/readable2buffer

Read a stream and callback with a buffer.

*   Promise __readable2buffer__( stream.Readable *rs* )
*   void __readable2buffer__( stream.Readable *rs*, Function *callback* )

```javascript
const readable2buffer = require('jinang/readable2buffer');

// If callback offered, it will be invoked on end of stream or on error.
readable2buffer(rs, function(err, buf) {
    // ...
});

// Without callback, a promise will be returned directly.
readable2buffer(rs)
    .then(buf => {
        // ...
    })
    .catch(err => {
        // ...
    })
    ;
```
