##	jinang/absorb

*   number __absorb__( Array foo, Array bar )

```javascript
const absort = require('jinang/absorb');
let a = [1, 2, 3];

// Push items of the second array into the first array one by one.
absorb(a, [4, 5, 6]);
// RETURN 6 (the length of array a)

// Now array a has 6 items.
```