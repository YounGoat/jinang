'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, events = require('events')
	, util = require('util')
	
	/* NPM */
	
	/* in-package */

	/* in-file */
	, SIGHUP = 1
	, SIGINT = 2
	, SIGQUIT = 3
	, SIGABRT = 6
	, SIGKILL = 9
	, SIGTERM = 15
	;

function Progress() {
	this._catcher = {};
	this._signal = 0;
	this.on('signal', signal => {
		this._signal = signal;
		this._catcher[signal] && this._catcher[signal]();
	});
}

util.inherits(Progress, events.EventEmitter);

Progress.prototype.raise = function(signal) {
	this.emit('signal', signal);
};

Progress.prototype.signal = function(signal, catcher) {
	this._catcher[signal] = catcher;
};

Progress.prototype.abort = function() {
	this.emit('signal', SIGABRT)
};

Progress.prototype.hangup = function() {
	this.emit('signal', SIGHUP);
};

Progress.prototype.interrupt = function() {
	this.emit('signal', SIGINT);
};

Progress.prototype.kill = function() {
	this.emit('signal', SIGKILL);
};

Progress.prototype.quit = function() {
	this.emit('signal', SIGQUIT);	
};

Progress.prototype.terminate = function() {
	this.emit('signal', SIGTERM);
};

Object.assign(Progress, {
	SIGABRT,
	SIGHUP,
	SIGINT,
	SIGKILL,
	SIGQUIT,
	SIGTERM,
});
module.exports = Progress;