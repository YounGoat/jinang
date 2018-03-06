##	jinang/jointString

*   string __jointString__( string *joint*, string *str_1*, string *str_2*, ...)  
    Concatenate strings with *joint*. If the end of the front string or the beginning of the rear one equals to *joint*, it will be trimmed before being concatenated.

E.g.
```javascript
const jointString = require('jinang/jointString');
jointString('/', 'a/', '/b');
jointString('/', 'a' , '/b');
jointString('/', 'a/',  'b');
jointString('/', 'a' ,  'b');
// All return 'a/b'.
```