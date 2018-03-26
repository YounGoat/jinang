##	jinang/absorb

Used to concatenate following array(s) to the firt one. Be different from `[].concat()`, `absort()` will push following values or items of following array(s) to the first array. 

__jinang/absorb__ achieves the similiar for arrays as what as `Object.assign()` does for objects.

*   number __absorb__( Array *foo*, Array *bar* )
*   number __absorb__( Array *foo*, Object | number | string | boolean | Function *bar* )
*   number __absorb__( Array *foo*, undefined | null *bar* )

```javascript
const absort = require('jinang/absorb');
let a = [1, 2, 3];

// Push items of the second array into the first array one by one.
absorb(a, [4, 5, 6]);
// RETURN 6 (the length of array a)
// Now array a has 6 items.

absort(a, 7);
// RETURN 7 (the length of array a)
// Now array a has 7 items.

absorb(a, undefined);
absorb(a, null);
absorb(a, []);
// Nothing happend to `a`.

// However, `undefined` or `null` contained in an array will be absorbed.
absorb(a, [ undefined ]);
absorb(a, [ null ]);
// Now array a has 9 items, the last two are `undefined` and `null`.
```