##	jinang/safeClone

__safeClone__ is deep and partial clone method. The skeleton of the original argument will be kept and the primitive items or properties will be copied, while the complex values will be ignored. Whatever you do with the returned value, the original will not be affected.

```javascript
const safeClone = require('jinang/safeClone');

const foo = {
    a: undefined,
    b: null,
    c: 1,              // number
    d: 'foobar',       // string
    e: true,           // boolean
    f: function() {},  // function
    g: [ , , 2, ],     // Array
}

let bar = safeClone(foo);
bar.a === undefined;
bar.b === null;
bar.c === 1;
bar.d === 'foobar';
bar.e === true;
bar.hasOwnProperty('f') === false;
bar.g.length === 3;

// The original will not change when the cloned changed.
bar.g.pop();
foo.g.length === 3;
```

Read [unit test code](../test/safeClone.js) for more examples.
