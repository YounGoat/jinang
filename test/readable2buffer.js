'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')
    , stream = require('stream')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , readable2buffer = noda.inRequire('readable2buffer')
    ;

describe('readable2buffer', () => {

    it('traditional style', (done) => {
        /**
         * @see https://stackoverflow.com/questions/33141012/how-to-mock-streams-in-nodejs
         */

        let rs = new stream.Readable();

        rs._read = function(size) {
            return null;
        };

        readable2buffer(rs, (err, data) => {
            assert(err == null);
            assert(data instanceof Buffer);
            assert.equal(data.toString(), '0123456789');
            done();
        });
                
        for (let i = 0; i < 10; i++) {
            rs.emit('data', Buffer.from(i.toString()));            
        }
        rs.emit('end');
    });

    it('promise style', (done) => {
        let rs = new stream.Readable();

        rs._read = function(size) {
            return null;
        };

        readable2buffer(rs).then(data => {
            assert(data instanceof Buffer);
            assert.equal(data.toString(), '0123456789');
            done();
        });
                
        for (let i = 0; i < 10; i++) {
            rs.emit('data', Buffer.from(i.toString()));            
        }
        rs.emit('end');
    });


    it('error', (done) => {
        let rs = new stream.Readable();

        rs._read = function(size) {
            return null;
        };

        readable2buffer(rs, (err, data) => {
            assert(err instanceof Error);
            done();
        });

        for (let i = 0; i < 10; i++) {
            if (i % 3 == 0) rs.emit('error', new Error(i));
            rs.emit('data', Buffer.from(i.toString()));            
        }
    });

});