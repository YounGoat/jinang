##	jinang/forInObject

*   void __forInObject__( object *foo*, Function *iterator* )  
    Function *iterator* SHOULD accept two arguments. 
    
E.g. 
```javascript
const forInObject = require('jinang/forInObject');
forInObject({ name: 'YounGoat' }, (name, value) {
    console.log(name);
    console.log(value);
});
```