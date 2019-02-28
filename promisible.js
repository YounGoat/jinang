'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;


function promisible(fn) {
	return function() {
		let args = Array.from(arguments);
		let last = args.length ? args[ args.length - 1 ] : null;
		let callbackOffered = (typeof last == 'function');
		if (callbackOffered) {
			return fn.apply(null, args);
		}
		else {
			return new Promise((resolve, reject) => {
				let callback = (err, data) => {
					if (err) reject(err);
					else resolve(data);
				}
				args.push(callback);
				fn.apply(null, args);
			});
		}
	};
}

module.exports = promisible;