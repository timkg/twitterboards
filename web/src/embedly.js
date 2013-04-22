(function() {
	/*global escape*/
	"use strict";

	var http = require('http');
	var API_KEY = process.env.EMBEDLY;

	var BASE_URL = 'http://api.embed.ly/1/oembed?key=';

	exports.getOembedForListOfUrls = function(listOfUrls, callback, api_key) {
		api_key = api_key || API_KEY;
		var url = BASE_URL + api_key + '&urls=' + listOfUrlsIntoQueryParameter(listOfUrls);

		var request = http.get(url);
		request.on('response', function(response) {
			console.log('response received from ', url);
			var responseData = '';

			response.setEncoding('utf8');
			console.log('embedly returned statusCode ' + response.statusCode);

			response.on('data', function(chunk) {
				responseData += chunk;
			});

			response.on('end', function() {
				if( response.statusCode == 401 ) {
					// TODO
				}
				callback(responseData);
			});
		});
	};

	function listOfUrlsIntoQueryParameter(listOfUrls) {
		var param = '';
		for( var i = 0, len = listOfUrls.length; i < len; i++ ) {
			param += escape(listOfUrls[i]);
			if( i < len-1 ) {
				param += ',';
			}
		}

		return param;
	}
}());