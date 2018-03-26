'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , co = noda.inRequire('co')
    ;

describe('co, without callback (promise returned)', () => {
    const A = 100;
    const E = 'error';

    it('promise (resolved)', done => {
        function* f() {
            var a = yield Promise.resolve(A);
            return a;
        };
        co(f).then(ret => assert.equal(ret, A)).then(done);
    });

    it('promise (reject)', done => {
        function* f() {
            yield Promise.reject(E);
        };

        co(f).catch(err => assert.equal(err, E)).then(done);
    });

    it('promise (runtime error)', done => {
        function* f() {
            yield new Promise(() => {
                throw E;
            });
        };
        co(f).catch(err => assert.equal(err, E)).then(done);
    });

    it('thunkified function (data returned)', done => {
        function* f() {
            var a = yield callback => {
                process.nextTick(() => callback(null, A));
            };
            return a;
        }
        co(f).then(ret => assert.equal(ret, A)).then(done);
    });

    it('thunkified function (error returned)', done => {
        function* f() {
            var a = yield callback => {
                process.nextTick(() => callback(E));
            };
            return a;
        }
        co(f).catch(err => assert.equal(err, E)).then(done);
    });

    it('thunkified function (runtime error)', done => {
        function* f() {
            yield callback => {
                throw E;
            };
        };
        co(f).catch(err => assert.equal(err, E)).then(done);
    });

    it('runtime error (directly in generatorFunction body)', done => {
        function* f() {
            throw E;
        }
        co(f).catch(err => assert.equal(err, E)).then(done);
    });

});

describe('co, with callback (undefined returned)', () => {
    const A = 100;
    const E = 'error';

    it('promise (resolved)', done => {
        function* f() {
            var a = yield Promise.resolve(A);
            return a;
        };
        co(f, (err, ret) => {
            assert.equal(ret, A);
            done();
        });
    });

    it('promise (reject)', done => {
        function* f() {
            yield Promise.reject(E);
        };
        co(f, (err, ret) => {
            assert.equal(err, E);
            done();
        });
    });

    it('promise (runtime error)', done => {
        function* f() {
            yield new Promise(() => {
                throw E;
            });
        };
        co(f, (err, ret) => {
            assert.equal(err, E);
            done();
        });
    });

    it('thunkified function (data returned)', done => {
        function* f() {
            var a = yield callback => {
                process.nextTick(() => callback(null, A));
            };
            return a;
        }
        co(f, (err, ret) => {
            assert.equal(ret, A);
            done();
        });
    });

    it('thunkified function (error returned)', done => {
        function* f() {
            var a = yield callback => {
                process.nextTick(() => callback(E));
            };
            return a;
        }
        co(f, (err, ret) => {
            assert.equal(err, E);
            done();
        });
    });

    it('thunkified function (runtime error)', done => {
        function* f() {
            yield callback => {
                throw E;
            };
        };
        co(f, (err, ret) => {
            assert.equal(err, E);
            done();
        });
    });

    it('runtime error (directly in generatorFunction body)', done => {
        function* f() {
            throw E;
        }
        co(f, (err, ret) => {
            assert.equal(err, E);
            done();
        });
    });

});

describe('co, recursion on generator', () => {
    const A = 100;
    const E = 'error';

    it('when GeneratorFunction after yield', done => {
        function* g() {
            var a = yield Promise.resolve(A);
            return a;
        }
        
        function* f() {
            return yield g;
        }

        co(f, (err, ret) => {
            assert.equal(ret, A);
            done();
        });
    });

    it('when generator after yield', done => {
        function* g(foo) {
            var a = yield Promise.resolve(foo);
            return a;
        }
        
        function* f() {
            return yield g(A);
        }

        co(f, (err, ret) => {
            assert.equal(ret, A);
            done();
        });
    });
});

describe('co.easy', () => {
    it('yield Error', done => {
        function* g() {
           yield new Error('foo');
        }
        
        co.easy(g).catch(ex => {
            done();
        });
    });
});
