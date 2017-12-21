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
    it('array absorb', () => {
        let a = [1,2,3];
        absorb(a, [4,5,6]);
        assert.equal(a.length, 6);
    });
});