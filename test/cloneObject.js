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
        "gender_EN": "male",
    };

    it('simple clone', () => {
        let copy = cloneObject(source);
        let keys = Object.keys(copy);
        assert.equal(4, keys.length);
    });

    it('clone specified keys', () => {
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
        assert(keys.includes('gender_en'));
    });

    it('ignore non-existing keys', () => {
        let copy = cloneObject(source, [ 'age' ]);
        let keys = Object.keys(copy);
        assert.equal(0, keys.length);
    });
});