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

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('vendorize', 'A Node Based Task to split a given CSS file into Vendor Specific versions to reduce prefix bloating.', function() {
		// dependencies
		var vendorizer = require('../src/Vendorizer.js');

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', '
		});

		this.files.forEach(function(file) {

			var contents = file.src.filter(function(filepath) {
					// Remove nonexistent files (it's up to you to filter or warn here).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					} else {
						return true;
					}
				}).map(function(filepath) {
					// Read and return the file's source.
					return grunt.file.read(filepath);
				}).join('\n');

			vendorizer.vendorize(contents, file.dest);

		});

	});

};
