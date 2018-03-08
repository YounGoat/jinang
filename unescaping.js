'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

/**
 * A tiny template render engine.
 * @param  {string}   mask
 * @param  {char}     escape_char
 * @param  {Function} consumer
 * @param  {Object}   consumer
 * @return {string}
 * 
 * As a function, the consumer is invoked when escaped content found:
 * { string *output*, number *offset* } consumer(string *mask*, number *cursor*)
 */
function unescaping(mask, escape_char, consumer) {

	if (typeof consumer == 'object') {
		let maps = consumer;
		consumer = (mask, cursor) => {
			let ret = null;
			for (let name in maps) {
				if (mask.startsWith(name, cursor)) {
					ret = { 
						output: maps[name], 
						offset: name.length,
					};
					break;
				}
			}
			return ret;
		};
	}

	let cursor = 0, escaped = false;
	let output = '';
	let E = ret => new Error(`invalid returned value of consumer(): ${ret}`);
	while(cursor < mask.length) {
		if (escaped) {
			let ret = consumer(mask, cursor);

			if (typeof ret == 'string') {
				output += ret;
				cursor += 1;
			}

			// { output, offset }
			else if (ret != null 
				&& typeof ret == 'object' 
				&& ret.hasOwnProperty('output')
				&& ret.hasOwnProperty('offset')
			) {
				output += ret.output;
				cursor += ret.offset;
			}

			// [ output, offset ] OR [ offset, output ]
			else if (ret instanceof Array && ret.length == 2) {
				let uret = {};
				ret.forEach(item => {
					if (typeof item == 'string') {
						uret.output = item;
					}
					else if (typeof item == 'number') {
						uret.offset = item;
					}
				});
				if (uret.hasOwnProperty('output') && uret.hasOwnProperty('offset')) {
					output += uret.output;
					cursor += uret.offset;
				}
				else {
					throw E(ret);
				}
			}

			// No escaped text found and the following char is regarded as normal text.
			else if ([ null, false, undefined ].includes(ret)) {
				output += mask[cursor];
				cursor += 1;
			}

			// Invalid returned value.
			else {
				throw E(ret);
			}
			
			escaped = false;
		}
		else {
			if (mask[cursor] === escape_char) {
				escaped = true;
			}
			else {
				output += mask[cursor];
			}
			cursor += 1;
		}
	} 

	return output;
}

module.exports = unescaping;