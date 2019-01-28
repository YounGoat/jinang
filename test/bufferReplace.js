'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , bufferReplace = noda.inRequire('bufferReplace')
    ;

describe('bufferReplace', () => {

    it('1, normally replace', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('foo');
        let replace = Buffer.from('FOO');
        let target  = bufferReplace(source, search, replace);
        let expect  = Buffer.from('FOO-bar-FOO');
        assert(expect.equals(target));

        // The source itself not changed.
        assert(!source.equals(target));
    });

    it('2, replace with nothing', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('foo');
        let replace = new Buffer(0);
        let target  = bufferReplace(source, search, replace);
        let expect  = Buffer.from('-bar-');
        assert(expect.equals(target));
    });

    it('3, replace with double copy', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('o');
        let replace = new Buffer('oo');
        let target  = bufferReplace(source, search, replace);
        let expect  = Buffer.from('foooo-bar-foooo');
        assert(expect.equals(target));
    });

    it('4, replace with same', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('o');
        let replace = new Buffer('o');
        let target  = bufferReplace(source, search, replace);
        let expect  = source;
        assert(expect.equals(target));
    });

    it('5, remove the heading', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('foo-');
        let replace = new Buffer(0)
        let target  = bufferReplace(source, search, replace);
        let expect  = Buffer.from('bar-foo');
        assert(expect.equals(target));
    });

    it('6, remove the tailing', () => {
        let source  = Buffer.from('foo-bar-foo');
        let search  = Buffer.from('-foo');
        let replace = new Buffer(0)
        let target  = bufferReplace(source, search, replace);
        let expect  = Buffer.from('foo-bar');
        assert(expect.equals(target));
    });

    it('throws 1', () => {
        assert.throws(() => {
            let source  = 'foo-bar-foo';
            let search  = Buffer.from('foo');
            let replace = Buffer.from('FOO');
            bufferReplace(source, search, replace);
        });
    });

    it('throws 2', () => {
        assert.throws(() => {
            let source  = Buffer.from('foo-bar-foo');
            let search  = new Buffer(0);
            let replace = Buffer.from('FOO');
            bufferReplace(source, search, replace);
        });
    });
});