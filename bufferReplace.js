'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

/**
 * Create a new buffer by replacing.
 * @param {Buffer} source 
 * @param {Buffer} search 
 * @param {Buffer} replace 
 */
function bufferReplace(source, search, replace) {
	if (!(source instanceof Buffer && search instanceof Buffer && replace instanceof Buffer)) {
		throw new Error('all arguments should be instances of Buffer');
	}

	if (search.length == 0) {
		throw new Error('search buffer should be not zero-length');
	}

	const parts = [];
	let offset = 0;
	do {
		let n = source.indexOf(search, offset);
		if (n < 0) break;

		parts.push(source.slice(offset, n));
		parts.push(replace);

		offset = n + search.length;
	} while(offset < source.length);

	parts.push(source.slice(offset));

	return Buffer.concat(parts);
}

module.exports = bufferReplace;