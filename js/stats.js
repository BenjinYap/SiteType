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

	sub.init = function () {
		var rows = [];

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

	function updateValueLabel (stat) {
		statValueLabels [stat].text (stats [stat].value);
	}

	module.stats = sub;
	return module;
} (module || {}, jQuery));