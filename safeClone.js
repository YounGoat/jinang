'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, util = require('util')
	
	/* NPM */
	
	/* in-package */
	;
	
const IGNORED = Symbol('ignored');

function safeClone(foo) {	
	switch (typeof foo) {
		case 'boolean':
		case 'number':
		case 'string':
		case 'undefined':
			return foo;
	
		case 'symbol':
		case 'function':
			return IGNORED;

		case 'object':
			if (foo === null) return foo;
			// continue;
	}

	let bar;
	let copyItem = key => {
		let ret = safeClone(foo[key]);
		if (ret !== IGNORED) {
			bar[key] = ret;
		}
	};

	if (foo instanceof Array) {
		bar = new Array(foo.length);
		foo.forEach((n, index) => copyItem(index));
	}
	else {
		bar = {};
		for (let key in foo) {
			if (foo.hasOwnProperty(key)) copyItem(key);
		}
	}
	return bar;
}

safeClone.IGNORED = IGNORED;

module.exports = safeClone;