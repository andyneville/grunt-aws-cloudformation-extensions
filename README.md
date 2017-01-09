# grunt-aws-cloudformation-extensions

[![NPM version](https://img.shields.io/npm/v/grunt-aws-cloudformation-extensions.svg)](https://www.npmjs.com/package/grunt-aws-cloudformation-extensions)
[![Open Issues](https://img.shields.io/github/issues/andyneville/grunt-aws-cloudformation-extensions.svg)](https://github.com/andyneville/grunt-aws-cloudformation-extensions/issues)
[![Build Status](https://img.shields.io/travis/andyneville/grunt-aws-cloudformation-extensions.svg)](https://travis-ci.org/andyneville/grunt-aws-cloudformation-extensions)

> A grunt task to use Josh Balfour's [cloudformation-extensions](https://github.com/joshbalfour/cloudformation-extensions) library to manipulate
[AWS CloudFormation](http://aws.amazon.com/cloudformation/) templates.

## Installation

This is a task for the [Grunt](http://gruntjs.com/) tool, if you are not familiar please start with the [Getting Started](http://gruntjs.com/getting-started) guide to learn the basics for creating your [Gruntfile](http://gruntjs.com/sample-gruntfile) and how to use Grunt plugins.

To add the CloudFormation Extensions task to your project, first install the plug-in to your project with the command:

```bash
$ npm install grunt-aws-cloudformation-extensions --save-dev
```

and then add the following line to your Gruntfile:

```js
grunt.loadNpmTasks('grunt-aws-cloudformation-extensions');
```

### Overview

This plugin contains a single task called `cfnex`. It is a [multi-task](http://gruntjs.com/configuring-tasks#task-configuration-and-targets),
meaning that you can define multiple targets in case there are multiple templates you wish to transform.

Each multi-task target should define a source (input) file and a destination (output) file.

### Example
```javascript
'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-aws-cloudformation-extensions');

  grunt.initConfig({
    cfnex: {
      options: {
        extensions: path.resolve(__dirname, 'extensions') // only if you define your own
      },
      myTemplate: {
        src: ['templates/Input.template'],
        dest: 'templates/Output.template'
      }
    }
  });

  grunt.registerTask("default", ["cfnex:myTemplate"]);
};
```
In this example, you could use the command `grunt` (or `grunt cfnex:myTemplate`) to process the template. For a
working example, see the test defined in this project's [Gruntfile.js](./blob/master/Gruntfile.js).

### Options

The Cloudformation Extensions task current offers a single option:

##### options.extensions
Type: `String`
Default value: `the path to an extensions folder where you can define additional extensions`

This folder can define additional extensions, as demonstrated by the [cloudformation-extensions](https://github.com/joshbalfour/cloudformation-extensions) 
project's [original extensions](https://github.com/joshbalfour/cloudformation-extensions/tree/master/extensions).

### Note

I found a minor issue in the [cloudformation-extensions](https://github.com/joshbalfour/cloudformation-extensions) 
implementation of the built-in `include-file` extension, that prevents `<%cfnex` tags from working properly. I have
submitted a [pull request](https://github.com/joshbalfour/cloudformation-extensions/pull/24) for this
[issue](https://github.com/joshbalfour/cloudformation-extensions/issues/23), and in the interim have included a corrected
version locally within this project labeled `include-file2`. Once the PR is merged I intend to remove the
`include-file2` extension.
