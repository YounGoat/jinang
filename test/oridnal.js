'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , ordinal = noda.inRequire('ordinal')
    ;

describe('ordinal', () => {

    it('ordinal number', () => {
        assert(  '1st', ordinal(  1));
        assert(  '2nd', ordinal(  2));
        assert(  '3rd', ordinal(  3));
        assert( '11th', ordinal( 11));
        assert( '12th', ordinal( 12));
        assert( '13th', ordinal( 13));
        assert( '21st', ordinal( 21));
        assert( '22nd', ordinal( 22));
        assert( '23nd', ordinal( 23));
    });

    it('ordinal suffix', () => {
        assert(  '1st', ordinal.suffix(  1));
        assert(  '2nd', ordinal.suffix(  2));
        assert(  '3rd', ordinal.suffix(  3));
        assert( '11th', ordinal.suffix( 11));
        assert( '12th', ordinal.suffix( 12));
        assert( '13th', ordinal.suffix( 13));
        assert( '21st', ordinal.suffix( 21));
        assert( '22nd', ordinal.suffix( 22));
        assert( '23nd', ordinal.suffix( 23));
    });

    it('type compatible', () => {
        assert(  '1st', ordinal('1'));
        assert(  '1st', ordinal('1.0'));
    });

    it('exception', () => {
        assert.throws(() => ordinal(0));
        assert.throws(() => ordinal(-1));
        assert.throws(() => ordinal(NaN));
        assert.throws(() => ordinal(Infinity));
        assert.throws(() => ordinal('1/0'));
    });
});