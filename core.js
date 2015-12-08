var module = (function (module, $) {
	module.doIt = function () {
		console.log ('working');

		module.stats.init ();

		var elements = [];
		var elementIndex = 0;

		$('p, h1, h2, h3, h4, h5, h6').each (function () {
			elements.push ({
				element:$(this),
				chars:[],
			});
		});

		elements [0].element.text ('aaa');

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
			$e.addClass ('active-element');

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
	};

	return module;
} (module || {}, jQuery));

$(function () {
	module.doIt ();
});