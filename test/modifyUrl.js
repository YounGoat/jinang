'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , modifyUrl = noda.inRequire('modifyUrl')
    ;

describe('modifyUrl', () => {
    let urlname = 'https://youngoat.github.io/works/?year=2017#autumn';

    it('modify pathname', () => {
        let foo;
        
        foo = modifyUrl.pathname(urlname, 'books');
        assert.equal(foo, 'https://youngoat.github.io/books?year=2017#autumn');

        foo = modifyUrl.pathname(urlname, '/books');
        assert.equal(foo, 'https://youngoat.github.io/books?year=2017#autumn');

        foo = modifyUrl.pathname(urlname, '/books', 'a');        
        assert.equal(foo, 'https://youngoat.github.io/works/books?year=2017#autumn');
    });

    it('modify protocol', () => {
        let foo = modifyUrl.protocol(urlname, 'http');
        assert.equal(foo, 'http://youngoat.github.io/works/?year=2017#autumn');
    });

    it('modify query', () => {
        let foo
        
        foo = modifyUrl.query(urlname, 'month=Oct');
        assert.equal(foo, 'https://youngoat.github.io/works/?year=2017&month=Oct#autumn');

        foo = modifyUrl.query(urlname, 'month=Oct', 'w');
        assert.equal(foo, 'https://youngoat.github.io/works/?month=Oct#autumn');

        foo = modifyUrl.query(urlname, 'year=2018');
        assert.equal(foo, 'https://youngoat.github.io/works/?year=2018#autumn');

        foo = modifyUrl.query(urlname, { month: 'Oct'});
        assert.equal(foo, 'https://youngoat.github.io/works/?year=2017&month=Oct#autumn');
    });

    it('modify *', () => {
        let foo = modifyUrl(urlname, {
            pathname: [ '/books', 'a' ],
            protocol: 'http'
        });
        
        assert.equal(foo, 'http://youngoat.github.io/works/books?year=2017#autumn');
    });
});