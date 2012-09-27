/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var async = grunt.util.async;
  var docs = require('./lib/docs').init(grunt);
  var path = require('path');

  grunt.registerMultiTask('docs', 'Produce docs with docpad', function() {
    var helpers = require('grunt-contrib-lib').init(grunt);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var done = this.async();

    async.forEachSeries(this.files, function(file, next) {
      file.dest = path.normalize(file.dest);
      if (typeof file.src === 'string') {
        file.src = [file.src];
      }
      var srcFiles = grunt.file.expandFiles(file.src);

      if (srcFiles.length === 0) {
        grunt.log.writeln('Unable to compile; no valid source files were found.');
        return next();
      }

      docs.docpad(srcFiles, {}, function(results) {
        grunt.util._.each(results, function(data, filepath) {
          var destPath = file.dest + docs.guessBasePath(filepath, file.src);
          grunt.file.write(destPath, data);
          grunt.log.ok("File '" + destPath + "' created.");
        });
        next();
      });

    }, done);

  });

};
