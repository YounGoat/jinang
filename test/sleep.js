'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , co = require('co')
    , noda = require('noda')

    /* in-package */
    , sleep = noda.inRequire('sleep')
    ;

describe('sleep', () => {

    it('synchronised sleep', () => {
        // It is blocked.
        setTimeout(() => {
            assert.fail();
        }, 1);

        let t0 = Date.now();
        sleep(200);
        let t1 = Date.now();
        assert( t1 - t0 >= 200);
    });

    it('asynchronised sleep', (done) => {
        co(function*() {
            let t0 = Date.now();
            yield sleep.promise(200);
            let t1 = Date.now();
            assert( t1 - t0 >= 200);
            done();
        });
    });
});