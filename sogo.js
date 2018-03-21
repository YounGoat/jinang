/**
 * Set Object and Get Object.
 * 
 * SEE ALSO
 *   https://www.npmjs.com/package/set-value
 */

'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	
	/* in-file */
	, hasProperty = (foo, name) => {
		if (!isAssignable(foo)) return false;
		if (foo[name]) return true;
		if (foo instanceof Object) return foo.hasOwnProperty(name);
		return Object.keys(foo).includes(name);
	}

	, isAssignable = foo => {
		let t = typeof foo;
		return t == 'function' || t == 'object' && t !== null;

		// return foo instanceof Object;
		/**
		 * Why not? e.g.
		 * > let foo = Object.create(null);
		 * Now `foo` is assignable but not instance of Object.
		 */
	}
	;


/**
 * @param  {Object}           foo        - an assignable value
 * @param  {string|string[]}  dsname     - dot seperated name
 * @param  {Object}          [options]
 */
function get(foo, dsname, options) {
	// ---------------------------
	// Arguments validation.

	let names;
	if (dsname instanceof Array) {
		names = [].concat(dsname);
	}
	else if (typeof dsname == 'string') {
		names = dsname.split('.');
	}
	else {
		throw new Error(`dsname should be a string or an array of string`);
	}

	options = Object.assign({
		tryCombinedName: (typeof dsname == 'string')
	}, options);

	// ---------------------------
	// Main progress.
		
	// Try the normal sub property.
	if (1) {
		let leaf = foo, leafs = [];
		let found = names.every((name, index) => {
			if (hasProperty(leaf, name)) {
				leaf = leaf[name];
				return true;
			}
		});
		if (found) return leaf;
	}

	// Try combined-name property.
	if (options.tryCombinedName) {		
		let fqname = names.join('.');
		let leaf = undefined, found = false;
		
		(function tryFQs(foo, prefix) {
			let keys = Object.keys(foo).sort((a, b) => a.length > b.length);
			keys.every(key => {
				let fq = prefix ? prefix + '.' + key : key;
				if (fq == fqname) {
					found = true;
					leaf = foo[key];
				}
				else if (fqname.startsWith(fq) && isAssignable(foo[key])) {
					tryFQs(foo[key], fq);
				}
				return !found;
			});
		})(foo);

		if (found) return leaf;
	}	

	// Not found.
	return undefined;
}

/**
 * @param  {Object}           foo        - an assignable value
 * @param  {string|string[]}  dsname     - dot seperated name
 * @param  {any}              value
 * @param  {Object}          [options]
 */
function set(foo, dsname, value, options) {
	// ---------------------------
	// Arguments validation.

	if (!isAssignable(foo)) {
		throw new Error(`cannot set an un-assignable value: ${foo}`);
	}

	let names;
	if (dsname instanceof Array) {
		names = [].concat(dsname);
	}
	else if (typeof dsname == 'string') {
		names = dsname.split('.');
	}
	else {
		throw new Error(`dsname should be a string or an array of string`);
	}

	options = Object.assign({
		// Whether to overwrite the original property value.
		overwrite: true,
	}, options);

	// ---------------------------
	// Main progress.

	let endname = names.pop();
	let leaf = foo;
	for (let i = 0, name; leaf && i < names.length; i++) {
		name = names[i];
		if (isAssignable(leaf[name])) {
			leaf = leaf[name];
		}
		else if (!hasProperty(leaf, name) || options.overwrite) {
			leaf[name] = {};
			leaf = leaf[name];
		}
		else {
			leaf = null;
		}
	}

	if (leaf) {
		leaf[endname] = value;
	}
	return !!leaf;
}

module.exports = { get, set };