'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function absorb(a, b) {
    if (b == null || typeof b == 'undefined') b = [];
    else if (!(b instanceof Array)) b = [ b ];

    a.push.apply(a, b);
    return a.length;
}

module.exports = absorb;