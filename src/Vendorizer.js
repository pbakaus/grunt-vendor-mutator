/*
 *
 * grunt-vendor-mutator
 * http://github.com/zynga/grunt-vendor-mutator
 *
 * Copyright 2013, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/grunt-vendor-mutator/master/LICENSE-MIT
 *
 */

var fs = require('fs');

function saveFile(file, content) {
	console.log('File ' + file + ' created.');
	fs.writeFileSync(file, content);
};

function clean (newFile) {
	newFile = newFile.replace(/;+/g, ';');
	newFile = newFile.replace(/background:;/g, '');
	newFile = newFile.replace(/background-image:;/g, '');

	return newFile;
};

exports.vendorize = function(cssContent, dest) {

	var webkit = cssContent.replace(/@-(?:moz|ms|o)-keyframes\s+\w+\s*\{\s*(\d+%\{[^}]+\}\s*)+\}/g, '');
		webkit = webkit.replace(/-(ms|moz|o)-(?!keyframes)[^;}]+/g, '');
		webkit = clean(webkit);

	var trident = cssContent.replace(/@-(moz|webkit|o)-keyframes\s+\w+\s*\{\s*(\d+%\{[^}]+\}\s*)+\}/g, '');
		trident = trident.replace(/-(webkit|moz|o)-(?!keyframes)[^;}]+/g, '');
		trident = clean(trident);

	var gecko = cssContent.replace(/@-(ms|webkit|o)-keyframes\s+\w+\s*\{\s*(\d+%\{[^}]+\}\s*)+\}/g, '');
		gecko = gecko.replace(/-(webkit|ms|o)-(?!keyframes)[^;}]+/g, '');
		gecko = clean(gecko);

	saveFile(dest.replace('{vendor}', 'webkit'), webkit);
	saveFile(dest.replace('{vendor}', 'trident'), trident);
	saveFile(dest.replace('{vendor}', 'gecko'), gecko);

};
