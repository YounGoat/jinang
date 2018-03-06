##	jinang/currying

Transform a normal function to a curried one.

*   curried Function __currying__( Function *fn*, number *paramsLength* )

```javascript
const currying = require('jinang/currying');

function plus(a, b, c) {
    return a + b + c;
}

// Create a curried function.
// 3 means that the original function plus() should be invoked with 3 arguments.
var curriedPlus = currying(plus, 3);

// Curried function accepts one and only one argument.
// It may return a new curried function, or the result returned by the original function.
curriedPlus(1);       // RETURN a new function.
curriedPlus(1)(2);    // RETURN a new function.
curriedPlus(1)(2)(3); // RETURN 6.
```

ATTENTION: __Although *Currying* and *Partial Application* are mutually related, they are DIFFERENT.__ If you wanna create a new function which is based on an existing function and with some arguments predefined, use __[papply](./papply.md)__.

Read more about *currying*:
*   WIKIPEDIA.org, [Currying](https://en.wikipedia.org/wiki/Currying)
*   WIKIPEDIA.org, [Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus)