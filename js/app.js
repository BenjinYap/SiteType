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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	//

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
var module = (function (module, $) {
	var sub = module.stats || {};

	sub.create = function () {
		var $window = $('<div class = "site-type sitetype-window"></div>');
		
		return $window;
	};

	module.window = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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

	var $panel;

	var tether;

	sub.init = function () {
		$panel = $('<div class = "panel"></div>');
		$('body').prepend ($panel);

		for (var stat in stats) {
			var $row = $('<div class = "row"></div>');
			$row.append ('<label>' + stats [stat].name + '</label>');
			$label = $('<span>' + stats [stat].value + '</span>');
			$row.append ($label);
			statValueLabels [stat] = $label;

			$panel.append ($row);
		}
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
		$panel.offset (offset);
	}

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));
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