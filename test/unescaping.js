'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , unescaping = noda.inRequire('unescaping')
    ;

describe('unescaping', () => {
    
    it('unescaping with map', () => {
        let template = '%Y.%month.%Day';
        let escapeChar = '%';
        let map = { Y: 2000, month: 1, Day: 1 };
        let output = unescaping(template, escapeChar, map);
        assert.equal(output, '2000.1.1');
    });
    
    it('unescaping with consumer function', () => {
        let template = '%Y.%month.%Day';
        let escapeChar = '%';
        let consumer = (mask, cursor) => {
            if (mask[cursor] == 'Y') return '2000';
            if (mask.startsWith('month', cursor)) return { output: 1, offset: 5 };
            if (mask.startsWith('Day', cursor)) return [ '1', 3 ];
        }
        let output = unescaping(template, escapeChar, consumer);
        assert.equal(output, '2000.1.1');
    });
    
    
});