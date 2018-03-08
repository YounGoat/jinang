'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , isGenerator = noda.inRequire('isGenerator')
    ;

describe('isGenerator', () => {
    it('isGenerator', () => {
        const G = function*() {};
        const g = G();

        assert( isGenerator(g));
        assert(!isGenerator(G));
        assert(!isGenerator(function() {}));
        assert(!isGenerator([]));
        assert(!isGenerator(1));
        assert(!isGenerator(0));
        assert(!isGenerator(true));
        assert(!isGenerator(false));
        assert(!isGenerator(null));
        assert(!isGenerator(undefined));
        assert(!isGenerator({}));
        assert(!isGenerator('foobar'));
    });
});