'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , cloneObject = noda.inRequire('cloneObject')
    ;

describe('cloneObject', () => {
    let source = {
        "name": "YounGoat",
        "name_CN": "羊三河",
        "gender": "M",
        "gender_CN": "男",
    };

    it('simple clone', () => {
        let copy = cloneObject(source);
        let keys = Object.keys(copy);
        assert.equal(4, keys.length);
    });

    it('clone via keyname (string)', () => {
        let copy = cloneObject(source, 'name');
        let keys = Object.keys(copy);
        assert.equal(1, keys.length);
        assert(keys.includes('name'));
    });

    it('clone via keyname (RegExp)', () => {
        let copy = cloneObject(source, /^name/);
        let keys = Object.keys(copy);
        assert.equal(2, keys.length);
        assert(keys.includes('name'));
        assert(keys.includes('name_CN'));
    });

    it('clone via keyname (Array mixed with string and RegExp)', () => {
        let copy = cloneObject(source, [ /^name/, 'gender' ]);
        let keys = Object.keys(copy);
        assert.equal(3, keys.length);
        assert(keys.includes('name'));
        assert(keys.includes('name_CN'));
        assert(keys.includes('gender'));
    });

    it('clone via mapping', () => {
        let copy = cloneObject(source, (key, value) => [ key.toLowerCase(), value ]);
        let keys = Object.keys(copy);
        assert.equal(4, keys.length);
        assert(keys.includes('name_cn'));
        assert(keys.includes('gender_cn'));
    });

    it('clone via keyname and mapping', () => {
        let copy = cloneObject(source, /^name/, (key, value) => [ key.toLowerCase(), value ]);
        let keys = Object.keys(copy);
        assert.equal(2, keys.length);
        assert(keys.includes('name'));
        assert(keys.includes('name_cn'));
    });

    it('ignore non-existing keys', () => {
        let copy = cloneObject(source, [ 'age' ]);
        let keys = Object.keys(copy);
        assert.equal(0, keys.length);
    });

    it('remove cloned properties from source', () => {
        let copy;
        
        copy = Object.assign({}, source);
        cloneObject(copy, [ 'name', 'gender' ], true);
        assert(!copy.hasOwnProperty('name'));
        assert(!copy.hasOwnProperty('gender'));

        copy = Object.assign({}, source);
        let c = cloneObject(copy, true, [ 'name', 'gender' ], (key, value) => key == 'gender' ? null : [ key, value ]);
        assert( copy.hasOwnProperty('gender'));
        assert(!copy.hasOwnProperty('name'));
    });

    it('ignore null object (no throwing)', () => {
        let copy = cloneObject(null, []); 
        assert.deepEqual({}, copy);
    });
});