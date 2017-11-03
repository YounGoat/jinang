'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , papply = noda.inRequire('papply')
    ;

describe('papply', () => {
    const add = function(a, b, c) {
        return a + b + c;
    };

    it('papply', () => {
        let add2 = papply(add, 2);
        assert.equal(4, add2(1, 1));
        
        let add2_3 = papply(add, 2, 3);
        assert.equal(6, add2_3(1));

        let add23 = papply(add2, 3);
        assert.equal(6, add23(1));
    });
});