define(['base/client/src/formatter'], function(Formatter) {
	describe('Formatter', function() {

		var hasDescriptionHasImageItem = {
			"provider_url": "http://www.codecademy.com",
			"description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.",
			"title": "Getting Started",
			"url": "http://www.codecademy.com",
			"thumbnail_width": 297,
			"thumbnail_url": "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png",
			"version": "1.0",
			"provider_name": "Codecademy",
			"type": "link",
			"thumbnail_height": 149
		};

		var noDescriptionHasImageItem = {
			"provider_url": "http://www.codecademy.com",
			"title": "Getting Started",
			"url": "http://www.codecademy.com",
			"thumbnail_width": 297,
			"thumbnail_url": "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png",
			"version": "1.0",
			"provider_name": "Codecademy",
			"type": "link",
			"thumbnail_height": 149
		};

		var hasDescriptionNoImageItem = {
			"provider_url": "http://www.codecademy.com",
			"description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.",
			"title": "Getting Started",
			"url": "http://www.codecademy.com",
			"version": "1.0",
			"provider_name": "Codecademy",
			"type": "link"
		};

		var hasDescriptionSmallImageItem = {
			"provider_url": "http://www.codecademy.com",
			"description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.",
			"title": "Getting Started",
			"url": "http://www.codecademy.com",
			"thumbnail_width": 97,
			"thumbnail_url": "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png",
			"version": "1.0",
			"provider_name": "Codecademy",
			"type": "link",
			"thumbnail_height": 49
		};

		var noDescriptionNoImageItem = {
			"provider_url": "http://www.codecademy.com",
			"title": "Getting Started",
			"url": "http://www.codecademy.com",
			"version": "1.0",
			"provider_name": "Codecademy",
			"type": "link"
		};

		it('can be instantiated', function() {
			var f = new Formatter();
			expect(f).to.be.ok();
		});

		it('finds image and description in items with both', function() {
			var f = new Formatter();
			var contents = f.getItemContent(hasDescriptionHasImageItem);
			expect(contents.image).to.eql({
				height: 149,
				width: 297,
				url: "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png"
			});
			expect(contents.description).to.eql({
				text: "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends."
			});
		});

		it('finds image in items with image', function() {
			var f = new Formatter();
			var contents = f.getItemContent(noDescriptionHasImageItem);
			expect(contents.image).to.eql({
				height: 149,
				width: 297,
				url: "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png"
			});
			expect(contents.description).to.be(undefined);
		});

		it('finds description in items with description', function() {
			var f = new Formatter();
			var contents = f.getItemContent(hasDescriptionNoImageItem);
			expect(contents.image).to.be(undefined);
			expect(contents.description).to.eql({
				text: "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends."
			});
		});

		it('finds description with small image in items with description and small image', function() {
			var f = new Formatter();
			var contents = f.getItemContent(hasDescriptionSmallImageItem);
			expect(contents.image).to.be(undefined);
			expect(contents.description).to.eql({
				text: "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.",
				image: {
					height: 49,
					width: 97,
					url: "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png"
				}
			});
		});

		it('does not find description or image in items without those', function() {
			var f = new Formatter();
			var contents = f.getItemContent(noDescriptionNoImageItem);
			expect(contents.image).to.be(undefined);
			expect(contents.description).to.be(undefined);
		});


	});
});