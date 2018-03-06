'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    , isGeneratorFunction = require('./isGeneratorFunction')
    , co = require('./co')
    ;

function poc(fn, callback) {
    if (isGeneratorFunction(fn)) return co(fn, callback);

    let RR = (resolve, reject) => {
		let done = (err, data) => {
			err ? reject && reject(err) : resolve && resolve(data);
			callback && callback(err, data);
        };

        if (isGeneratorFunction(fn)) {
            co(fn())
        }
        else {
            fn(done);
        }
    };
    return callback ? RR() : new Promise(RR);
}

module.exports = poc;