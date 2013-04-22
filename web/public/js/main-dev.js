(function() {
	/*global require*/
	"use strict";

	require.config({
		paths: {
			'jquery': './vendors/jquery',
			'lo-dash': './vendors/lo-dash',
			'backbone': './vendors/backbone',
			'text': 'vendors/text',
			'statemachine': './vendors/state-machine',
			'q': './vendors/q',
			'masonry': './vendors/jquery.masonry',
			'imagesLoaded': './vendors/jquery.imagesLoaded',
			'visible': './vendors/jquery.visible'
		},
		shim: {
			'backbone': {
				deps: ['lo-dash', 'jquery'],
				exports: 'Backbone'
			},
			'masonry': ['jquery'],
			'visible': ['jquery']
		}
	});

	require(['./app'], function(App) {

		App.initQueue('links');
		App.initDisplayer('.itemholder');

		window.App = App;

	});
}());