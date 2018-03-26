'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , shorten = noda.inRequire('shorten')
    ;

describe('shorten', () => {
    it('shorten, keep when <= max length', () => {
        assert.equal('ching-loves-ching', shorten('ching-loves-ching', 17));
    });

    it('shorten, cutHead', () => {
        assert.equal('ing-loves-ching', shorten('ching-loves-ching', 15, 'cuthead'));
    });

    it('shorten, cutTail', () => {
        assert.equal('ching-loves-ch', shorten('ching-loves-ching', 14, 'cuttail'));
    });

    it('shorten, cutEnds', () => {
        assert.equal('ing-loves-ch', shorten('ching-loves-ching', 12, 'cutends'));
        assert.equal('-loves-', shorten('ching-loves-ching', 7, 'cutends'));
    });

    it('shorten, keepHead', () => {
        assert.equal('ching-loves-...', shorten('ching-loves-ching', 15, 'keephead'));
    });

    it('shorten, keepTail', () => {
        assert.equal('...-loves-ching', shorten('ching-loves-ching', 15, 'keeptail'));
    });

    it('shorten, keepEnds (default)', () => {
        assert.equal('ching-...-ching', shorten('ching-loves-ching', 15, 'keepends'));
        assert.equal('ching-...-ching', shorten('ching-loves-ching', 15));
    });

    it('shorten, keepBody', () => {
        assert.equal('...-loves-...', shorten('ching-loves-ching', 13, 'keepbody'));
        assert.equal('...-loves-...', shorten('ching-loves-ch"ing', 13, 'keepbody'));
    });
});