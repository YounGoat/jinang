'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

function ott(fn, N, ret = null) {
	let n = 0;
	let first = null, last = null;
	let fn2 = function() {
		n++;
		if (n <= N) {
			let ret = fn.apply(this, arguments);
			if (n == 1) first = ret;
			if (n == N) last = ret;
			return ret;
		}
		else if (ret == ott.LAST) {
			return last;
		}
		else if (ret == ott.FIRST) {
			return first;
		}
		else {
			return ret;
		}
	};
	fn2.runtimes = () => n;
	return fn2;
}

ott.LAST  = Symbol();
ott.FIRST = Symbol();

ott.once   = fn => ott(fn, 1);
ott.twice  = fn => ott(fn, 2);
ott.thrice = fn => ott(fn, 3);

module.exports = ott;