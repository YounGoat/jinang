'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function forInObject(obj, fn) {
    if (obj) {
        for (let keyname in obj) {
            if (fn(keyname, obj[keyname]) === false) break;
        }
    }
}

module.exports = forInObject;