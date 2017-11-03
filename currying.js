'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function currying(fn, length, args) {
    if (arguments.length == 2) {
        args = [];
    }

    return function(arg) {
        args.push(arg);
        if (args.length == length) {
            return fn.apply(this, args);
        }
        else {
            return currying(fn, length, args);
        }
    };
}

module.exports = currying;