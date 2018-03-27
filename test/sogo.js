'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , sogo = noda.inRequire('sogo')
    ;

describe('sogo', () => {

    it('sogo.set', () => {
        let foo = { };
        let dsname = 'user.address.city';
        let value = 'Shanghai';
        sogo.set(foo, dsname, value);

        assert.equal(eval(`foo.${dsname}`), value);
    });

    it('sogo.set, overwrite', () => {
        let foo = { user: '' };
        let dsname = 'user.address.city';
        let value = 'Shanghai';
        sogo.set(foo, dsname, value);

        assert.equal(eval(`foo.${dsname}`), value);
    });

    it('sogo.get', () => {
        let city = 'Shanghai';
        let foo = { user: { address: { city } } };
        assert.equal(sogo.get(foo, 'user.address.city'), city);
        assert.strictEqual(sogo.get(foo, 'user.address.district'), undefined);
    });

    it('sogo.get, tryCombinedName', () => {
        let city = 'Shanghai';
        [
            {
                user: { address: {} },
                'user.address': {},
                'user.address.city': city,
            },

            // Formal name is prior to combined name.
            {
                user: { address: {} },
                'user.address': { city },
                'user.address.city': 'Newyork',
            },

            // Order independent.
            {
                'user.address': { city: 'London' },
                'user.address.city': 'Newyork',
                user: { address: { city } },
            },

        ].forEach(foo => assert.equal(sogo.get(foo, 'user.address.city'), city));        
    });

    it('sogo.get, ignoreCombinedName', () => {
        let city = 'Shanghai';
        let foo = { 'user.address.city' : city };
        assert.equal(sogo.get(foo, 'user.address.city', { tryCombinedName: false }), undefined);
        assert.equal(sogo.get(foo, [ 'user', 'address', 'city' ]), undefined);
    });
});