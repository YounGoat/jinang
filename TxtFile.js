'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, fs = require('fs')
	
	/* NPM */
	
	/* in-package */
	;

function TxtFile(pathname, options) {
	this.pathname = pathname;
	this.options = Object.assign({}, options);
	this.cursor = -1;

	if (fs.existsSync(pathname)) {
		let content = fs.readFileSync(pathname, 'utf8'); 
		this.lines = content.split(/\r\n|\r|\n/);
	}
	else {
		this.lines = [];
	}
}

TxtFile.prototype.getLineCount = function() {
	return this.lines.length;
};

TxtFile.prototype.nextLine = function() {
	let line = null;
	if (this.cursor < this.lines.length - 1) {
		this.cursor++;
		line = this.lines[ this.cursor ];
	}
	return line;
};

module.exports = TxtFile;