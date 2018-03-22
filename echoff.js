'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, stream = require('stream')
	
	/* NPM */
	
	/* in-package */

	/* in-file */
	, raw = {
		stdout: process.stdout,
		stderr: process.stderr,
	}

	, stdout = new stream.Writable({
		write(chunk, encoding, callback) {
			echon && raw.stdout.write(chunk);
			callback();
		}
	})

	, stderr = new stream.Writable({
		write(chunk, encoding, callback) {
			echon && raw.stderr.write(chunk);
			callback();
		}
	})
	;

let echon = true;

process.__defineGetter__('stdout', () => stdout);
process.__defineGetter__('stderr', () => stderr);

module.exports = { 
	on() { echon = true },
	off() { echon = false },
};