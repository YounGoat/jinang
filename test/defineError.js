'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , defineError = noda.inRequire('defineError')
    ;

describe('defineError', () => {
    
    it('define a customized Error class', () => {
        let E = defineError('MyError', Error, function(code) { this.code = code; });
        assert.equal(E.name, 'MyError');

        let e = new E('ME');
        assert(e instanceof Error);
        assert(e instanceof E);
        assert.equal(e.name, 'MyError');
        assert.equal(e.code, 'ME');
    });
    
});