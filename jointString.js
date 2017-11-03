'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function jointString(joint, string_1, string_2 /*, ... */) {
    let args = Array.from(arguments).slice(1);
    const L = joint.length;
    for (var i = 0; i < args.length; i++) {
        if (i > 0 && args[i].startsWith(joint)) {
            args[i] = args[i].substr(L);
        }
        if (i < args.length - 1 && args[i].endsWith(joint)) {
            args[i] = args[i].substr(0, args[i].length - L);
        }
    }
    return args.join(joint);
}

module.exports = jointString;