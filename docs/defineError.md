##	jinang/defineError

*   Function __defineError__( string *ErrorName*, Function *ParentErrorClass*, Function *constructor* )

E.g.
```javascript
// Modules are independent for each other and are suggested to be required independently.
const defineError = require('jinang/defineError');

const MyError = defineError('MyError', Error, function(message) {
    this.code = 'SOMETHING_IS_WRONG';
    this.message = message;
});

// ...
throw new MyError('Helo word!');
```