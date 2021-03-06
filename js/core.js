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