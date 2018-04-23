'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , inof = noda.inRequire('inof')
    ;

describe('inof (forInObject)', () => {

    it('iterate', () => {
        let user = { name: 'Ching', age: 18, nick: 'YounGoat' };
        let i = 0;
        inof(user, (key, value) => i++);
        assert.equal(i, 3);
    });

    it('break', () => {
        let user = { name: 'Ching', age: 18, nick: 'YounGoat' };
        let i = 0;
        inof(user, (key, value) => {
            i++;
            if (typeof value == 'number') return false;
        });
        assert.equal(i, 2);
    });

    it('ignore null object (no throwing)', () => {
        inof(null, () => {});
    });
});