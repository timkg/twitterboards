(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');

	exports.compileModel = function () {

		if (mongoose.models.LinkModel) { return mongoose.models.LinkModel; }

		var linkFormat = {
			"url": { type: String, required: true, unique: true },
			"_embedlyExtract": { type: mongoose.Schema.Types.ObjectId, ref: 'EmbedlyExtract' },
			"_tweets": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
			"date_added": Date
		};

		var LinkModel = mongoose.model('Link', mongoose.Schema(linkFormat));

		LinkModel.findOrCreate = function(query, callback) {
			LinkModel.findOne(query, function(err, link) {
				if (err) { callback(err, null); }
				if (link) {
					callback(null, link); // first arg is the error object
					return link;
				}
				if (!link) {
					if (!query.url) {
						callback(new Error('LinkModel.findOrCreate requires object literal with url as argument'), null);
					}
					LinkModel.create({url: query.url, date_added: Date.now(), _tweets: []}, function(err, link) {
						if (err) {
							callback(err, null);
						}
						callback(null, link); // first arg is the error object
					});
				}
			});
		};

		mongoose.models.LinkModel = LinkModel;
		return LinkModel;
	};
} ());