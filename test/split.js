'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , split = noda.inRequire('split')
    ;

describe('split', () => {

    it('split string by character', () => {
        let S = 'foo bar baz qux';
        let seperator = ' ';
        let parts = split(S, seperator);
        assert.equal(parts.length, 4);
        assert.equal(parts.join('.'), 'foo.bar.baz.qux');
    });

    it('split string by string', () => {
        let S = 'foo == bar == baz == qux';
        let seperator = ' == ';
        let parts = split(S, seperator);
        assert.equal(parts.length, 4);
        assert.equal(parts.join('.'), 'foo.bar.baz.qux');
    });
    
    it('split string by regular expression', () => {
        let S = 'foo == bar == baz == qux';
        let seperator = /[^\w]+/;
        let parts = split(S, seperator);
        assert.equal(parts.length, 4);
        assert.equal(parts.join('.'), 'foo.bar.baz.qux');
    });

    it('preserve content between delimiters', () => {
        let S = 'foo "bar baz" qux';
        let seperator = ' ';
        let delimiter = '"';
        let parts = split(S, seperator, delimiter);
        assert.equal(parts.length, 3);
        assert.equal(parts.join('.'), 'foo.bar baz.qux');
    });

    it('preserve content between delimiters and adhering prefix or postfix', () => {
        let S = 'foo pre"bar baz"post qux';
        let seperator = ' ';
        let delimiter = '"';
        let parts = split(S, seperator, delimiter);
        assert.equal(parts.length, 3);
        assert.equal(parts.join('.'), 'foo.prebar bazpost.qux');
    });

    it('use different delimiters', () => {
        let S = 'foo "bar 1" -baz 2- qux';
        let seperator = ' ';
        let delimiter = [ '"', '-' ];
        let parts = split(S, seperator, delimiter);
        assert.equal(parts.length, 4);
        assert.equal(parts.join('.'), 'foo.bar 1.baz 2.qux');
    });

    it('use escaper if delimeter itself is meaningful', () => {
        let S = 'foo "bar\\" baz" qux';
        let seperator = ' ';
        let delimiter = '"';
        let escaper = '\\';
        let parts = split(S, seperator, delimiter, escaper);
        assert.equal(parts.length, 3);
        assert.equal(parts.join('.'), 'foo.bar" baz.qux');
    });

    it('unpaired delimiter', () => {
        let S = 'foo "bar baz';
        let seperator = ' ';
        let delimiter = '"';
        let parts = split(S, seperator, delimiter);
        assert.equal(parts.length, 2);
        assert.equal(parts.join('.'), 'foo.bar baz');
    });

    it('throw exception on invalid arguments', () => {
        let S = 'foo "bar baz';
        let seperator = ' ';
        let delimiter = 'bar';

        assert.throws(() => {
            split(S, seperator, delimiter);
        });
    });
});