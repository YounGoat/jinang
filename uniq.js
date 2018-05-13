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

function uniq(arr, options) {
	if (typeof options == 'string') {
		options = { parser: options };
	}
	options = Object.assign({
		parser: null,
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

	let uniqArr = [], last = null;
	if (arr.length) {
		last = arr[0];
		uniqArr.push(last);
	}
	for (let i = 1; i < arr.length; i++) {
		if (last !== arr[i]) {
			last = arr[i];
			uniqArr.push(last);
		}
	}

	return uniqArr;
}

module.exports = uniq;