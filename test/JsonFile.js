'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')
    , path = require('path')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , JsonFile = noda.inRequire('JsonFile')
    ;

describe('JsonFile', () => {
    let pathname = path.join(__dirname, '..', 'local', 'foo.json');
    
    it('Create & Save', () => {
        let jf = new JsonFile(pathname);
        jf.json.name = 'JsonFile';
        jf.save();
    });

    it('Read', () => {
        let jf = new JsonFile(pathname);
        assert.equal('JsonFile', jf.json.name);
    });

    it('Remove', () => {
        let jf = new JsonFile(pathname);
        jf.remove();
    });
});