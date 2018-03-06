##	jinang/cloneObject

*   Object __cloneObject__( object *source* )

*   Object __cloneObject__( object *source*, Array *keynames* )  
    Item of *keynames* may be string or RegExp instance. If item is a string, key in *source* which strictly equals to the keyname will be cloned. However, if it is a RegExp instance, all keys in *source* will be iterated and those matched will be cloned.

*   Object __cloneObject__( object *source*, Function *mapper* )  
    The *mapper* SHOULD be a function who accepts two arguments `(key, value)` and return an array `[ newKey, newValue ]`.
