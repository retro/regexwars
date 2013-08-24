requirejs.config({
	paths: {
		can      : 'bower_components/canjs/amd/can',
		jquery   : 'bower_components/jquery/jquery',
		mustache : 'bower_components/require-can-renderers/lib/mustache',
		ejs      : 'bower_components/require-can-renderers/lib/ejs'
	},
	packages : [{
		name : 'css',
		location: 'bower_components/require-css',
		main : 'css'
	},
	{
		name : 'less',
		location: 'bower_components/require-less',
		main : 'less'
	}]
});