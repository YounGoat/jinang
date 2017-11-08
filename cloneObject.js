'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;
    
/**
 * Iterate the source object and create a new one.
 * @param  {Object}               source    the source object
 * @param  {Array|RegExp|String} [keynames] names (if string) or name-patterns (if RegExp) of keys in the source object to be cloned
 * @param  {Function}            [mapper]   mapping function(key, value) which should return mapped [ new-key, new-value ] couple
 */
function cloneObject(source, keynames, mapper) {
    // Uniform arguments.
    if (arguments.length == 2 && typeof arguments[1] == 'function') {
        keynames = null;
        mapper = arguments[1];
    }
    if (keynames && !(keynames instanceof Array)) {
        keynames = [ keynames ];
    }

    // ---------------------------
    // Main process.

    var copy = {};

    if (keynames) {
        keynames.forEach(keyname => {
            if (typeof keyname == 'string') {
                if (source.hasOwnProperty(keyname)) {
                    copy[keyname] = source[keyname];
                }
            }
            else if (keyname instanceof RegExp) {
                Object.keys(source).forEach(keyname2 => {
                    if (keyname.test(keyname2)) {
                        copy[keyname2] = source[keyname2];
                    }
                });
            }
        });
    }
    else {
        Object.assign(copy, source);
    }

    if (mapper) {
        source = copy;
        copy = {};

        for (let keyname in source) {
            let couple = mapper(keyname, source[keyname]);
            if (couple instanceof Array && couple.length == 2) {
                copy[ couple[0] ] = couple[1];
            }
            else if ([ null, false, undefined ].includes(couple)) {
                // DO NOTHING.
                // The key-value couple will be ignored in the copy.
            }
            else {
                // Invalid returned value.
                throw new Error('The return value of the mapper function should be an array made up of keyname and value, or null to delete the input key-value couple.');
            }
        }
    }

    return copy;
}

module.exports = cloneObject;