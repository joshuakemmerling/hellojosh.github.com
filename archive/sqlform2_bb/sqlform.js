window.onload = init;

var sql = '';

var sql = '',
	data = {
		tableSelected: '',
		actionSelected: '',
		whereFilters: [],
		orderBy: [],
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
		},
		comparatorOptions: [
			{ name: 'Select a Comparator', value: '' },
			{ name: 'equal to', value: '=' },
			{ name: 'not equal to', value: '<>' },
			{ name: 'less than', value: '<' },
			{ name: 'greater than', value: '>' },
			{ name: 'like', value: 'LIKE' },
			{ name: 'in', value: 'IN' },
			{ name: 'not', value: 'NOT IN' }
		],
		sortOptions: [
			{ name: 'Select Direction', value: '' },
			{ name: 'A &rarr; Z', value: 'ASC' },
			{ name: 'Z &rarr; A', value: 'DESC' }
		]
	};

function init () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$('body').on('mouseover', '[data-toggle="popover"][data-trigger="hover"]', function () {
		$(this).popover('show');
	});

	parse_sql(sql);

	data.activeTab = 0;
	data.rawSql = sql;
	data.buildSql = function () {
		if (sql_form_modal.get('activeTab') == 1)
			return sql_form_modal.get('rawSql');

		return buildSql(sql_form_modal.attributes);
	};
	data.allColumnsSelected = function () {
		var c = sql_form_modal.get('schema')[sql_form_modal.get('tableSelected')],
			l = c.length,
			sl = _.filter(c, 'selected').length;

		return l == sl;
	};

	var AppModel = Backbone.Model.extend({
		defaults: data
	});
	var sql_form_modal = new AppModel();

	var AppView = Backbone.View.extend({
		el: $("#form"),
		model: sql_form_modal,
		template: _.template($('#sql_form_template').html()),
		events: {
			'click .sql-panel-tabs a': 'switchTabs',
			'change #sql_form_table': 'switchTable',
			'change #sql_form_action': 'switchAction',
			'change #sql_form_column input': 'checkColumn',
			'click #add_where_filter_link': 'addWhereFilter',
			'click .remove_where_filter_link': 'removeWhereFilter',
			'change .where_filter_group .where_filter_attribute': 'setWhereFilterAttribute',
			'change .order_by_group .order_by_attribute': 'setOrderByAttribute',
			'click #add_order_by_link': 'addOrderBy',
			'click .remove_order_by_link': 'removeOrderBy',
			'keyup .column_value_attribute': 'setColumnValue',
			'keyup #raw_sql_textarea': 'setRawSql',
			'click #select_all_columns_link': 'selectAllColumns',
			'click #deselect_all_columns_link': 'deselectAllColumns'
		},
		initialize: function () {
			this.listenTo(this.model, 'change:tableSelected', this.render);
			this.listenTo(this.model, 'change:actionSelected', this.render);
			this.listenTo(this.model, 'change:whereFilters', this.render);
			this.listenTo(this.model, 'change:orderBy', this.render);
			this.listenTo(this.model, 'change:activeTab', this.render);
			this.listenTo(this.model, 'change', this.setOutputSql);

			this.render();
		},
		render: function() {
			console.log('rendering...');

			this.$el.html(this.template(this.model.attributes));

			return this;
		},
		setOutputSql: function () {
			var sql = this.model.get('buildSql')();

			$('#rawSqlTest').val(sql);
			$('#raw_sql_textarea').val(sql);
		},
		switchTabs: function (e) {
			this.model.set({ activeTab: $(e.currentTarget).data('tab') });
		},
		switchTable: function (e) {
			this.model.set({ tableSelected: $(e.currentTarget).val() });
		},
		switchAction: function (e) {
			this.model.set({ actionSelected: $(e.currentTarget).val() });
		},
		checkColumn: function (e) {
			var s = this.model.get('schema');

			_.forEach(s[this.model.get('tableSelected')], function (v) {
				if (v.name == $(e.currentTarget).val())
					v.selected = $(e.currentTarget).is(':checked');
			});

			this.model.set('schema', {});
			this.model.set('schema', s);
		},
		addWhereFilter: function (e) {
			var wf = this.model.get('whereFilters');
				wf.push({ column: '', comparator: '', value: '' });

			this.model.set('whereFilters', {});
			this.model.set('whereFilters', wf);
		},
		removeWhereFilter: function (e) {
			var $this = $(e.currentTarget),
				$p = $this.parent().parent(),
				$pp = $this.parent().parent().parent().find('.form-group'),
				index = $pp.index($p);

			var wf = this.model.get('whereFilters');
				wf.splice(index, 1);

			this.model.set('whereFilters', {});
			this.model.set('whereFilters', wf);
		},
		setWhereFilterAttribute: function (e) {
			var $this = $(e.currentTarget),
				$p = $this.parent().parent(),
				$pp = $this.parent().parent().parent().find('.form-group'),
				index = $pp.index($p);

			var wf = this.model.get('whereFilters');
				wf[index][$this.data('attribute')] = $this.val();

			this.model.set('whereFilters', {});
			this.model.set('whereFilters', wf);
		},
		addOrderBy: function () {
			var wf = this.model.get('orderBy');
				wf.push({ column: '', direction: '' });

			this.model.set('orderBy', {});
			this.model.set('orderBy', wf);
		},
		removeOrderBy: function (e) {
			var $this = $(e.currentTarget),
				$p = $this.parent().parent(),
				$pp = $this.parent().parent().parent().find('.form-group'),
				index = $pp.index($p);

			var wf = this.model.get('orderBy');
				wf.splice(index, 1);

			this.model.set('orderBy', {});
			this.model.set('orderBy', wf);
		},
		setOrderByAttribute: function (e) {
			var $this = $(e.currentTarget),
				$p = $this.parent().parent(),
				$pp = $this.parent().parent().parent().find('.form-group'),
				index = $pp.index($p);

			var wf = this.model.get('orderBy');
				wf[index][$this.data('attribute')] = $this.val();

			this.model.set('orderBy', {});
			this.model.set('orderBy', wf);
		},
		setColumnValue: function (e) {
			var $this = $(e.currentTarget),
				s = this.model.get('schema');

			_.forEach(s[this.model.get('tableSelected')], function (v) {
				if (v.name == $this.data('attribute'))
					v.value = $this.val();
			});

			this.model.set('schema', {});
			this.model.set('schema', s);
		},
		setRawSql: function (e) {
			this.model.set('rawSql', $(e.currentTarget).val());
		},
		selectAllColumns: function () {
			var s = this.model.get('schema');

			_.forEach(s[this.model.get('tableSelected')], function (v) {
				v.selected = true;
			});

			this.model.set('schema', {});
			this.model.set('schema', s);

			this.render();
		},
		deselectAllColumns: function () {
			var s = this.model.get('schema');

			_.forEach(s[this.model.get('tableSelected')], function (v) {
				v.selected = false;
			});

			this.model.set('schema', {});
			this.model.set('schema', s);

			this.render();
		}
	});

	var sql_form_app = new AppView;

	/*
	Vue.filter('inputType', function (value) {
		return 'text';

		if (value.toLowerCase() == 'integer')
			return 'number';

		return value;
	});

	new Vue({
		el: '#form',
		data: data,
		computed: {
			sql: function () {
				this.$data;

				if (this.activeTab == 0)
					return this.buildSql();

				return this.rawSql;
			}
		},
		methods: {
			addWhereFilter: function () {
				this.whereFilters.push({ column: '', comparator: '', value: '' });
			},
			addOrderBy: function () {
				this.orderBy.push({ column: '', direction: '' });
			},
			checkTableValue: function () {
				if (this.tableSelected == '')
					this.actionSelected = '';
			},
			buildSql: function () {
				var sql = [],
					action = this.actionSelected;

				if (action == '')
					return '';

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
			},
			parseSql: function () {
				parse_sql(this.sql);
			}
		}
	});
	*/
}

