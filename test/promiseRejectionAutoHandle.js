'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , promiseRejectionAutoHandle = noda.inRequire('promiseRejectionAutoHandle')
    ;

describe('promiseRejectionAutoHandle', () => {
    it('with .then() only', (done) => {
        let status = 404;

        promiseRejectionAutoHandle((error) => {
            assert.equal(error, status);
            done();
        });

        Promise.reject(status)
            .then(() => {
                // DO NOTHING.
            })
            ;
    });

    it('with .then().catch()', (done) => {
        let status = 404;

        promiseRejectionAutoHandle((error) => {
            throw error;
        });

        Promise.reject(status)
            .then(() => {
                // DO NOTHING.
            })
            .catch((error) => {
                assert.equal(error, status);
                done();
            })
            ;
    });

    it('with .catch() only', (done) => {
        let status = 404;

        promiseRejectionAutoHandle((error) => {
            throw error;
        });

        Promise.reject(status)
            .catch((error) => {
                assert.equal(error, status);
                done();
            })
            ;
    });
});