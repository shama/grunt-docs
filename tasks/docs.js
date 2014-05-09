/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var docpad = require('docpad');

  grunt.registerTask('docs', 'Compile with DocPad', function() {
    var done = this.async();
    var config = grunt.config(this.name || 'docs');
    var srcPath = config.srcPath || 'src';

    // To allow paths config to use patterns
    Object.keys(config).forEach(function(key) {
      if (key.slice(-5) === 'Paths') {
        var options = {};

        switch (key) {
          case 'documentsPaths':
          case 'filesPaths':
          case 'layoutsPaths':
            options.cwd = srcPath;
            break;
        }

        config[key] = grunt.file.expand(options, config[key]);
      }
    });

    docpad.createInstance(config, function(err, inst) {
      inst.action('generate', function(err) {
        if (err) { return grunt.warn(err); }
        done();
      });
    });
  });

};
