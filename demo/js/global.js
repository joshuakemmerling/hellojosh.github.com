(function($) {
	var app = $.sammy('#main', function() {
		this.get('#/', index);
		this.get('#/user/:id', details);
	});

	$(function() {
		app.run('#/');
	});

	function index (context) {
		context.app.swap('');

		$.getJSON('http://demo.simpleblimp.com/v1/users?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&callback=?', function (data) {
			context.app.swap($('#index_tmpl').html());

			new Vue({ el: context.app.element_selector, data: { users: data } });
		});
	}

	function details (context) {
		context.app.swap('');

		// $.getJSON('http://demo.simpleblimp.com/v1/users?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&callback=?', function (data) {
		// 	context.app.swap($('#index_tmpl').html());

		// 	new Vue({ el: context.app.element_selector, data: { users: data } });
		// });
	}
})(jQuery);