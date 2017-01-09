'use strict';

const assert = require('assert');
const path = require('path');

module.exports = function(grunt) {
	grunt.initConfig({
		cfnex: {
			options: {
				extensions: path.resolve(__dirname, 'extensions')
			},
			test: {
				src: ['test/TestInput.template'],
				dest: 'test/TestOutput.template'
			}
		},
		validate: {
			test: {
				actual: 'test/TestOutput.template',
				expected: 'test/TestOutputExpected.template'
			}
		}
	});

	grunt.loadTasks('./tasks');

	grunt.registerMultiTask("validate", function(){

		var actual = grunt.file.read(this.data.actual);
		var expected = grunt.file.read(this.data.expected);
		assert.equal(actual,expected);
	});

	grunt.registerTask("test", ["cfnex:test", "validate:test"]);
};