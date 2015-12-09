var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function (options) {
		options = options || {};
		options.class = options.class || '';
		
		var $window = $('<div class = "site-type sitetype-window ' + options.class + '"></div>');
		return $window;
	};

	sub.createClosable = function () {

	}

	module.window = sub;
	return module;
} (module || {}, jQuery));