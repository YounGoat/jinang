'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function jointString(joint, string_1, string_2 /*, ... */) {
    let args = Array.prototype.concat.apply([], Array.from(arguments).slice(1));
    const L = joint.length;
    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (i > 0 && arg.startsWith(joint)) {
            arg = arg.substr(L);
        }
        if (i < args.length - 1 && arg.endsWith(joint)) {
            arg = arg.substr(0, arg.length - L);
        }
        args[i] = arg;
    }
    return args.join(joint);
}

module.exports = jointString;