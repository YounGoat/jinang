'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , isGeneratorFunction = noda.inRequire('isGeneratorFunction')
    ;

describe('isGeneratorFunction', () => {
    it('isGeneratorFunction', () => {
        assert( isGeneratorFunction(function*() {}));
        assert(!isGeneratorFunction(function() {}));
        assert(!isGeneratorFunction(1));
        assert(!isGeneratorFunction(0));
        assert(!isGeneratorFunction(true));
        assert(!isGeneratorFunction(false));
        assert(!isGeneratorFunction(null));
        assert(!isGeneratorFunction(undefined));
        assert(!isGeneratorFunction({}));
        assert(!isGeneratorFunction('foobar'));
    });
});