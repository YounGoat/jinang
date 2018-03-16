'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;
    
/**
 * Iterate the source object and create a new one.
 * @param  {Object}               source    the source object
 * @param  {Array|RegExp|string} [keynames] names (if string) or name-patterns (if RegExp) of keys in the source object to be cloned
 * @param  {Function}            [mapper]   mapping function(key, value) which should return mapped [ new-key, new-value ] couple
 * @param  {boolean}             [remove]   delete matching properties from the source object
 */
function cloneObject(source /* , keynames, mapper, remove = false */) {
    // Uniform arguments.
    let keynames, mapper, remove;
    for (let i = 1, arg; i < arguments.length; i++) {
        arg = arguments[i];
        if (0) {}
        else if (typeof arg == 'function') mapper = arg;
        else if (typeof arg == 'boolean') remove = arg;
        else if (typeof arg == 'string' || arg instanceof RegExp) keynames = [ arg ];
        else if (arg instanceof Array) keynames = arg;
        else throw new Error(`unexpected argument: ${arg}`);
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

    let clonedKeynames;

    if (mapper) {
        let rawCopy = copy;
        clonedKeynames = [];
        copy = {};

        for (let keyname in rawCopy) {
            let couple = mapper(keyname, rawCopy[keyname]);
            if (couple instanceof Array && couple.length == 2) {
                copy[ couple[0] ] = couple[1];
                clonedKeynames.push(keyname);
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
    else {
        clonedKeynames = Object.keys(copy);
    }

    if (remove) {
        clonedKeynames.forEach(keyname => { delete source[keyname]; });
    }

    return copy;
}

module.exports = cloneObject;