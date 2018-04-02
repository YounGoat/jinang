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


describe('traverse arrays', () => {
    it('co.each', done => {
        function* f() {
            let nums = Array.from(arguments);
            let total = 0;
            yield co.each(nums, function*(n, index) {
                total += yield Promise.resolve(n);
            });
            return total;
        }

        co(f(1, 2, 3, 4)).then(ret => {
            assert.equal(ret, 10);
            done();
        });
    });

    it('co.each, on exception', done => {
        const E = 'Error';
        function* f() {
            yield co.each([1,2], function*(n, index) {
                throw E;
            });
        }
        co(f).catch(ex => {
            assert.equal(E, ex);
            done();
        });
    });

    it('co.map', done => {
        function* f() {
            let nums = Array.from(arguments);
            return yield co.map(nums, function*(n, index) {
                return yield Promise.resolve(n * 2);
            });
        }

        co(f(1, 2, 3)).then(ret => {
            assert.deepEqual(ret, [2, 4, 6]);
            done();
        });
    });

    it('co.map, on exception', done => {
        const E = 'Error';
        function* f() {
            yield co.map([1,2], function*(n, index) {
                throw E;
            });
        }

        co(f).catch(ex => {
            assert.equal(E, ex);
            done();
        });
    });
});