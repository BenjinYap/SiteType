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
			$window = module.window.create ({
				closable:true,
				title:'We have a problem',
				body:'<p>I regret to inform you that failed to find any suitable typable sections.</p>',
			});
			$('body').append ($window);
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

		$window = module.window.create ({
			class:'sitetype-stats',
			title:'Stats',
			body:rows,
		});
		
		$('body').append ($window);
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
		$window.remove ();

		var body = [
			'<p>You\'ve typed everything! Wasn\'t that fun?</p>',
			'<p>Here are your final stats:</p>',
		];
		body = body.concat (rows);

		$window = module.window.create ({
			class:'sitetype-stats',
			closable:true,
			title:'Well done',
			body:body,
		});
		$('body').append ($window);
	};

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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
			});

			$header.append ($close);
		}

		//add the body
		$body.append (options.body);

		//add the header and body to the window
		$window.append ($header, $body);
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));