(function($) {
	var app = $.sammy('#main', function() {
		this.get('#/', index);
		this.get('#/user/new', new_user);
		this.get('#/user/:id', details);
		this.get('#/projects', projects);
		this.get('#/projects/new', projects_new);
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

	function new_user (context) {
		var that = this;

		context.app.swap($('#new_tmpl').html());

		new Vue({
			el: context.app.element_selector,
			methods: {
				onCreateUser: function (e) {
					e.preventDefault();

					$.getJSON('http://demo.simpleblimp.com/v1/user/create?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&firstname=' + $('#first_name').val() + '&lastname=' + $('#last_name').val() + '&callback=?', function (data) {
						that.redirect('#/');
					});
				}
			}
		});
	}

	function details (context) {
		var that = this;

		context.app.swap('');

		$.getJSON('http://demo.simpleblimp.com/v1/users?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&callback=?', function (data) {
			$.getJSON('http://demo.simpleblimp.com/v1/user/hours?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&id=' + that.params['id'] + '&callback=?', function (data2) {
				$.getJSON('http://demo.simpleblimp.com/v1/projects?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&callback=?', function (data3) {
					context.app.swap($('#edit_tmpl').html());

					new Vue({
						el: context.app.element_selector,
						data: {
							user: data2[0],
							projects: data3,
							hours: data2
						}
					});
				});
			});
		});
	}

	function projects (context) {
		context.app.swap('');

		$.getJSON('http://demo.simpleblimp.com/v1/projects?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&callback=?', function (data) {
			context.app.swap($('#projects_tmpl').html());

			new Vue({ el: context.app.element_selector, data: { projects: data } });
		});
	}

	function projects_new (context) {
		var that = this;

		context.app.swap($('#projects_new_tmpl').html());

		new Vue({
			el: context.app.element_selector,
			methods: {
				onCreateProject: function (e) {
					e.preventDefault();

					$.getJSON('http://demo.simpleblimp.com/v1/projects/create?access_key=d2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46&projectname=' + $('#project_name').val() + '&callback=?', function (data) {
						that.redirect('#/projects');
					});
				}
			}
		});
	}
})(jQuery);