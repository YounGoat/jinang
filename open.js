'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, child_process = require('child_process')
	, os = require('os')
	
	/* NPM */
	
	/* in-package */
	;

const PROTOCOL_TRANSFORMER = {
	// BitBucket repository homepage.
	'bitbucket': pathname => `https://bitbucket.org/${pathname}`,

	// Git repository homepage.
	'git+https': pathname => `https:${pathname.replace(/\.git$/, '')}`,
	'git+http': pathname => `http:${pathname.replace(/\.git$/, '')}`,

	// GitHub repository homepage.
	'github': pathname => `https://github.com/${pathname}`,

	// GitHub Gist page.
	'gist': pathname => `https://gist.github.com/${pathname}`,

	// GitLab repository homepage.
	'gitlab': pathname => `https://gitlab.com/${pathname.replace(/\.git$/, '')}`,
};
	
module.exports = function(urlname) {
	if (/^([^:]+):/.test(urlname)) {
		let protocol = RegExp.$1.toLowerCase();
		let t = PROTOCOL_TRANSFORMER[protocol];
		if (t) {
			let pathname = urlname.substr(protocol.length + 1);
			urlname = t(pathname);
		}
	}

	switch (os.platform()) {
		case 'win32':
			child_process.exec('start "' + urlname + '"');
			return;
	
		case 'darwin':
			child_process.exec('open "' + urlname + '"');
			return;

		default:
			throw new Error(`unsupported os platform: ${os.platform()}`);
	}
};