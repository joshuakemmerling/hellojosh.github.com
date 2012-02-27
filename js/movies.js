var tmpl = '{{#movies}}<li class="{{seen}}"><h2><strong>{{title}}</strong></h2><span class="stars">{{#stars_output}}{{stars}}{{/stars_output}}{{release}}</span></li>{{/movies}}';
var data = {
	"stars_output": function () {
		return function (text, render) {
			text = render(text);
			return stars(text);
		}
	},
	movies: [
		{
			"title": "Act of Valor",
			"stars": 3.5,
			"seen": "seen whattosee"
		},
		{
			"title": "The Hunger Games",
			"release": "March 23, 2012",
			"seen": "wanttosee"
		}
	]
};
var html = Mustache.to_html(tmpl, data);

$(movies);

function movies() {
	$('#movies').append(html).find('li:odd').addClass('odd');
}

function stars(star_count) {
	if (star_count === '') return '';
	
	var full_star = Math.floor(star_count);
	var half_star = Math.ceil(star_count % 1);
	var empty_star = 5 - Math.ceil(star_count);
	var html = '';

	for (var i = 0; i < full_star; i++) {
		html += '<span class="star full">&#9733;</span>';
	}

	for (var i = 0; i < half_star; i++) {
		html += '<span class="star"><span class="half left"><span>&#9733;</span></span><span class="half right"><span>&#9734;</span></span></span>';
	}

	for (var i = 0; i < empty_star; i++) {
		html += '<span class="star empty">&#9734;</span>';
	}
	
	return html;
}