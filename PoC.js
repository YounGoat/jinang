'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function poc(fn, callback) {
    let RR = (resolve, reject) => {
		let done = (err, data) => {
			err ? reject && reject(err) : resolve && resolve(data);
			callback && callback(err, data);
        };
        fn(done);
	};
	return callback ? RR() : new Promise(RR);
}

module.exports = poc;