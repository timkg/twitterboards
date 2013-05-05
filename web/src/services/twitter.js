(function() {
	/**/
	"use strict";

	var baserequest = require('./baserequest');

	// API version = 1.0
	var TWITTER_SEARCH_BASE_URL = 'http://search.twitter.com/search.json';
	var TWITTER_SEARCH_PARAMS = '&filter:links&include_entities=1';

	exports.searchTweetsWithUrlsAbout = function(searchTerm, callback, next_page) {
		var url = TWITTER_SEARCH_BASE_URL;
		if( !next_page ) {
			url += '?q=' + searchTerm + TWITTER_SEARCH_PARAMS;
		} else {
			url += next_page;
		}

		baserequest.httpget(url, function(response) {
			if (typeof response === 'string') { response = JSON.parse(response); }
			callback(response);
		});
	};

}());