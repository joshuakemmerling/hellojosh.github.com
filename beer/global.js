$(init);

function init () {
	// cal_per_alc();
	datatable_setup();
	high_low();
}

function cal_per_alc () {
	$('table thead tr').append('<th>Calorie / Alcohol %</th>');
	$('table tbody tr').each(function () {
		var $this = $(this);

		var cal = parseFloat($this.find('td:eq(1)').text()),
			alc = parseFloat($this.find('td:eq(3)').text());

		$this.append('<td>' + (cal / alc).toFixed(2) + '</td>');
	});
}

function datatable_setup () {
	$('table').dataTable({
		'bPaginate': false,
		'bInfo': false,
		'bFilter': false
	});
}

function high_low () {
	var tdCount = $('table tr:eq(1) td').length,
		trCount = $('table tr').length;

	for (var i = 1; i < tdCount; i++) {
		var $td = $('table tr:eq(2) td:eq(' + i + ')'),
			highest = 0,
			lowest = 9e99;

		for (var j = 3; j < trCount; j++) {
			$td = $td.add('table tr:eq(' + j + ') td:eq(' + i + ')');
		}

		$td.each(function(i, el){
			var $el = $(el);

			if (i >= 0) {
				var val = parseInt($el.text().replace(/[\$,]/g, ''), 10);

				if (val > highest) {
					highest = val;
					$td.removeClass('high');
					$el.addClass('high');
				}

				if (val < lowest) {
					lowest = val;
					$td.removeClass('low');
					$el.addClass('low');
				}
			}
		});
	}
}