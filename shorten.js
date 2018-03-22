'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

function shorten(text, len, style = 'keepends') {
	if (text.length <= len) {
		return text;
	}
	style = style.toLowerCase();

	let ellipsis = '...';
	let keeplen = len - ellipsis.length;

	if (style == 'cuthead') {
		return text.slice(-len);
	}

	if (style == 'cuttail') {
		return text.slice(0, len);
	}

	if (style == 'cutends') {
		let headlen = Math.floor((text.length - len) / 2);
		return text.substr(headlen, len);
	}
	
	if (style == 'keephead') {
		return text.slice(0, keeplen) + ellipsis;
	}

	if (style == 'keeptail') {
		return ellipsis + text.slice(-keeplen);
	}

	if (style == 'keepends') {
		let headlen = Math.ceil(keeplen / 2);
		let taillen = keeplen - headlen;
		return text.slice(0, headlen) + ellipsis + text.slice(-taillen);
	}

	if (style == 'keepbody') {
		keeplen -= ellipsis.length;
		let headlen = Math.floor((text.length - keeplen) / 2);
		return ellipsis + text.substr(headlen, keeplen) + ellipsis;
	}

	throw new Error(`unexpected shorten(..., style): ${style}`);
}

module.exports = shorten;