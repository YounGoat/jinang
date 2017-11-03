'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , currying = noda.inRequire('currying')
    ;

describe('currying', () => {
    const add = function(a, b, c) {
        return a + b + c;
    };

    it('currying', () => {
        let curry = currying(add, 3);
        assert.equal(9, curry(2)(3)(4));
    });
});