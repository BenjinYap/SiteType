var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function (options) {
		//set default options
		options = options || {};
		options.class = options.class || '';
		options.title = options.title || '';
		options.body = options.body || '';
		options.closable = options.closable || false;

		//create jquery elements
		var $window = $('<div class = "sitetype-window ' + options.class + '"></div>');
		var $header = $('<div class = "sitetype-window-header"></div>');
		var $body = $('<div class = "sitetype-window-body"></div>');

		//add the title
		$header.append ('<h1 class = "sitetype-window-title">' + options.title + '</h1>');

		//add the closing feature
		if (options.closable) {
			//add the close button
			$close = $('<span class = "sitetype-window-close">×</span>');

			//bind the close event
			$close.click (function () {
				$close.off ('click');
				$window.remove ();
				$('.sitetype-window-overlay').remove ();
			});

			$header.append ($close);
		}

		//add the body
		$body.append (options.body);

		//add the header and body to the window
		$window.append ($header, $body);
		return $window;
	};

	sub.addOverlay = function () {
		$('body').append ($('<div class = "sitetype-window-overlay"></div>'));
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));