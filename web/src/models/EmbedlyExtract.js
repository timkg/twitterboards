(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var LinkModel = require('./Link').compileModel();
	var Q = require('q');

	var embedlyservice = require('../services/embedly');

	exports.compileModel = function() {

		if (mongoose.models.EmbedlyExtractModel) { return mongoose.models.EmbedlyExtractModel; }

		var extractFormat = {
			original_url: { type: String, required: true },
			url: String,
			provider_name: String,
			provider_url: String,
			provider_display: String,
			favicon_url: String,
			title: String,
			description: String,
			authors: [mongoose.Schema.Types.Mixed],
			media: String,
			content: mongoose.Schema.Types.Mixed,
			keywords: mongoose.Schema.Types.Mixed,
			entities: mongoose.Schema.Types.Mixed,
			images: mongoose.Schema.Types.Mixed
		}

		var EmbedlyExtractModel = mongoose.model('EmbedlyExtract', mongoose.Schema(extractFormat));

		EmbedlyExtractModel.promiseToSaveDocument = function(json) {
			if (typeof json === 'string') { json = JSON.parse(json); }

			var deferred = Q.defer();

			if (!json.url) { deferred.reject(new Error('url not existent or not readable')); }

			EmbedlyExtractModel.create(json, function(err, embed) {
				if (err) {
					console.log(err);
					deferred.reject(new Error(err));
				}
				LinkModel.findOrCreate({ url: embed.url}, function(err, link) {
					if (err) {
						console.log(err);
						deferred.reject(new Error(err));
					}
					link._embedlyExtract = embed._id;
					link.save(function(err) {
						if (err) { deferred.reject(new Error(err)); }
						deferred.resolve(embed);
					})
				});
			});

			return deferred.promise;
		};

		EmbedlyExtractModel.saveDocuments = function(json, callback) {
			if (typeof json === 'string') { json = JSON.parse(json); }
			if (!Array.isArray(json)) { json = [json]; }

			var allOperationsAsPromises = [];
			json.forEach(function(embedValue) {
				allOperationsAsPromises.push(EmbedlyExtractModel.promiseToSaveDocument(embedValue));
			});

			Q.allResolved(allOperationsAsPromises)
				.then(function(promises) {
					var embeds = [];
					promises.forEach(function(promise) {
						if (promise.isFulfilled()) {
							embeds.push(promise.valueOf());
						} else {
							var exception = promise.valueOf().exception;
						}
					});
					callback(embeds);
				})
				.fail(function(err) {
					console.log(err);
				});
		};

		EmbedlyExtractModel.getExtractForUrls = function(listOfUrls, callback) {
			embedlyservice.getExtractForUrls(listOfUrls, function(embedlyApiResponse) {
				EmbedlyExtractModel.saveDocuments(embedlyApiResponse, callback);
			});
		};

		return mongoose.models.EmbedlyExtractModel = EmbedlyExtractModel;
	};


} ());