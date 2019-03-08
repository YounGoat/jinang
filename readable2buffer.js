'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	, ott = require('./ott')
	, promisible = require('./promisible')
	;

function readable2buffer(s, callback) {
	const bufs = [];
	const cbonce = ott.once(callback);

	s.on('error', err => {
		cbonce(err);
	});

	s.on('data', data => {
		bufs.push(data);
	});
	
	s.on('end', () => {
		cbonce(null, Buffer.concat(bufs));
	});
}

module.exports = promisible(readable2buffer);