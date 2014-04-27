$(init);
$(window).on('load', load);

function init () {
	$(window).on('resize', window_resize).trigger('resize');
	$('#back_to_top').on('click', scroll_to_top);
}

function load () {
	$('section').waypoint(waypoint_handler).each(each_section);
}

function waypoint_handler (direction) {
	var opac = (direction == 'down') ? 1.0 : 0.4;

	$(this).find('.wrap').fadeTo(200, opac);
}

function scroll_to_top () {
	$('body').animate({ scrollTop: 0 }, 250);
}

function window_resize () {
	if ($('#intro').hasClass('two') || $('#intro').hasClass('four'))
		return false;

	var hdh = ($('#intro').height() - $('#about').height()) / 2;

	$('#about').css({ margin: hdh + 'px 0' });
}

function each_section () {
	var $this = $(this),
		st = $(window).scrollTop(),
		opac = (st > $this.position().top) ? 1.0 : 0.4;

	$this.find('.wrap').fadeTo(0, opac);
}