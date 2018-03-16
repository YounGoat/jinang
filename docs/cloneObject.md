##	jinang/cloneObject

Create a new object via copying, sometimes transforming, properties from the source object. 

The method supports different signatures with the first argument always the source object.

*   Object __cloneObject__( object *source* )  
    Clone *source* with every property as what `Object.assign()` does.

*   Object __cloneObject__( object *source*, RegExp *keynamePattern* )  
    Clone *source* with properties matching *keynamePattern*.

*   Object __cloneObject__( object *source*, Array *keynames* )  
    Item of *keynames* may be string or RegExp instance. If item is a string, key in *source* which strictly equals to the keyname will be cloned. However, if it is a RegExp instance, all keys in *source* will be iterated and those matched will be cloned.

*   Object __cloneObject__( object *source*, Function *mapper* )  
    The *mapper* SHOULD be a function who accepts two arguments `(key, value)` and return an array `[ newKey, newValue ]`.

*   Object __cloneObject__( object *source*, *keynames*, Function *mapper* )  
    Choose properties matching *keynames*, then transform key-value couples via *mapper*.  
    Here *keynames* may be a string representing the excat one property name, a RegExp to find matching properties, or an array of keynames.

*   Object __cloneObject__( object *source*, [ Array *keynames*, Function *mapper*, ] boolean *removeClonedKeys* )  
    When *removeClonedKeys* set true, all matching keynames will be deleted from *source* object.