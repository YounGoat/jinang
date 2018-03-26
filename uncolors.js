'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

function uncolors(text) {
	return text.replace(/\u001b\[\?{0,1}\d+(;\d+){0,2}[mlhABCDEFGK]/g, '');
}

module.exports = uncolors;