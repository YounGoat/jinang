let GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;

module.exports = function(fn) {
	return fn instanceof GeneratorFunction;
};