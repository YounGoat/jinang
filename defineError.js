/**
 * Declare a customized Error class.
 * @param  {string}    name
 * @param  {Function}  parent  parent class
 * @param  {Function} [constructorFunction]
 */
function defineError(name, parent, constructorFunction) {
	if (!parent) parent = Error;

	var Ex = function(/*String*/ message) {
		this.name = name;

		if (constructorFunction) {
			constructorFunction.apply(this, arguments);
		}
		else {
			this.message = message;
		}

		/* eslint-disable new-cap */
		var err = new parent;
		/* eslint-enable new-cap */
		
		var stack = [ this.name + ': ' + this.message ].concat(err.stack.split('\n').slice(2)).join('\n');
		Object.defineProperty(this, 'stack', {
			enumerable: false,
			value: stack, 
		});
	};

	Ex.prototype = Object.create(parent.prototype);
	Ex.prototype.consturctor = Ex;

	Object.defineProperty(Ex, 'name', { value: name });

	return Ex;
};

module.exports = defineError;
