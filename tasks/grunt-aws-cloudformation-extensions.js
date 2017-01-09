'use strict';

const path = require('path');
const _ = require("lodash");
const cfnex = require("cloudformation-extensions");

module.exports = function(grunt) {

	grunt.registerMultiTask('cfnex', 'Performs AWS CloudFormation Extension tasks', function() {
		var options = this.options({});
		var done = this.async();

		var data = _.defaults(this.data, options);
		var self = this;

		var promises = [];

		this.files.forEach(function(file) {
			var firstFile=null;
			var input = file.src.filter(function(filepath) {
				grunt.verbose.writeln("Checking source file path " + filepath);

				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					grunt.verbose.writeln("Source file path " + filepath + " exists");
					return true;
				}
			}).map(function(filepath) {
				if (!firstFile) {
					firstFile = filepath;
				}
				// Read and return the file's source.
				grunt.verbose.writeln("Reading source file " + filepath);
				return grunt.file.read(filepath);
			}).join('\n');

			var context = {
				cwd: data.cwd || path.resolve(firstFile, '..'),
				config: {
					extensionsDirectory: data.extensions || path.resolve(__dirname, '..', 'extensions')
				}
			};

			grunt.verbose.writeln("Parsing input to JSON");
			var inputJson = JSON.parse(input);

			grunt.verbose.writeln("Parsing template with context " + JSON.stringify(context));
			promises.push(new Promise(function(complete){
				cfnex.parseCfnex(inputJson, context).then(function(output){
					// Write joined contents to destination filepath.
					grunt.verbose.writeln("Writing destination file " + file.dest);
					grunt.file.write(file.dest, JSON.stringify(output, null, 2));
					// Print a success message.
					grunt.log.writeln('File "' + file.dest + '" created.');
					complete();
				});
			}));
		});
		Promise.all(promises).then(function(){
			done();
		});
	});
};
