var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function (options) {
		options = options || {};
		options.class = options.class || '';
		options.title = options.title || '';
		options.body = options.body || '';
		options.closable = options.closable || false;

		var $window = $('<div class = "sitetype-window ' + options.class + '"></div>');
		var $header = $('<div class = "sitetype-window-header"></div>');
		var $body = $('<div class = "sitetype-window-body"></div>');

		$header.append ('<h1 class = "sitetype-window-title">' + options.title + '</h1>');

		if (options.closable) {
			$close = $('<span class = "sitetype-window-close">×</span>');

			$close.click (function () {
				$close.off ('click');
				$window.remove ();
			});

			$header.append ($close);
		}

		$body.append (options.body);

		$window.append ($header, $body);
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));