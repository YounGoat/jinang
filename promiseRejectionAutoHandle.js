'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

function promiseRejectionAutoHandle(handler) {

	let then = Promise.prototype.then;

	Promise.prototype.then = function(onsuccess, onerror) {
		var newPromise = null;
		var that = this;
		if (!onerror) {
			onerror = function(error) {
				if (newPromise._catcher) {
					newPromise._catcher(error);
				}
				else if (handler) {
					handler(error);
				}
			};
		}
		newPromise = then.bind(that)(onsuccess, onerror);
		
		if (!that._subPromises) {
			that._subPromises = [];
		}
		that._subPromises.push(newPromise);

		return newPromise;
	};

	Promise.prototype.catch = function(onerror) {
		this._catcher = onerror;
		this.then(null, onerror);
	};
}

module.exports = promiseRejectionAutoHandle;