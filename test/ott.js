'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , ott = noda.inRequire('ott')
    ;

describe('ott, once / twice / thrice', () => {

    it('run function n times', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3);
        
        for (let i = 0; i < 3; i++) {
            assert.equal(fn(), i);
        }
        ``
        // n will not change more.
        assert.equal(n, 3);
        fn(); fn(); // ...
        assert.equal(n, 3);
    });

    it('get run times', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3);
        
        for (let i = 1; i < 9; i++) {
            fn();
            assert.equal(fn.runtimes(), i);
        }
    });

    it('exceeding return mode, FIRST', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3, ott.FIRST);
       
        assert.equal(fn(), 0);
        assert.equal(fn(), 1);
        assert.equal(fn(), 2);

        assert.equal(fn(), 0);
        assert.equal(fn(), 0);
        // ...
    });

    it('exceeding return mode, LAST', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3, ott.LAST);
       
        assert.equal(fn(), 0);
        assert.equal(fn(), 1);
        assert.equal(fn(), 2);

        assert.equal(fn(), 2);
        assert.equal(fn(), 2);
        // ...
    });

    it('exceeding return mode, customised', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3, 'foo');
       
        assert.equal(fn(), 0);
        assert.equal(fn(), 1);
        assert.equal(fn(), 2);

        assert.equal(fn(), 'foo');
        assert.equal(fn(), 'foo');
        // ...
    });

    it('exceeding return mode, default(undefined)', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott(func, 3);
       
        assert.equal(fn(), 0);
        assert.equal(fn(), 1);
        assert.equal(fn(), 2);

        assert.equal(fn(), undefined);
        assert.equal(fn(), undefined);
        // ...
    });

    it('predefined: once', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott.once(func);
       
        fn();
        assert.equal(n, 1);

        fn(); fn(); // ...
        assert.equal(n, 1);
    });

    it('predefined: twice', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott.twice(func);
       
        fn(); fn();
        assert.equal(n, 2);

        fn(); fn(); // ...
        assert.equal(n, 2);
    });

    it('predefined: thrice', () => {
        let n = 0;
        let func = function() { return n++; };
        let fn = ott.thrice(func);
       
        fn(); fn(); fn();
        assert.equal(n, 3);

        fn(); fn(); // ...
        assert.equal(n, 3);
    });
});