function buildSql (data) {
	console.log(data);

	var sql = [],
		action = data.actionSelected;

	if (action == '' || data.schema.length == 0)
		return '';

	if (action === 'select') {
		var selected_columns = _.chain(data.schema[data.tableSelected]).filter(function (column) {
				return column.selected;
			}).map(function (column) {
				return column.name;
			}).value().join(', ');

		sql.push('SELECT', selected_columns);
		sql.push('FROM', data.tableSelected);
	} else if (action == 'insert') {
		var used_columns = _.chain(data.schema[data.tableSelected]).filter(function (column) {
				if (!('value' in column))
					return false;

				return column.value.trim() != '';
			}).value(),
			columns = _.map(used_columns, function (column) { return column.name; }).join(', '),
			values = _.map(used_columns, function (column) { return _prepare_value(column.value); }).join(', ');

		sql.push('INSERT INTO', data.tableSelected, '(' + columns + ')');
		sql.push('VALUES', '(' + values + ')');
	} else if (action == 'update') {
		var set_values = _.chain(data.schema[data.tableSelected]).filter(function (column) {
				if (!('value' in column))
					return false;

				return column.value.trim() != '';
			}).map(function (column) {
				return column.name + ' = ' + _prepare_value(column.value);
			}).value().join(', ');

		sql.push('UPDATE', data.tableSelected);
		sql.push('SET', set_values);
	} else if ('delete') {
		sql.push('DELETE FROM', data.tableSelected);
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

function where_statment () {
	return data.whereFilters.filter(_non_empty_keys).map(function (where_filter) {
		return where_filter.column + ' ' + where_filter.comparator + ' ' + _prepare_value(where_filter.value);
	}).join(' AND ');
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
	if (isNaN(value))
		value = '\'' + value + '\'';

	return value;
}

function parse_sql (stmt) {
	var parts = simpleSqlParser.sql2ast(stmt);

	if ('SELECT' in parts) {
		data.actionSelected = 'select';
	} else if ('INSERT INTO' in parts) {
		data.actionSelected = 'insert';
	} else if ('DELETE FROM' in parts) {
		data.actionSelected = 'update';
	} else if ('UPDATE' in parts) {
		data.actionSelected = 'delete';
	}

	if ('FROM' in parts) {
		data.tableSelected = parts.FROM[0].table;

		var columns = _.map(parts.SELECT, function (v) { return v.name; })

		_.each(data.schema[data.tableSelected], function (v, k) {
			if (columns.indexOf(v.name) > -1 || columns.indexOf('*') > -1)
				v.selected = true;
		});
	}

	if ('INSERT INTO' in parts) {
		data.tableSelected = parts['INSERT INTO'].table || '';

		var names = _.chain(data.schema[data.tableSelected]).map(function (v) { return v.name; }).value();

		if ('columns' in parts['INSERT INTO']) {
			_.each(parts['INSERT INTO'].columns, function (v, i) {
				var index = _.indexOf(names, v);

				var val = parts.VALUES[0][i];
					val = (val[0] == "'") ? val.substring(1) : val;
					val = (val[val.length - 1] == "'") ? val.substring(0, val.length - 1) : val;

				data.schema[data.tableSelected][index].value = val;
			});
		}
	}

	if ('UPDATE' in parts) {
		data.tableSelected = parts.UPDATE[0].table;

		if ('SET' in parts) {
			var names = _.chain(data.schema[data.tableSelected]).map(function (v) { return v.name; }).value();
			var set = _.chain(parts.SET).map(function (v) { return v.expression.split('='); }).each(function (v) {
				var col = v[0].trim(),
					index = _.indexOf(names, col);

				var val = v[1].trim();
					val = (val[0] == "'") ? val.substring(1) : val;
					val = (val[val.length - 1] == "'") ? val.substring(0, val.length - 1) : val;

				data.schema[data.tableSelected][index].value = val;
			}).value();
		}
	}

	if ('DELETE FROM' in parts) {
		data.tableSelected = parts['DELETE FROM'][0].table || '';
	}

	if ('WHERE' in parts) {
		data.whereFilters = _.map(parts.WHERE.terms || [parts.WHERE], function (v) {
			var val = v.right;
				val = (val[0] == "'") ? val.substring(1) : val;
				val = (val[val.length - 1] == "'") ? val.substring(0, val.length - 1) : val;

			return { column: v.left, comparator: v.operator, value: val };
		});
	}

	if ('ORDER BY' in parts) {
		data.orderBy = _.map(parts['ORDER BY'], function (v) {
			return { column: v.column, direction: v.order };
		});
	}
}

(function(exports) {
	"use strict";

	function trim(str) {
		if (typeof str == 'string') return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
		else return str;
	}

	// Split a string using a separator, only if this separator isn't beetween brackets
	function protect_split(separator, str) {
		var sep = '######';

		var string = false;
		var nb_brackets = 0;
		var new_str = "";
		for (var i = 0 ; i < str.length ; i++) {
			if (!string && /['"`]/.test(str[i])) string = str[i];
			else if (string && str[i] == string) string = false;
			else if (!string && str[i] == '(') nb_brackets ++;
			else if (!string && str[i] == ')') nb_brackets --;

			if (str[i] == separator && (nb_brackets > 0 || string)) new_str += sep;
			else new_str += str[i];
		}
		str = new_str;

		str = str.split(separator);
		str = str.map(function (item) {
			return trim(item.replace(new RegExp(sep, 'g'), separator));
		});

		return str;
	}

	// Add some # inside a string to avoid it to match a regex/split
	function protect(str) {
		var result = '#';
		var length = str.length;
		for (var i = 0 ; i < length ; i++) result += str[i] + "#";
		return result;
	}

	// Restore a string output by protect() to its original state
	function unprotect(str) {
		var result = '';
		var length = str.length;
		for (var i = 1 ; i < length ; i = i + 2) result += str[i];
		return result;
	}


	// Parse a query
	// parseCond: (bool) parse conditions in WHERE and JOIN (default true)
	exports.sql2ast = function (query, parseCond) {
		if (typeof parseCond == 'undefined' || parseCond === null) parseCond = true;

		// Remove semi-colons and keep only the first query
		var semi_colon = '###semi-colon###';
		query = query.replace(/[("'`].*;.*[)"'`]/g, function (match) {
			return match.replace(/;/g, semi_colon);
		});
		var eor = '###EOR###';
		query = query.replace(/;/g, eor);
		query = query.split(eor)[0];
		query = query.replace(new RegExp(semi_colon, 'g'), ';');

		// Define which words can act as separator
		var keywords = ['SELECT', 'FROM', 'DELETE FROM', 'INSERT INTO', 'UPDATE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ORDER BY', 'GROUP BY', 'HAVING', 'WHERE', 'LIMIT', 'VALUES', 'SET'];
		var parts_name = keywords.map(function (item) {
			return item + ' ';
		});
		parts_name = parts_name.concat(keywords.map(function (item) {
			return item + '(';
		}));
		parts_name = parts_name.concat(parts_name.map(function (item) {
			return item.toLowerCase();
		}));
		var parts_name_escaped = parts_name.map(function (item) {
			return item.replace('(', '[\\(]');
		});

		// Hide words defined as separator but written inside brackets in the query
		query = query.replace(/\((.+?)\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
			return match.replace(new RegExp(parts_name_escaped.join('|'), 'gi'), protect);
		});

		// Write the position(s) in query of these separators
		var parts_order = [];
		function realNameCallback(match, name) {
			return name;
		}
		parts_name.forEach(function (item) {
			var pos = 0;
			var part;

			do {
				part = query.indexOf(item, pos);
				if (part != -1) {
					var realName = item.replace(/^((\w|\s)+?)\s?\(?$/i, realNameCallback);
					parts_order[part] = realName;	// Position won't be exact because the use of protect() (above) and unprotect() alter the query string ; but we just need the order :)
					pos = part + realName.length;
				}
			}
			while (part != -1);
		});

		// Delete duplicates (caused, for example, by JOIN and INNER JOIN)
		var busy_until = 0;
		parts_order.forEach(function (item, key) {
			if (busy_until > key) delete parts_order[key];
			else {
				busy_until = parseInt(key, 10) + item.length;

				// Replace JOIN by INNER JOIN
				if (item == 'JOIN') parts_order[key] = 'INNER JOIN';
			}
		});

		// Generate protected word list to reverse the use of protect()
		var words = parts_name_escaped.slice(0);
		words = words.map(function (item) {
			return protect(item);
		});
		words = words.join('|');

		// Split parts
		var parts = query.split(new RegExp(parts_name_escaped.join('|'), 'i'));

		// Unhide words precedently hidden with protect()
		query = query.replace(/\((.+?)\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
			return match.replace(new RegExp(words, 'gi'), unprotect);
		});
		parts = parts.map(function (item) {
			return item.replace(/\((.+?)\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
				return match.replace(new RegExp(words, 'gi'), unprotect);
			});
		});

		// Define analysis functions
		var analysis = [];

		analysis['SELECT'] = function (str) {
			var result = protect_split(',', str);
			result = result.filter(function(item) {
				return item !== '';
			}).map(function(item) {
				return {name: item};
			});
			return result;
		};

		analysis['SET'] = function (str) {
			var result = protect_split(',', str);
			result = result.filter(function(item) {
				return item !== '';
			}).map(function(item) {
				return {expression: item};
			});
			return result;
		};

		analysis['FROM'] = analysis['DELETE FROM'] = analysis['UPDATE'] = function (str) {
			var result = str.split(',');
			result = result.map(function(item) {
				return trim(item);
			});
			result.forEach(function(item, key) {
				if (item === '') result.splice(key);
			});
			result = result.map(function(item) {
				var table = item.split(' AS ');
				var alias = table[1] || '';
				if (alias.indexOf('"') === 0 && alias.lastIndexOf('"') == alias.length - 1) alias = alias.substring(1, alias.length - 1);
				return {table: table[0], as: alias};
			});
			return result;
		};

		analysis['LEFT JOIN'] = analysis['JOIN'] = analysis['INNER JOIN'] = analysis['RIGHT JOIN'] = function (str) {
			str = str.split(' ON ');
			var table = str[0].split(' AS ');
			var result = {};
			result['table'] = trim(table[0]);
			result['as'] = trim(table[1]) || '';
			result['cond'] = trim(str[1]);

			return result;
		};

		analysis['WHERE'] = function (str) {
			return trim(str);
		};

		analysis['ORDER BY'] = function (str) {
			str = str.split(',');
			var result = [];
			str.forEach(function (item, key) {
				var order_by = /([A-Za-z0-9_\.]+)\s*(ASC|DESC){0,1}/gi;
				order_by = order_by.exec(item);
				if (order_by !== null) {
					var tmp = {};
					tmp['column'] = trim(order_by[1]);
					tmp['order'] = trim(order_by[2]);
					if(order_by[2] === undefined ){
						tmp['order']="ASC";
					}
					result.push(tmp);
				}
			});
			return result;
		};

		analysis['GROUP BY'] = function (str) {
			str = str.split(',');
			var result = [];
			str.forEach(function (item, key) {
				var group_by = /([A-Za-z0-9_\.]+)/gi;
				group_by = group_by.exec(item);
				if (group_by !== null) {
					var tmp = {};
					tmp['column'] = trim(group_by[1]);
					result.push(tmp);
				}
			});
			return result;
		};
		analysis['LIMIT'] = function (str) {
			var limit = /((\d+)\s*,\s*)?(\d+)/gi;
			limit = limit.exec(str);
			if (typeof limit[2] == 'undefined') limit[2] = 0;
			var result = {};
			result['nb'] = parseInt(trim(limit[3]), 10);
			result['from'] = parseInt(trim(limit[2]), 10);
			return result;
		};

		analysis['INSERT INTO'] = function (str) {
			var insert = /([A-Za-z0-9_\.]+)\s*(\(([A-Za-z0-9_\., ]+)\))?/gi;
			insert = insert.exec(str);
			var result = {};
			result['table'] = trim(insert[1]);
			if (typeof insert[3] != 'undefined') {
				result['columns'] = insert[3].split(',');
				result['columns'] = result['columns'].map(function (item) {
					return trim(item);
				});
			}
			return result;
		};

		analysis['VALUES'] = function (str) {
			str = trim(str);
			if (str[0] != '(') str = '(' + str;	// If query has "VALUES(...)" instead of "VALUES (...)"
			var groups = protect_split(',', str);
			var result = [];
			groups.forEach(function(group) {
				group = group.replace(/^\(/g,'').replace(/\)$/g,'');
				group = protect_split(',', group);
				result.push(group);
			});
			return result;
		};

		// TODO: handle HAVING

		// Analyze parts
		var result = {};
		var j = 0;
		parts_order.forEach(function (item, key) {
			item = item.toUpperCase();
			j++;
			if (typeof analysis[item] != 'undefined') {
				var part_result = analysis[item](parts[j]);

				if (typeof result[item] != 'undefined') {
					if (typeof result[item] == 'string' || typeof result[item][0] == 'undefined') {
						var tmp = result[item];
						result[item] = [];
						result[item].push(tmp);
					}

					result[item].push(part_result);
				}
				else result[item] = part_result;
			}
			else console.log('Can\'t analyze statement "' + item + '"');
		});

		// Reorganize joins
		if (typeof result['LEFT JOIN'] != 'undefined') {
			if (typeof result['JOIN'] == 'undefined') result['JOIN'] = [];
			if (typeof result['LEFT JOIN'][0] != 'undefined') {
				result['LEFT JOIN'].forEach(function (item) {
					item.type = 'left';
					result['JOIN'].push(item);
				});
			}
			else {
				result['LEFT JOIN'].type = 'left';
				result['JOIN'].push(result['LEFT JOIN']);
			}
			delete result['LEFT JOIN'];
		}
		if (typeof result['INNER JOIN'] != 'undefined') {
			if (typeof result['JOIN'] == 'undefined') result['JOIN'] = [];
			if (typeof result['INNER JOIN'][0] != 'undefined') {
				result['INNER JOIN'].forEach(function (item) {
					item.type = 'inner';
					result['JOIN'].push(item);
				});
			}
			else {
				result['INNER JOIN'].type = 'inner';
				result['JOIN'].push(result['INNER JOIN']);
			}
			delete result['INNER JOIN'];
		}
		if (typeof result['RIGHT JOIN'] != 'undefined') {
			if (typeof result['JOIN'] == 'undefined') result['JOIN'] = [];
			if (typeof result['RIGHT JOIN'][0] != 'undefined') {
				result['RIGHT JOIN'].forEach(function (item) {
					item.type = 'right';
					result['JOIN'].push(item);
				});
			}
			else {
				result['RIGHT JOIN'].type = 'right';
				result['JOIN'].push(result['RIGHT JOIN']);
			}
			delete result['RIGHT JOIN'];
		}

		// Parse conditions
		if (parseCond) {
			if (typeof result['WHERE'] == 'string') {
				result['WHERE'] = CondParser.parse(result['WHERE']);
			}
			if (typeof result['JOIN'] != 'undefined') {
				result['JOIN'].forEach(function (item, key) {
					result['JOIN'][key]['cond'] = CondParser.parse(item['cond']);
				});
			}
		}

		return result;
	};


	/*
	 * LEXER & PARSER FOR SQL CONDITIONS
	 * Inspired by https://github.com/DmitrySoshnikov/Essentials-of-interpretation
	 */

	// Constructor
	function CondLexer(source) {
		this.source = source;
		this.cursor = 0;
		this.currentChar = "";

		this.readNextChar();
	}

	CondLexer.prototype = {
		constructor: CondLexer,

		// Read the next character (or return an empty string if cursor is at the end of the source)
		readNextChar: function () {
			if (typeof this.source != 'string') this.currentChar = "";
			else this.currentChar = this.source[this.cursor++] || "";
		},

		// Determine the next token
		readNextToken: function () {
			if (/\w/.test(this.currentChar)) return this.readWord();
			if (/["'`]/.test(this.currentChar)) return this.readString();
			if (/[()]/.test(this.currentChar)) return this.readGroupSymbol();
			if (/[!=<>]/.test(this.currentChar)) return this.readOperator();

			if (this.currentChar === "") return {type: 'eot', value: ''};
			else {
				this.readNextChar();
				return {type: 'empty', value: ''};
			}
		},

		readWord: function () {
			var tokenValue = "";
			var nb_brackets = 0;
			var string = false;
			while (/./.test(this.currentChar)) {
				// Check if we are in a string
				if (!string && /['"`]/.test(this.currentChar)) string = this.currentChar;
				else if (string && this.currentChar == string) string = false;
				else {
					// Allow spaces inside functions (only if we are not in a string)
					if (!string) {
						// Token is finished if there is a closing bracket outside a string and with no opening
						if (this.currentChar == ')' && nb_brackets <= 0) break;

						if (this.currentChar == '(') nb_brackets++;
						else if (this.currentChar == ')') nb_brackets--;

						// Token is finished if there is a operator symbol outside a string
						if (/[!=<>]/.test(this.currentChar)) break;
					}

					// Token is finished on the first space which is outside a string or a function
					if (this.currentChar == ' ' && nb_brackets <= 0) break;
				}

				tokenValue += this.currentChar;
				this.readNextChar();
			}

			if (/^(AND|OR)$/i.test(tokenValue)) return {type: 'logic', value: tokenValue};
			if (/^(IN|IS|NOT|LIKE)$/i.test(tokenValue)) return {type: 'operator', value: tokenValue};
			else return {type: 'word', value: tokenValue};
		},

		readString: function () {
			var tokenValue = "";
			var quote = this.currentChar;

			tokenValue += this.currentChar;
			this.readNextChar();

			while (this.currentChar != quote && this.currentChar !== "") {
				tokenValue += this.currentChar;
				this.readNextChar();
			}

			tokenValue += this.currentChar;
			this.readNextChar();

			// Handle this case : `table`.`column`
			if (this.currentChar == '.') {
				tokenValue += this.currentChar;
				this.readNextChar();
				tokenValue += this.readString().value;

				return {type: 'word', value: tokenValue};
			}

			return {type: 'string', value: tokenValue};
		},

		readGroupSymbol: function () {
			var tokenValue = this.currentChar;
			this.readNextChar();

			return {type: 'group', value: tokenValue};
		},

		readOperator: function () {
			var tokenValue = this.currentChar;
			this.readNextChar();

			if (/[=<>]/.test(this.currentChar)) {
				tokenValue += this.currentChar;
				this.readNextChar();
			}

			return {type: 'operator', value: tokenValue};
		},
	};

	// Tokenise a string (only useful for debug)
	CondLexer.tokenize = function (source) {
		var lexer = new CondLexer(source);
		var tokens = [];
		do {
			var token = lexer.readNextToken();
			if (token.type != 'empty') tokens.push(token);
		}
		while (lexer.currentChar);
		return tokens;
	};


	// Constructor
	function CondParser(source) {
		this.lexer = new CondLexer(source);
		this.currentToken = "";

		this.readNextToken();
	}

	CondParser.prototype = {
		constructor: CondParser,

		// Read the next token (skip empty tokens)
		readNextToken: function () {
			this.currentToken = this.lexer.readNextToken();
			while (this.currentToken.type == 'empty') this.currentToken = this.lexer.readNextToken();
			return this.currentToken;
		},

		// Wrapper function ; parse the source
		parseExpressionsRecursively: function () {
			return this.parseLogicalExpression();
		},

		// Parse logical expressions (AND/OR)
		parseLogicalExpression: function () {
			var leftNode = this.parseConditionExpression();

			while (this.currentToken.type == 'logic') {
				var logic = this.currentToken.value;
				this.readNextToken();

				var rightNode = this.parseConditionExpression();

				// If we are chaining the same logical operator, add nodes to existing object instead of creating another one
				if (typeof leftNode.logic != 'undefined' && leftNode.logic == logic && typeof leftNode.terms != 'undefined') leftNode.terms.push(rightNode);
				else {
					var terms = [leftNode, rightNode];
					leftNode = {'logic': logic, 'terms': terms.slice(0)};
				}
			}

			return leftNode;
		},

		// Parse conditions ([word/string] [operator] [word/string])
		parseConditionExpression: function () {
			var leftNode = this.parseBaseExpression();

			if (this.currentToken.type == 'operator') {
				var operator = this.currentToken.value;
				this.readNextToken();

				// If there are 2 adjacent operators, join them with a space (exemple: IS NOT)
				if (this.currentToken.type == 'operator') {
					operator += ' ' + this.currentToken.value;
					this.readNextToken();
				}

				var rightNode = this.parseBaseExpression();

				leftNode = {'operator': operator, 'left': leftNode, 'right': rightNode};
			}

			return leftNode;
		},

		// Parse base items
		parseBaseExpression: function () {
			var astNode = "";

			// If this is a word/string, return its value
			if (this.currentToken.type == 'word' || this.currentToken.type == 'string') {
				astNode = this.currentToken.value;
				this.readNextToken();
			}
			// If this is a group, skip brackets and parse the inside
			else if (this.currentToken.type == 'group') {
				this.readNextToken();
				astNode = this.parseExpressionsRecursively();
				this.readNextToken();
			}

			return astNode;
		},
	};

	// Parse a string
	CondParser.parse = function (source) {
		return new CondParser(source).parseExpressionsRecursively();
	};

	// Generate the SQL query corresponding to an AST output by sql2ast()
	exports.ast2sql = function (ast) {
		var result = '';

		// Define subfunctions
		function select(ast) {
			if (typeof ast['SELECT'] != 'undefined') {
				return 'SELECT ' + ast['SELECT'].map(function(item) {
					return item.name;
				}).join(', ');
			}
			else return '';
		}

		function from(ast) {
			if (typeof ast['FROM'] != 'undefined') {
				var result = ' FROM ';
				var tmp = ast['FROM'].map(function (item) {
					var str = item.table;
					if (item.as !== '') str += ' AS ' + item.as;
					return str;
				});
				result += tmp.join(', ');
				return result;
			}
			else return '';
		}

		function join(ast) {
			if (typeof ast['JOIN'] != 'undefined') {
				var result = '';
				ast['JOIN'].forEach(function(item) {
					result += ' ' + item.type.toUpperCase() + ' JOIN ' + item.table;
					if (item.as !== '') result += ' AS ' + item.as;
					result += ' ON ' + cond2sql(item.cond);
				});
				return result;
			}
			else return '';
		}

		function where(ast) {
			if (typeof ast['WHERE'] != 'undefined') {
				return ' WHERE ' + cond2sql(ast['WHERE']);
			}
			else return '';
		}

		function order_by(ast) {
			if (typeof ast['ORDER BY'] != 'undefined') {
				var result = ' ORDER BY ';
				var orders = ast['ORDER BY'].map(function (item) {
					return item.column + ' ' + item.order;
				});
				result += orders.join(', ');
				return result;
			}
			else return '';
		}

		function group_by(ast) {
			if (typeof ast['GROUP BY'] != 'undefined') {
				var result = ' GROUP BY ';
				var groups = ast['GROUP BY'].map(function (item) {
					return item.column;
				});
				result += groups.join(', ');
				return result;
			}
			else return '';
		}

		function limit(ast) {
			if (typeof ast['LIMIT'] != 'undefined' && typeof ast['LIMIT'].nb != 'undefined' && parseInt(ast['LIMIT'].nb, 10) > 0) {
				var result = ' LIMIT ';
				if (typeof ast['LIMIT'].from != 'undefined' && parseInt(ast['LIMIT'].from, 10) > 1) result += ast['LIMIT'].from + ',';
				result += ast['LIMIT'].nb;
				return result;
			}
			else return '';
		}

		function insert_into(ast) {
			if (typeof ast['INSERT INTO'] != 'undefined') {
				var result = 'INSERT INTO ' + ast['INSERT INTO'].table;
				if (typeof ast['INSERT INTO'].columns != 'undefined') {
					result += ' (';
					result += ast['INSERT INTO'].columns.join(', ');
					result += ')';
				}
				return result;
			}
			else return '';
		}

		function values(ast) {
			if (typeof ast['VALUES'] != 'undefined') {
				var result = ' VALUES ';
				var vals = ast['VALUES'].map(function (item) {
					return '(' + item.join(', ') + ')';
				});
				result += vals.join(', ');
				return result;
			}
			else return '';
		}

		function delete_from(ast) {
			if (typeof ast['DELETE FROM'] != 'undefined') {
				var result = 'DELETE FROM ';
				result += ast['DELETE FROM'].map(function (item) {
					var str = item.table;
					if (item.as !== '') str += ' AS ' + item.as;
					return str;
				}).join(', ');
				return result;
			}
			else return '';
		}

		function update(ast) {
			if (typeof ast['UPDATE'] != 'undefined') {
				var result = 'UPDATE ';
				result += ast['UPDATE'].map(function (item) {
					var str = item.table;
					if (item.as !== '') str += ' AS ' + item.as;
					return str;
				}).join(', ');
				return result;
			}
			else return '';
		}

		function set(ast) {
			if (typeof ast['SET'] != 'undefined') {
				return ' SET ' + ast['SET'].map(function(item) {
					return item.expression;
				}).join(', ');
			}
			else return '';
		}


		// Check request's type
		if (typeof ast['SELECT'] != 'undefined' && typeof ast['FROM'] != 'undefined') {
			result = select(ast) + from(ast) + join(ast) + where(ast) + group_by(ast) + order_by(ast) + limit(ast);
		}
		else if (typeof ast['INSERT INTO'] != 'undefined') {
			result = insert_into(ast) + values(ast);
		}
		else if (typeof ast['UPDATE'] != 'undefined') {
			result = update(ast) + set(ast) + where(ast);
		}
		else if (typeof ast['DELETE FROM'] != 'undefined') {
			result = delete_from(ast) + where(ast);
		}
		else result = null;

		return result;
	};

	// Generate SQL from a condition AST output by sql2ast() or CondParser
	function cond2sql(cond, not_first) {
		var result = '';

		// If there is a logical operation
		if (typeof cond.logic != 'undefined') {
			result = cond.terms.map(function (item) {
				return cond2sql(item, true);
			});
			result = result.join(' ' + cond.logic + ' ');
			if (typeof not_first !== 'undefined') result = '(' + result + ')';
		}
		// If there is a condition
		else if (typeof cond.left != 'undefined') {
			result = cond.left;
			if (typeof cond.operator != 'undefined') {
				result += ' ' + cond.operator;
				if (typeof cond.right != 'undefined') {
					if (cond.operator === 'IN') {
						result += ' (' + cond.right + ')';
					}
					else {
						result += ' ' + cond.right;
					}
				}
			}
		}
		// If there is a boolean
		else result = cond;

		return result;
	}

	// Export some methods for tests
	exports.trim = trim;
	exports.protect = protect;
	exports.unprotect = unprotect;
	exports.protect_split = protect_split;
	exports.CondLexer = CondLexer;
	exports.CondParser = CondParser;

}(typeof exports === "undefined" ? (this.simpleSqlParser = {}) : exports));