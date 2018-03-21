##	jinang/sogo

To set something into object, or get something from object.

```javascript
const sogo = require('jinang/sogo');

let foo = {};
sogo.set(foo, 'user.address.city', 'Shanghai');
// Now `foo` equals `{ user: { address: { city: 'Shanghai' } } }`.
```

*   boolean __sogo.set__( Object *obj*, string *chainedName*, any *value* )
*   boolean __sogo.set__( Object *obj*, string *chainedName*, any *value*, object *setOptions* )
*   boolean __sogo.set__( Object *obj*, string[] *names*, any *value* )
*   boolean __sogo.set__( Object *obj*, string[] *names*, any *value*, object *setOptions* )
*   any __sogo.get__( Object *obj*, string *chainedName* )
*   any __sogo.get__( Object *obj*, string *chainedName*, object *getOptions* )
*   any __sogo.get__( Object *obj*, string[] *names* )
*   any __sogo.get__( Object *obj*, string[] *names*, object *getOptions* )

Read [unit test code](../test/sogo.js) for more examples.
