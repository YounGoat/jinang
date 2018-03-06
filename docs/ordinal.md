##	jinang/ordinal

Acquire the ordinal form of a natural number, e.g. *1st* for *1*, *22nd* for *22*.

```javascript
const ordinal = require('jinang/ordinal');

ordinal(1);
// RETURN 1st

ordinal(101);
// RETURN 101st

ordinal.suffix(22);
// RETURN nd

ordinal(0);
// throws Error
```

*   string __ordinal__(number | string *n*) throws  
    Return the ordinal form of a natural number.  
    If *n* is not a natural number, an Error will be thrown.

*   string __oridnal.suffix__(number | string *n*) throws    
    Return only the ordinal suffix.  
    If *n* is not a natural number, an Error will be thrown.
