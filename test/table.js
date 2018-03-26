'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , table = noda.inRequire('table')
    ;

describe('table', () => {
    it('basic table', () => {
        let rows = [
            { name: 'Mary', age: 11, },
            { name: 'Jack', age: 18, },
        ];
        let columns = [
            { name: 'name', title: 'Name', size: 20 },
            { name: 'age', title: 'Age', },
        ];
        assert(table(rows, { columns }) instanceof Array);
    });

    it('auto generated column definitions', () => {
        let rows = [
            { name: 'Mary', age: 11, },
            { name: 'Jack', age: 18, },
        ];
        assert(table(rows) instanceof Array);
    });
});