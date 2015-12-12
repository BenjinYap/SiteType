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