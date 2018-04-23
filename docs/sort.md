##	jinang/sort

Sort an array.

```javascript
const sort = require('jinang/sort');

let nums = [1, 12, 9, 80];
sort(nums);

let persons = [
    { age: 1 },
    { age: 12 },
    { age: 9 },
    { age: 80 },
];
sort(persons, 'age');
```

### API

*   Array __sort__( Array *data* )
*   Array __sort__( Array *data*, string | Function *parser* )
*   Array __sort__( Array *data*, object *options* )

*options* looks like:
```javascript
{
    parser, /* string | Function OPTIONAL */
    lock, /* boolean DEFAULT false */
}
```

*   If *parser* is a string, corresponding property or member method of item in *data* will be used on being compared with each other.  
    If string *parser* ends with `()`, it is regarded as referring to a member method which will be invoked __with no arguments__ and the returned value will be compared with each other.  
    Otherwise, string *parser* is regarded as name of a property.

*   If *parser* is a function, it will be invoked with array item as the only argument on being compared, and the returned value will be compared with each other.

*   If *lock* is `true`, passed-in array *data* will be locked and not changed during the sort operation. By default, items in *data* will be resorted.