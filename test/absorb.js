'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , absorb = noda.inRequire('absorb')
    ;

describe('absorb', () => {
    it('array absorb another array', () => {
        let a = [1,2,3];
        assert.equal(absorb(a, [4,5,6]), 6);
        assert.equal(a.length, 6);
    });

    it('array absorb non-array value', () => {
        let a = [1,2,3];
        assert.equal(absorb(a, 4), 4);
        assert.equal(a.length, 4);

        assert.equal(absorb(a, []), 4);
        assert.equal(a.length, 4);

        assert.equal(absorb(a, null), 4);
        assert.equal(a.length, 4);

        assert.equal(absorb(a, undefined), 4);
        assert.equal(a.length, 4);

        assert.equal(absorb(a, [ null ]), 5);
        assert.equal(a.length, 5);
    })
});