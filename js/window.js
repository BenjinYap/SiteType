var module = (function (module, $) {
	var sub = module.stats || {};

	sub.show = function (options) {
		//set default options
		options = options || {};
		options.class = options.class || '';
		options.title = options.title || '';
		options.body = options.body || '';
		options.position = options.position || 'center center';
		options.width = options.width || 'initia';
		options.closable = options.closable || false;

		//create jquery elements
		var $window = $('<div class = "sitetype-window ' + options.class + '" tabindex = "0"></div>');
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
				sub.destroy ($window);
			});

			$header.append ($close);

			$window.keydown (function (e) {
				if (e.keyCode === 27) {
					sub.destroy ($window);
				}
			});
		}

		//add the body
		$body.append (options.body);

		//add the header and body to the window
		$window.append ($header, $body);

		//set window properties
		$window.css ('width', options.width);
		$window.css ('visibility', 'hidden');

		//add the window
		$('body').append ($window);

		var width = $window.outerWidth ();
		var height = $window.outerHeight ();

		$window.css ('left', ($(window).width () / 2 - width / 2) + 'px');
		$window.css ('top', ($(window).height () / 2 - height / 2) + 'px');

		$window.css ('visibility', 'visible');

		//focus the window
		$window.focus ();

		return $window;
	};

	sub.showOverlay = function () {
		$('body').append ($('<div class = "sitetype-window-overlay"></div>'));
	};

	sub.destroy = function ($window) {
		$window.find ('.sitetype-window-close').off ('click');
		$window.off ('keydown');
		$('.sitetype-window-overlay').remove ();
		$window.remove ();
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));