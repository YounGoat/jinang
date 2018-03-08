let GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;

module.exports = function(g) {
	return g && g.constructor && g.constructor.constructor === GeneratorFunction;
};