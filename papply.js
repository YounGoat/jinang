'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function papply(fn /* , predefined_argument, ... */) {
    let predetermined = Array.from(arguments).slice(1);
    return function() {
        let remainders = Array.from(arguments);
        let args = predetermined.concat(remainders);
        return fn.apply(this, args);
    };
}

module.exports = papply;