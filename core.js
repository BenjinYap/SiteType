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

		for (var i = 0; i < elements.length; i++) {
			var e = elements [i];

			var text = e.element.text ();
			e.element.html ('');
			var html = '';

			for (var j = 0; j < text.length; j++) {
				var c = text.charAt (j);
				e.chars = c;
				html += '<span>' + c + '</span>';
			}

			e.element.html (html);
		}

		activateElement (elements [0]);

		function activateElement (e) {
			var $e = e.element;


		}
	};

	return module;
} (module || {}, jQuery));

$(function () {
	module.doIt ();
});