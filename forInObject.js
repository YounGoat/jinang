'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function forInObject(obj, fn) {
    for (let keyname in obj) {
        fn(keyname, obj[keyname]);
    }
}

module.exports = forInObject;