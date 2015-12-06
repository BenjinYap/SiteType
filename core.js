var module = (function (module, $) {
	module.doIt = function () {
		console.log ('working');

		var elements = [];

		$('p').each (function () {
			elements.push ({
				element:$(this),
				chars:[],
			});
		});

		//elements [0].element.text ('aaa');

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
		$input.focus ();

		var prevValue = '';

		activateElement (elements [0]);

		function activateElement (eObj) {
			var $e = eObj.element;
			$e.addClass ('active');

			var charIndex = 0;
			activateChar ($e.find ('span:eq(' + charIndex + ')'));

			$input.on ('input', function (e) {
				var value = $(this).val ();

				for (var i = 0; i < prevValue.length; i++) {
					value = value.replace (prevValue.charAt (i), '');
				}

				for (var i = 0; i < value.length; i++) {
					console.log (value.charAt (i), eObj.chars [charIndex]);
					if (eObj.chars [charIndex] === value.charAt (i)) {
						charIndex++;
						deactivateChar ($e.find ('span:eq(' + (charIndex - 1) + ')'));
						activateChar ($e.find ('span:eq(' + charIndex + ')'));
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
		}
	};

	return module;
} (module || {}, jQuery));

$(function () {
	module.doIt ();
});