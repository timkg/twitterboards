(function () {
	/**/
	"use strict";

	// TODO - check compatibility of zepto with backbone and masonry.
	// var dollar = ('__proto__' in {} ? './vendors/zepto' : './vendors/jquery');
	define([
		'jquery'
		, 'foundation'
		, 'topbar'
	], function() {
		// init foundation right away to guarantee basic nav functionality (especially topbar
		// ----------------------------------------------------------------------------------
		$(document).foundation();

		// ui wrapper object which contains $ and some utility functions
		// -------------------------------------------------------------
		var ui = {};
		ui.$ = $;

		// get name of all modules (DOM elms with data-module attribute) on current page
		// -----------------------------------------------------------------------------
		ui.getModules = function() {
			var modules = _.map($('[data-module]'), function(elm) {
				return $(elm).attr('data-module');
			});
			return modules;
		};

		return ui;
	});

}());