'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , safeClone = noda.inRequire('safeClone')
    ;

describe('safeClone', () => {
    it('clone primitive values', () => {
        assert.strictEqual(null, safeClone(null));
        assert.strictEqual(true, safeClone(true));
        assert.strictEqual(false, safeClone(false));
        assert.strictEqual(99, safeClone(99));
        assert.strictEqual('foo', safeClone('foo'));
    });

    it('clone array', () => {
        let foo = [1,2,3];
        let bar = safeClone(foo);
        assert.equal(bar.length, 3);
        assert.equal(bar[0], 1);
        assert.equal(bar[1], 2);
        assert.equal(bar[2], 3);

        bar.pop();
        assert.equal(foo.length, 3);
    });

    it('clone object', () => {
        let foo = { a: 1, b: 2, c: 3 };
        let bar = safeClone(foo);
        assert.equal(bar.a, 1);
        assert.equal(bar.b, 2);
        assert.equal(bar.c, 3);

        delete bar.c;
        assert.equal(foo.c, 3);
    });

    it('ignore un-primitive values', () => {
        let F = function() {};
        let foo =  [ F, new F() ];
        let bar = safeClone(foo);
        assert.equal(bar.length, 2);
        assert.equal(bar[0], undefined);
        assert(!(bar[1] instanceof F));
    });
});