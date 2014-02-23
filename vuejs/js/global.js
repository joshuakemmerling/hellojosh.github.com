var API_KEY = 'd2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46',
	URL = 'http://demo.simpleblimp.com';

page('/user', all_user);
page('/user/new', user_new);
page('/user/:id', user_details);
page('/', index);
page('/bugs', index);
page('/bug/new', bug_new);
page('/bug/:id', bug_id);

Vue.directive('selected', {
	bind: function () {

	},
	update: function (value) {
		if (value) {
			this.el.setAttribute('selected', 'selected');
		}
	}
});

window.onload = init;

function init () {
	Vue.component('user-select', {
		template: $('#user_select_comp_tmpl').html()
	});

	page.start();
}

function index () {
	get_data('/v1/bugs', function (ddd) {
		$('#bugs').html($('#bugs_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				bugs: ddd
			}
		});
	}, {});
}

function bug_new () {
	get_data('/v1/users', function (ddd) {
		$('#bugs').html($('#bugs_new_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				users: ddd
			},
			methods: {
				createBug: function () {
					var title = $('#bug_title').val(),
						assigned_id = parseInt($('#bug_user').val());

					get_data('/v1/bug/new', function (data) {
						page('/');
					}, { title: title, status: 'open', assignedto: assigned_id });
				}
			}
		});
	}, {});
}

function bug_id (ctx, next) {
	var pid = parseInt(ctx.params.id),
		bug = {};

	var callback = function (ddd) {
		bug = ddd;

		get_data('/v1/users', callback2, {});
	};

	var callback2 = function (ddd) {
		$('#bugs').html($('#bugs_id_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				title: bug[0].title,
				status: bug[0].status,
				assignedto: bug[0].name,
				users: ddd
			},
			methods: {
				updateBug: function () {
					get_data('/v1/bug/update', function () {
						page('/');
					}, { id: pid, status: $('#bug_status').val() + '', assignedto: $('#bug_user').val() });
				}
			}
		});
	};

	get_data('/v1/bug', callback, { id: pid });
}

function all_user () {
	get_data('/v1/users', function (data) {
		$('#bugs').html($('#users_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				users: data
			}
		});
	});
}

function user_new () {
	$('#bugs').html($('#user_new_tmpl').html());

	new Vue({
		el: '#bugs',
		methods: {
			createUser: function () {
				var name = $('#user_name').val().split(' ');

				get_data('/v1/user/create', function (data) {
					page('/user');
				}, { firstname: name[0], lastname: name[1] });
			}
		}
	});
}

function user_details (ctx, next) {
	var uid = parseInt(ctx.params.id),
		users = [],
		bugs = [];

	var callback = function (data) {
		users = data[0];

		get_data('/v1/user/bugs', callback2, { id: uid });
	};

	var callback2 = function (data) {
		$('#bugs').html($('#user_id_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				user: users,
				bugs: data
			}
		});
	};

	get_data('/v1/user', callback, { id: uid });
}

function get_data (uri, callback, uri_data) {
	var fullurl = URL + uri + '?access_key=' + API_KEY + '&callback=?';

	$.getJSON(fullurl, uri_data, function (ddd) {
		callback(ddd);
	}).error(function (e) {
		callback([]);
	});
}