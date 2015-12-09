var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		return $window;
	};

	sub.createClosable = function () {
		
	}

	module.window = sub;
	return module;
} (module || {}, jQuery));