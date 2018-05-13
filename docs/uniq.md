##	jinang/uniq

Compare silbling items in an arry and ignore the replications.

```javascript
const uniq = require('jinang/uniq');

let nums = [2, 1, 1, 2, 3];
uniq(nums);
// RETURN [2, 1, 2, 3];
```

### API

*   Array __uniq__( Array *data* )

*options* looks like:
```javascript
{
    parser, /* string | Function OPTIONAL */
}
```

*   If *parser* is a string, corresponding property or member method of item in *data* will be used on being compared with each other.  
    If string *parser* ends with `()`, it is regarded as referring to a member method which will be invoked __with no arguments__ and the returned value will be compared with each other.  
    Otherwise, string *parser* is regarded as name of a property.

*   If *parser* is a function, it will be invoked with array item as the only argument on being compared, and the returned value will be compared with each other.
