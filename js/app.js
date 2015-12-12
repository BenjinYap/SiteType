var module = (function (module, $) {
	module.doIt = function () {
		console.log ('working');

		var elements = [];
		var elementIndex = 0;

		$('p, h1, h2, h3, h4, h5, h6').each (function () {
			elements.push ({
				element:$(this),
				chars:[],
			});
		});

		if (elements.length <= 0) {
			noElementsFound ();
			return false;
		}

		module.stats.init ();

		for (var i = 0; i < elements.length; i++) {
			var e = elements [i];

			var text = e.element.text ();
			e.element.html ('');
			var html = '';

			for (var j = 0; j < text.length; j++) {
				var c = text.charAt (j);
				e.chars.push (c);
				html += '<span>' + c + '</span>';
			}

			e.element.html (html);
		}

		var $input = $('<input type = "text" id = "input-dump" />');
		$('body').prepend ($input);

		$input.blur (function () {
			$input.focus ();
		});

		$input.focus ();

		var prevValue = '';

		activateElement (elements [elementIndex]);

		function deactivateElement (eObj) {
			var $e = eObj.element;
			$e.removeClass ('active-element');
			$e.addClass ('deactive-element');

			$input.off ('input');
		}

		function activateElement (eObj) {
			var $e = eObj.element;
			$e.removeClass ('next-active-element');
			$e.addClass ('active-element');

			if (elementIndex + 1 < elements.length) {
				elements [elementIndex + 1].element.addClass ('next-active-element');
			}

			var charIndex = 0;
			activateChar ($e.find ('span:eq(' + charIndex + ')'));

			$input.on ('input', function (e) {
				var value = $(this).val ();

				for (var i = 0; i < prevValue.length; i++) {
					value = value.replace (prevValue.charAt (i), '');
				}

				for (var i = 0; i < value.length; i++) {
					if (eObj.chars [charIndex] === value.charAt (i)) {
						deactivateChar ($e.find ('span:eq(' + charIndex + ')'));

						module.stats.incrementCorrectKey ();

						charIndex++;
						
						if (charIndex < eObj.chars.length) {
							activateChar ($e.find ('span:eq(' + charIndex + ')'));
						} else {
							deactivateElement (eObj);

							elementIndex++;

							if (elementIndex < elements.length) {
								activateElement (elements [elementIndex]);
							} else {
								gameOver ();
							}
						}
					} else {
						module.stats.incrementIncorrectKey ();
					}
				}

				prevValue = $(this).val ();
			});
		}

		function deactivateChar ($c) {
			$c.removeClass ('active-char');
			$c.addClass ('deactive-char');
		}

		function activateChar ($c) {
			$c.addClass ('active-char');
			module.stats.movePanel ();
		}

		function noElementsFound () {
			$window = module.window.show ({
				closable:true,
				width:'300px',
				title:'We have a problem',
				body:'<p>I regret to inform you that failed to find any suitable typable sections.</p>',
			});
			module.window.showOverlay ();
		}

		function gameOver () {
			$input.remove ();
			module.stats.showFinalStats ();
		}
	};

	return module;
} (module || {}, jQuery));

$(function () {
	if (window.location.hostname === 'benjinyap.com') {
		module.doIt ();
	}

	$('body').prepend ('<span class = "doitbutton"></span>');

	$('.doitbutton').click (function () {
		module.doIt ();
	});
});
var module = (function (module, $) {
	var sub = module.stats || {};

	var NUM_KEYS = 0;
	var NUM_CORRECT_KEYS = 1;
	var NUM_INCORRECT_KEYS = 2;

	var stats = {};
	stats [NUM_KEYS] = {
		name:'# Keys',
		value:0,
	};
	stats [NUM_CORRECT_KEYS] = {
		name:'# Correct Keys',
		value:0,
	};
	stats [NUM_INCORRECT_KEYS] = {
		name:'# Incorrect Keys',
		value:0,
	};
	
	var statValueLabels = {};

	var $window;
	var rows = [];

	sub.init = function () {
		for (var stat in stats) {
			var $row = $('<div class = "sitetype-row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;
			rows.push ($row);
		}

		$window = module.window.show ({
			class:'sitetype-stats',
			title:'Stats',
			body:rows,
		});
	};

	sub.incrementCorrectKey = function () {
		stats [NUM_KEYS].value++;
		stats [NUM_CORRECT_KEYS].value++;
 
		updateValueLabel (NUM_KEYS);
		updateValueLabel (NUM_CORRECT_KEYS);
	};

	sub.incrementIncorrectKey = function () {
		stats [NUM_KEYS].value++;
		stats [NUM_INCORRECT_KEYS].value++;

		updateValueLabel (NUM_KEYS);
		updateValueLabel (NUM_INCORRECT_KEYS);
	};

	sub.movePanel = function () {
		var $c = $('.active-char');
		var offset = $c.offset ();
		offset.top += $c.height ();
		$window.offset (offset);
	}

	sub.showFinalStats = function () {
		//get position of stats window
		var offset = $window.offset ();

		//remove active stats window
		$window.remove ();

		var body = [
			'<p>You\'ve typed everything! Wasn\'t that fun?</p>',
			'<p>Here are your final stats:</p>',
		];
		body = body.concat (rows);

		//create final modal stats window
		$window = module.window.show ({
			class:'sitetype-stats',
			closable:true,
			title:'Well done',
			body:body,
		});
		module.window.showOverlay ();

		//get centered offset
		var targetOffset = $window.offset ();

		//set final window to position of original stats window
		$window.offset (offset);

		//animate to center of screen
		$window.animate ({
			left:targetOffset.left + 'px',
			top:targetOffset.top + 'px',
		}, 500);
	};

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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