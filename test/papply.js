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

    const join = function() {
        let args = Array.from(arguments).map(n => typeof n == 'undefined' ? '-' : n);
        return args.join('');
    };

    it('papply', () => {
        let add2 = papply(add, 2);
        assert.equal(add2(1, 1), 4);
        
        let add2_3 = papply(add, 2, 3);
        assert.equal(add2_3(1), 6);

        let add23 = papply(add2, 3);
        assert.equal(add23(1), 6);
    });

    it('papply.tail', () => {
        let join3 = papply.tail(join, 3);
        assert.equal(join3(2), '23');
        assert.equal(join3(1,2), '123');

        let join3_4 = papply.tail(join, 3, 4);
        assert.equal(join3_4(2), '234');
        assert.equal(join3_4(1,2), '1234');
    });

    it('papply.position basic', () => {
        let join_2c = papply.position(join, 2, 'c');
        assert.equal(join_2c('a', 'b', 'd'), 'abcd');

        let join_3d = papply.position(join, [3, 'd']);
        assert.equal(join_3d('a', 'b', 'c', 'e'), 'abcde');

        let join_2c4e = papply.position(join, [2, 'c'], [4, 'e']);
        assert.equal(join_2c4e('a', 'b', 'd'), 'abcde');

        let join_1b3d = papply.position(join, [[1, 'b'], [3, 'd']]);
        assert.equal(join_1b3d('a', 'c', 'e'), 'abcde');
    });

    it('papply.position negative', () => {
        let join_n1c = papply.position(join, [-1, 'c']);
        assert.equal(join_n1c('a', 'b'), 'abc');

        let join_n2c = papply.position(join, [-2, 'c']);
        assert.equal(join_n2c('a', 'b', 'd'), 'abcd');

        let join_n1z_n3x = papply.position(join, [-1, 'z'], [-3, 'x']);
        assert.equal(join_n1z_n3x('a', 'b', 'd'), 'abxdz');
    });

    it('papply.position mixed', () => {
        let join_3c_n2y = papply.position(join, [-2, 'y'], [2, 'c']);
        assert.equal(join_3c_n2y('a', 'b'), 'abcy-');
    });
});