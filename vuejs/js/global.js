var API_KEY = 'd2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46',
	URL = 'http://demo.simpleblimp.com';

var bugs = [
	{ id: 1, title: 'Character in Chrome are wonky.', status: 'open', assignedto: 2 },
	{ id: 2, title: 'New profile images needed.', status: 'closed', assignedto: 1 }
];
var users = [
	{ id: 1, name: 'Joshua Kemmerling' },
	{ id: 2, name: 'Michael Roberts' }
];

page('/user', all_user);
page('/user/new', user_new);
page('/user/:id', user_details);
page('/', index);
page('/bug', index);
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

// all bugs √
// new bug √
// bug details √
// users √
// user √
// new user √

function init () {
	Vue.component('user-select', {
		template: $('#user_select_comp_tmpl').html()
	});

	bug_id();

	// page.start();
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
						index();
					}, { title: title, status: 'open', assignedto: assigned_id });

					// page('/');
				}
			}
		});
	}, {});
}

function bug_id (ctx, next) {
	// var pid = parseInt(ctx.params.id),
	var pid = 1,
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
					// for (var i in bugs) {
					// 	var tbb = bugs[i];

					// 	if (tbb.id === pid) {
					// 		tbb.assignedto = parseInt($('#bug_user').val());
					// 		tbb.status = $('#bug_status').val() + '';
					// 	}
					// }

					// page('/');

					get_data('/v1/bug/update', function () {
						index();
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
				var fullurl = URL + '/v1/user/create?access_key=' + API_KEY + '&callback=?';

				$.getJSON(fullurl, { firstname: name[0], lastname: name[1] }, function (data) {
					all_user();
					// page('/user');
				}).error(function () {
					all_user();
					// page('/user');
				});
			}
		}
	});
}

function user_details (ctx, next) {
	var uid = 7,
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