##	jinang/forInObject

*   void __forInObject__( object *foo*, Function *iterator* )  
    Function *iterator* SHOULD accept two arguments. 
    
E.g. 
```javascript
const forInObject = require('jinang/forInObject');
forInObject({ nick: 'YounGoat' }, (name, value) {
    console.log(name);
    console.log(value);
});
```

When `iterator(name, value)` returns strictly `false`, the iteration will be broken (as `for (...) { break; }`). E.g.
```javascript
const forInObject = require('jinang/forInObject');
const owners = {
    'foo': { name: 'Foo' },
    'youngoat': { name: 'Ching' },
    'bar': { name: 'Bar' },
}

let num = 0;
forInObject(owners, (name, value) {
    num++;
    console.log(value.name);
    if (name == 'youngoat') return false;
});
// OUTPUT:
//   Foo
//   Ching
// And now, `num` euqals 2.
