var module = (function (module, $) {
	module.doIt = function () {
		console.log ('working');

		
	};

	return module;
} (module || {}, jQuery));

$(function () {
	module.doIt ();
});