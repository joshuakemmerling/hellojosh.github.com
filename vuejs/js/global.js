var API_KEY = 'd2dcdc8e0c3e2a0c065c9a5ffce8da95eeb71e46',
	URL = 'http://demo.simpleblimp.com',
	APP_WRAP = '#bugs';

page('/user', all_user);
page('/user/new', user_new);
page('/user/:id', user_details);
page('/', index);
page('/bugs', index);
page('/bug/new', bug_new);
page('/bug/:id', bug_id);

Vue.directive('selected', {
	update: function (value) {
		if (value)
			this.el.setAttribute('selected', 'selected');
	}
});

$(init);

function init () {
	page.start();
}

function index () {
	get_data('/v1/bugs', function (ddd) {
		$(APP_WRAP).html($('#bugs_tmpl').html());

		new Vue({
			el: APP_WRAP,
			data: {
				bugs: ddd
			}
		});
	}, {});
}

function bug_new () {
	get_data('/v1/users', function (ddd) {
		$(APP_WRAP).html($('#bugs_new_tmpl').html());

		new Vue({
			el: APP_WRAP,
			data: {
				users: ddd,
				title: '',
				user: ''
			},
			methods: {
				createBug: function () {
					get_data('/v1/bug/new', function (data) {
						page('/');
					}, { title: this.title, status: 'open', assignedto: parseInt(this.user) });
				}
			}
		});
	}, {});
}

function bug_id (ctx, next) {
	var pid = parseInt(ctx.params.id),
		bug = {};

	var callback = function (b) {
		bug = b;

		get_data('/v1/users', callback2, {});
	};

	var callback2 = function (u) {
		$(APP_WRAP).html($('#bugs_id_tmpl').html());

		new Vue({
			el: APP_WRAP,
			data: {
				title: bug[0].title,
				status: bug[0].status,
				users: u,
				user: _.filter(u, { name: bug[0].name })[0].id
			},
			methods: {
				updateBug: function () {
					get_data('/v1/bug/update', function () {
						page('/');
					}, { id: pid, status: this.status + '', assignedto: this.user });
				}
			}
		});
	};

	get_data('/v1/bug', callback, { id: pid });
}

function all_user () {
	get_data('/v1/users', function (data) {
		$(APP_WRAP).html($('#users_tmpl').html());

		new Vue({
			el: APP_WRAP,
			data: {
				users: data
			}
		});
	});
}

function user_new () {
	$(APP_WRAP).html($('#user_new_tmpl').html());

	new Vue({
		el: APP_WRAP,
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
		user_params = { id: uid };

	get_data('/v1/user', function (data) {
		users = data[0];

		get_data('/v1/user/bugs', function (data) {
			$(APP_WRAP).html($('#user_id_tmpl').html());

			new Vue({
				el: APP_WRAP,
				data: {
					user: users,
					bugs: data
				}
			});
		}, user_params);
	}, user_params);
}

function get_data (uri, callback, uri_data) {
	var fullurl = URL + uri + '?access_key=' + API_KEY + '&callback=?';

	$.getJSON(fullurl, uri_data, function (ddd) {
		callback(ddd);
	}).error(function (e) {
		callback([]);
	});
}