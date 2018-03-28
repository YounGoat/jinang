/**
 * Sort an array.
 * @author YounGoat <youngoat@163.com>
 */

'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

function sort(arr, options) {
	if (typeof options == 'string') {
		options = { parser: options };
	}
	options = Object.assign({
		parser: null,
		lock: false,
	}, options);

	if (typeof options.parser == 'string') {
		let property = options.parser;
		if (property.endsWith('()')) {
			property = property.slice(0, -2);
			options.parser = item => item[property]();
		}
		else {
			options.parser = item => item[property];
		}
	}

	// Lock the array from being changed by .sort();
	if (options.lock) arr = arr.slice(0);

	arr.sort((a, b) => {
		if (options.parser) {
			a = options.parser(a);
			b = options.parser(b);
		}
		return a == b ? 0 : (a > b ? 1 : -1);
	});

	return arr;
}

module.exports = sort;