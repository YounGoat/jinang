##	jinang/split

Split string in different ways.

*   Array __split__(string *s*, string | RegExp *seperator*)  
    The first parameter is the string to be split.  
    *seperator* may be a string or a regular expression object.

*   Array __split__(string *s*, string | RegExp *seperator*, string | Array *delimiter*)  
    Substring enbraced by SAME *delimiter* will not be split. Each *delimiter* SHOULD be a character (1-length string).

*   Array __split__(string *s*, string | RegExp *seperator*, string | Array *delimiter*, string *escaper*)  
    

```javascript
const split = require('jinang/split');

split('foo bar baz', ' ');
// RETURN: [ "foo", "bar", "baz" ]

split('foo==bar==baz', '==');
// RETURN: [ "foo", "bar", "baz" ]

split('foo "bar baz"', ' ', '"');
// RETURN: [ "foo", "bar baz" ]

split('foo "bar\\"baz"', ' ', '"');
// RETURN: [ "foo", "bar\\"baz" ]
```

Read [unit test code](../test/split.js) for more examples.