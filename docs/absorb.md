##	jinang/absorb

Used to concatenate following array(s) to the firt one. Be different from `[].concat()`, `absort()` will push following values or items of following array(s) to the first array. 

__jinang/absorb__ achieves the similiar for arrays as what as `Object.assign()` does for objects.

*   number __absorb__( Array foo, Array bar )

```javascript
const absort = require('jinang/absorb');
let a = [1, 2, 3];

// Push items of the second array into the first array one by one.
absorb(a, [4, 5, 6]);
// RETURN 6 (the length of array a)

// Now array a has 6 items.
```