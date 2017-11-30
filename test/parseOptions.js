'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , co = require('co')
    , noda = require('noda')

    /* in-package */
    , parseOptions = noda.inRequire('parseOptions')
    ;

describe('parseOptions', () => {


    it('basic & case-insensitive', () => {
        const options = {
            Hostname: 'www.example.com',
        };
        
        let po = parseOptions(options);
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.Hostname, undefined);
    });

    it('case sensitive', () => {
        const options = {
            Host: 'www.example.com',
        };

        let po = parseOptions(options, { caseSensitive: true });
        assert.equal(po.host, undefined);
    });

    it('explicit', () => {
        const options = {
            host: 'www.example.com',
            hostname: 'www.example.com',
        };

        let po = parseOptions(options, { 
            columns: [ 'host' ],
            explicit: true 
        });
        assert(po.host);
        assert.equal(po.hostname, undefined);
    });

    it('alias', () => {
        const options = {
            domain: 'www.example.com',
        };

        let po = parseOptions(options, { 
            columns: [ { name: 'hostname', alias: 'domain' } ],
        });
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.domain, undefined);
    });

    it('parser', () => {
        const options = {
            hostname: ' www.example.com ',
        };

        let po = parseOptions(options, { 
            columns: {
                hostname: { parser: value => value.trim() }
            },
        });
        assert.equal(po.hostname, 'www.example.com');
    });

    it('required', () => {
        assert.throws(() => {
            const options = {};    
            parseOptions(options, { 
                columns: {
                    hostname: { required: true }
                },
            });
        });
    });

    it('column desc', () => {
        assert.throws(() => {
            const options = {};    
            parseOptions(options, { 
                columns: [ 'hostname required' ],
            });
        });

        const options = {
            domain: 'www.example.com',
        };
        let po = parseOptions(options, {
            columns: [ 'hostname alias(domain)' ],
        });
        assert.equal(po.hostname, 'www.example.com');
    });

    it('column default', () => {
        const options = {};    
        let po = parseOptions(options, { 
            columns: { 
                protocol: { default: 'http' } 
            },
        });
        assert.equal(po.protocol, 'http');
    });
});