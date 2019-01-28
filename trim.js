'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

const trim = {};

/**
 * Copy properties from an object without those are undefined.
 * @param {Object} source
 * @return {Object}
 */
trim.object = function(source) {
	let target = {};
	for (let key in source) {
		if (typeof source[key] == 'undefined') {
			continue;
		}
		target[key] = source[key];
	}
	return target;
};

module.exports = trim;