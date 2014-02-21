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

function init () {
	Vue.component('user-select', {
		template: $('#user_select_comp_tmpl').html()
	});

	index();

	// page.start();
}

function index () {
	$('#bugs').html($('#bugs_tmpl').html());

	new Vue({
		el: '#bugs',
		data: {
			bugs: bugs
		}
	});
}

function bug_new () {
	$('#bugs').html($('#bugs_new_tmpl').html());

	new Vue({
		el: '#bugs',
		data: {
			users: users
		},
		methods: {
			createBug: function () {
				var title = $('#bug_title').val(),
					assigned_id = parseInt($('#bug_user').val());

				bugs.push({ id: bugs.length + 1, title: title, status: 'open', assignedto: assigned_id });

				page('/');
			}
		}
	});
}

function bug_id (ctx, next) {
	$('#bugs').html($('#bugs_id_tmpl').html());

	var pid = parseInt(ctx.params.id),
		bug = {},
		user = '';

	for (var i in bugs) {
		if (bugs[i].id === pid)
			bug = bugs[i];
	}

	for (var i in users) {
		if (users[i].id === bug.assignedto)
			user = users[i].name;
	}

	new Vue({
		el: '#bugs',
		data: {
			title: bug.title,
			status: bug.status,
			assignedto: user,
			users: users
		},
		methods: {
			updateBug: function () {
				for (var i in bugs) {
					var tbb = bugs[i];

					if (tbb.id === pid) {
						tbb.assignedto = parseInt($('#bug_user').val());
						tbb.status = $('#bug_status').val() + '';
					}
				}

				page('/');
			}
		}
	});
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
	var uid = parseInt(ctx.params.id),
		fullurl = URL + '/v1/user?access_key=' + API_KEY + '&id=' + uid + '&callback=?';

	var callback = function (data) {
		console.log(data[0]);

		$('#bugs').html($('#user_id_tmpl').html());

		new Vue({
			el: '#bugs',
			data: {
				bugs: _.filter(bugs, { assignedto: uid }),
				user: data[0]
			},
			methods: {
				createUser: function () {
					var name = $('#user_name').val();

					users.push({ id: users.length + 1, name: name });

					page('/user');
				}
			}
		});
	};

	$.getJSON(fullurl, callback).error(callback);
}

function get_data (uri, callback) {
	var fullurl = URL + uri + '?access_key=' + API_KEY + '&callback=?';

	$.getJSON(fullurl, function (data) {
		callback(data);
	}).error(function () {
		callback([]);
	});
}



