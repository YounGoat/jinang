'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , jointString = noda.inRequire('jointString')
    ;

describe('jointString', () => {

    it('normal', () => {
        assert.equal(jointString('/', 'a', 'b', 'c'), 'a/b/c');
    });

    it('trim edge', () => {
        assert.equal(jointString('/', 'a/', '/b'), 'a/b');
        assert.equal(jointString('/', 'a/', '//b'), 'a//b');
    });

    it('array argument accepted', () => {
        assert.equal(jointString('/', [ 'a', 'b' ], '/c'), 'a/b/c');
    });
});