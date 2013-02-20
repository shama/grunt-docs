/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var async = grunt.util.async;
  var docs = require('./lib/docs');
  var path = require('path');

  grunt.registerMultiTask('docs', 'Produce docs with docpad', function() {
    var options = this.options();

    grunt.verbose.writeflags(options, 'Options');

    var done = this.async();

    async.forEachSeries(this.files, function(file, next) {
      file.dest = path.normalize(file.dest);
      if (typeof file.src === 'string') {
        file.src = [file.src];
      }
      var srcFiles = grunt.file.expand(file.src);

      if (srcFiles.length === 0) {
        grunt.log.writeln('Unable to compile; no valid source files were found.');
        return next();
      }

      docs.docpad(srcFiles, options, function(results) {
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
