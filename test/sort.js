'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , sort = noda.inRequire('sort')
    ;

describe('sort', () => {
    it('sort as number', () => {
        let a = [1, 12, 9, 80];
        let b = [1, 9, 12, 80];
        assert.deepEqual(sort(a), b);
    });

    it('sort by property value', () => {
        let a = [
            { age: 1 },
            { age: 12 },
            { age: 9 },
            { age: 80 },
        ];
        let b = [
            { age: 1 },
            { age: 9 },
            { age: 12 },
            { age: 80 },
        ];
        assert.deepEqual(sort(a, { parser: 'age' }), b);
    });

    it('sort by member method returning', () => {
        function I(m, n) {
            this.sum = () => m + n;
        }

        let a = [
            new I(3, 4),
            new I(2, 8),
            new I(1, 2),
        ];
        let b = [3, 7, 10];
        assert.deepEqual(sort(a, 'sum()').map(i => i.sum()), b);
    });
});