##	jinang/shorten

To shorten a string to specified length.

```javascript
const shorten = require('jinang/shorten');

shorten('ching-loves-ching', 13);
// RETURN: "...-loves-..."
```

*   string __shorten__( string *text*, number *maxLength* [, string *style* ] )

The length of returned string including appended decorators will not exceed *maxLength*.

Argument *style* may be one of the following:
*   __cutHead__
*   __cutTail__
*   __cutEnds__
*   __keepEnds__
*   __keepHead__
*   __keepBody__
*   __keepTail__

Read [unit test code](../test/shorten.js) for more examples.
