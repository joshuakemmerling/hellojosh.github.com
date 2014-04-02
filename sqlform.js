window.onload = init;

var data = {
	tableSelected: '',
	actionSelected: '',
	whereFilters: [{ column: '', comparator: '', value: '' }],
	orderBy: [{ column: '', direction: '' }],
	schema: {
		'users': [
			{ name: 'id', type: 'integer' },
			{ name: 'first_name', type: 'text' },
			{ name: 'last_name', type: 'text' },
			{ name: 'created', type: 'date' }
		],
		'accounts': [
			{ name: 'id', type: 'integer' },
			{ name: 'account_name', type: 'text' },
			{ name: 'plan_id', type: 'text' }
		],
		'products': [
			{ name: 'id', type: 'integer' },
			{ name: 'name', type: 'text' },
			{ name: 'sku', type: 'text' },
			{ name: 'price', type: 'text' }
		]
	}
};

function init () {
	Vue.filter('inputType', function (value) {
		if (value.toLowerCase() == 'integer')
			return 'number';

		return value;
	});

	new Vue({
		el: '#form',
		data: data,
		methods: {
			toggleColumnSelect: function (column) {
				if (!('selected' in column))
					column.selected = false;

				column.selected = !column.selected;
			},
			addWhereFilter: function () {
				this.whereFilters.push({ column: '', comparator: '', value: '' });
			},
			removeWhereFilter: function (filterIndex) {
				this.whereFilters.$remove(filterIndex);
			},
			addOrderBy: function () {
				this.orderBy.push({ column: '', direction: '' });
			},
			removeOrderBy: function (orderIndex) {
				this.orderBy.$remove(orderIndex);
			},
			buildSql: function () {
				var sql = [],
					action = this.actionSelected;

				if (action === 'select') {
					var selected_columns = this.schema[this.tableSelected].filter(function (column) {
							return column.selected;
						}).map(function (column) {
							return column.name;
						}).join(', ');

					sql.push('SELECT', selected_columns);
					sql.push('FROM', this.tableSelected);
				} else if (action == 'insert') {
					var used_columns = this.schema[this.tableSelected].filter(function (column) {
							if (!('value' in column))
								return false;

							return column.value.trim() != '';
						}),
						columns = used_columns.map(function (column) { return column.name; }).join(', '),
						values = used_columns.map(function (column) { return _prepare_value(column.value); }).join(', ');

					sql.push('INSERT INTO', this.tableSelected, '(' + columns + ')');
					sql.push('VALUES', '(' + values + ')');
				} else if (action == 'update') {
					var set_values = this.schema[this.tableSelected].filter(function (column) {
							if (!('value' in column))
								return false;

							return column.value.trim() != '';
						}).map(function (column) {
							return column.name + ' = ' + _prepare_value(column.value);
						}).join(', ');

					sql.push('UPDATE', this.tableSelected);
					sql.push('SET', set_values);
				} else if ('delete') {
					sql.push('DELETE FROM', this.tableSelected);
				}

				if ([ 'select', 'update', 'delete' ].indexOf(action) > -1) {
					var where = where_statment();

					if (where != '')
						sql.push('WHERE', where);
				}

				if ([ 'select' ].indexOf(action) > -1) {
					var order = order_statment();

					if (order != '')
						sql.push('ORDER BY', order);
				}

				if (sql.length > 0)
					return sql.join(' ').trim() + ';';

				return '';
			}
		}
	});
}

function where_statment () {
	return data.whereFilters.filter(_non_empty_keys).map(function (where_filter) {
		return where_filter.column + ' ' + where_filter.comparator + ' ' + _prepare_value(where_filter.value);
	}).join(', ');
}

function order_statment () {
	return data.orderBy.filter(_non_empty_keys).map(function (order_by) {
		return order_by.column + ' ' + order_by.direction;
	}).join(', ');
}

function _non_empty_keys (value) {
	for (var i in value)
		if (value[i] === '')
			return false;

	return true;
}

function _prepare_value (value) {
	value = value.trim();

	if (isNaN(parseFloat(value)))
		value = '\'' + value + '\'';

	return value;
}