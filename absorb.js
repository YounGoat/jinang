'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function absorb(a, b) {
    a.push.apply(a, b);
    return a.length;
}

module.exports = absorb;