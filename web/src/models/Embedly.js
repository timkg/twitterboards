var mongoose = require('mongoose');

exports.initEmbedlyModel = function () {

	var embedlyOembedFormat = {
		"provider_url": String,
		"description": String,
		"title": String,
		"url": String,
		"thumbnail_width": Number,
		"thumbnail_url": String,
		"version": String,
		"provider_name": String,
		"type": String,
		"thumbnail_height": Number
	};

	return mongoose.model('Embedly', mongoose.Schema(embedlyOembedFormat));
};