##	jinang/ott

*ott* is abbreviation of *Once, Twice, Thrice*.

```javascript
const ott = require('jinang/ott');

let n = 0;
function fn() {
    return n++;
};

let fn3 = ott(fn, 3);

fn3(); // n == 1; RETURN 0
fn3(); // n == 2; RETURN 1
fn3(); // n == 3; RETURN 2

// n will not change more by fn3
fn3(); // n == 3
fn3(); // n == 3

fn3.runtimes(); // RETURN 5
```

*   Function __ott__(Function *fn*, number *n*)
*   Function __ott__(Function *fn*, number *n*, any *returnOnExceeding*)
*   Symbol __ott.FIRST__
*   Symbol __ott.LAST__
*   Function __ott.once__(Function *fn*)
*   Function __ott.twice__(Function *fn*)
*   Function __ott.thrice__(Function *fn*)

`ott()` returns a wrapper of the provided function. When the returned function has been invoked for *n* times, what it returns on next calls depends on the parameter *returnOnExceeding*:
*   If `ott.FIRST` used, it will return what it firstly returned. 
*   If `ott.LAST` used, it will return what it returned on *n*-th call.
*   Otherwise, it will return just *returnOnExceeding*.