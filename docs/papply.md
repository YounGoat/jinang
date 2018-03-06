
##	jinang/papply

Word "papply" is abbreviation of *Partial Application*, which means to apply a function to some of its arguments and return a new function with fewer parameters.

__papply__ offers three styles:
*   Function __papply__(Function *fn*, any *leading_argument*, ...)  
    Create a new function based on *fn* with leading arguments predefined by any number of *leading_argument*.
    
*   Function __papply.tail__(Function *fn*, any *tailing_argument*, ...)  
    Create a new function based on *fn* with tailing arguments predefined by any number of *tailing_argument*. The last *tailing_argument* will also be the last argument finally passed into *fn*.

*   Function __papply.position__(Function *fn*, [ number *position*, any *value* ] *positioned_argument*, ...)  
    Create a new function based on *fn* with some position(s) of argument list predefined by any number of *positioned_argument*.   
    The final arguments passed into *fn* will be the shortest list which contains all positioned arguments and real arguments. Sometimes the final arguments will be tailed with one or more `undefined`.  
    If *position* is 0 or positive integer, it indicates the position from left (starts with 0). Otherwise, if *position* is negative integer, it indicates the position from right (starts with -1).

```javascript
const papply = require('jinang/papply');

// -- papply --

// Suppose a function with three parameters.
function add(a, b, c) {
    return a + b + c;
}

// Run partial application and return a new function.
const add2 = papply(add, 2);
add2(3, 4); // RETURN 2 + 3 + 4

const add2_3 = papply(add, 2, 3);
add2_3(4); // RETURN 2 + 3 + 4

// -- papply.tail --

function minus(a, b, c) {
    return a - b*1 - c*2;
}

const minus2 = papply.tail(minus, 2);
minus2(9, 3); // RETURN 9 - 3 - 2*2 = 2

const minus2_3 = papply.tail(minus, 2, 3);
minus2_3(9); // RETURN 9 - 2 - 3*2 = 1

// -- papply.position --

function join() {
    let args = Array.from(arguments);
    let chars = args.map(n => typeof n == 'undefined' ? '-' : n);
    return chars.join('');
}

const join_z = papply.position(join, [ -1, 'z' ]);
join_z('a');
```

Read more about *partial application*:
*   WIKIPEDIA.org, [Partial application](https://en.wikipedia.org/wiki/Partial_application)
*   [Curry or Partial Application? The Difference Between Partial Application and Curry](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
*   StackOverflow.com, [What is the difference between currying and partial application?](https://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application)
*   2ality.com, [Currying versus partial application (with JavaScript code)](http://2ality.com/2011/09/currying-vs-part-eval.html)