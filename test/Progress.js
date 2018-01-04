'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')
    , path = require('path')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , Progress = noda.inRequire('Progress')
    ;

describe('Progress', () => {
    let progress;

    beforeEach(() => {
        progress = new Progress();
    });
    
    it('event emit and listen', (done) => {
        progress.on('foo', (a, b) => {
            assert.equal(a, 1);
            assert.equal(b, 2);
            done();
        });
        progress.emit('foo', 1, 2);
    });

    it('method .raise()', (done) => {
        progress.on('signal', (signal) => {
            assert.equal(signal, 99);
            done();
        });
        progress.raise(99);
    });

    it('method .signal()', (done) => {
        progress.signal(99, () => {
            done();
        });
        progress.raise(99);
    });

    [
        [ 'abort'     , Progress.SIGABRT ],
        [ 'hangup'    , Progress.SIGHUP  ],
        [ 'interrupt' , Progress.SIGINT  ],
        [ 'kill'      , Progress.SIGKILL ],
        [ 'quit'      , Progress.SIGQUIT ],
        [ 'terminate' , Progress.SIGTERM ],
    ].forEach((sig) => {
        let [ method, SIGNAL ] = sig;
        it(`method .${method}()`, (done) => {
            let counter = 0;
            progress.signal(SIGNAL, () => {
                ++counter == 2 && done();
            });
            progress.on('signal', (signal) => {
                assert.equal(SIGNAL, signal);
                ++counter == 2 && done();
            });
            progress[method]();
        });
    });
});