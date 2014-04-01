window.onload = init;

var data = {
	tables: [ 'users', 'accounts', 'products' ],
	tableSelected: '',
	actionSelected: '',
	columns: {
		'users': [ 'id', 'first_name', 'last_name', 'created' ],
		'accounts': [ 'id', 'account_name', 'plan_id' ],
		'products': [ 'id', 'name', 'sku', 'price' ]
	},
	selectedColumns: {
		'users': [],
		'accounts': [],
		'products': []
	},
	whereFilters: [{ column: '', comparator: '', value: '' }],
	orderBy: [{ column: '', direction: '' }]
};

function init () {
	new Vue({
		el: '#form',
		data: data,
		methods: {
			addOrderBy: function () {
				this.orderBy.push({ column: '', direction: '' });
			},
			addWhereFilter: function () {
				this.whereFilters.push({ column: '', comparator: '', value: '' });
			},
			removeFilter: function (filterIndex) {
				this.whereFilters.$remove(filterIndex);
			},
			removeOrder: function (orderIndex) {
				this.orderBy.$remove(orderIndex);
			},
			resetSqlParts: function () {
				this.whereFilters = [{ column: '', comparator: '', value: '' }];
				this.orderBy = [{ column: '', direction: '' }];	
			}
		}
	});

	parse_sql();
}

function parse_sql () {
	var sql = 'SELECT id, last_name FROM users;';
	// var sql = 'SELECT * FROM users WHERE id <> 34 ORDER BY id DESC, first_name ASC;';
	// var sql = 'INSERT INTO _users (id, first_name, last_name) VALUES (0, \'Joshua\', \'Kemmerling\');';
	// var sql = 'UPDATE _users SET first_name = \'BOB\' WHERE id = 12;';
	// var sql = 'DELETE FROM _users WHERE id < 3000;';

	var sql_parts = sql.trim().replace(';', '').split(' '),
		type = sql_parts[0].toLowerCase(),
		table = '',
		columns = [],
		where = [],
		order = [];

	var select_label = 'select',
		from_label = 'from',
		where_label = 'where',
		order_label = 'order by';

	if (type === 'select') {		
		var tsql = sql.toLowerCase().replace(';', '');
			column_section = '',
			table_section = '',
			where_section = '',
			order_section = '';

		if (tsql.indexOf(select_label) > -1) {
			var start = tsql.indexOf(select_label) + select_label.length,
				stop = tsql.indexOf(from_label);

			column_section = tsql.substring(start, stop).trim();
		}
		
		if (tsql.indexOf(from_label) > -1) {
			var start = tsql.indexOf(from_label) + from_label.length,
				stop = tsql.indexOf(where_label);

			stop = (stop == -1) ? tsql.length : stop;
				
			table_section = tsql.substring(start, stop).trim();
		}
		
		if (tsql.indexOf(where_label) > -1) {
			var start = tsql.indexOf(where_label) + where_label.length,
				stop = tsql.indexOf(order_label);

			stop = (stop == -1) ? tsql.length : stop;
				
			where_section = tsql.substring(start, stop).trim();
		}
		
		if (tsql.indexOf(order_label) > -1) {
			var start = tsql.indexOf(order_label) + order_label.length,
				stop = 0;
				
			order_section = tsql.substring(start).trim();
		}

		if (column_section != '') {
			columns = column_section.replace(/\s/g, '').split(',');
		}

		if (table_section != '') {
			table = table_section
		}

		if (where_section != '') {
			var where_parts = where_section.split('and');

			for (var p in where_parts) {
				var tp = where_parts[p],
					tps = tp.trim().split(' ');

				where.push({ column: tps[0], comparator: tps[1], value: tps[2] });
			} 
		}

		if (order_section != '') {
			var order_parts = order_section.split(',');

			for (var p in order_parts) {
				var tp = order_parts[p],
					tps = tp.trim().split(' ');

				order.push({ column: tps[0], direction: tps[1] });
			}
		}
	}

	data.actionSelected = type;
	data.tableSelected = table;
	data.selectedColumns[table] = columns;
	
	if (where.length > 0) data.whereFilters = where;
	if (order.length > 0) data.orderBy = order;
}
