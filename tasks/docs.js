/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var docpad = require('docpad');
  var path = require('path');

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var async = grunt.util.async;

  var docpadError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    grunt.log.error(e.filename + ': ' + pos + ' ' + e.message);
    grunt.fail.warn("Error compiling with docpad.", 1);
  };

  var resolveDest = function(base, file) {
    var baseParts = base.split(path.sep);
    var fileParts = file.split(path.sep);
    return _.difference(fileParts, baseParts).join(path.sep);
  };

  var resolveExt = function(file) {
    var ext = path.extname(file);
    return file.substr(0, file.lastIndexOf(ext));
  };

  grunt.registerMultiTask('docs', 'Produce docs with docpad', function() {
    var options = grunt.helper('options', this);

    var files = this.file.src;
    var dest = this.file.dest;

    var done = this.async();

    grunt.verbose.writeflags(options, "Options");

    async.forEachSeries(files, function(file, next) {
      var srcBase = grunt.helper('_docs-findbase', file);
      var srcFiles = grunt.file.expandFiles(file);

      grunt.helper('docpad', srcFiles, {}, function(result) {
        for (var resultPath in result) {
          var resultData = result[resultPath];
          var destPath = resolveExt(dest + resolveDest(srcBase, resultPath));
          grunt.file.write(destPath, resultData);
          grunt.log.writeln("File '" + destPath + "' created.");
        }
        next();
      });

    }, function() {
      done();
    });

  });

  grunt.registerHelper('docpad', function(files, docpadConfig, callback) {
    docpad.createInstance(docpadConfig, function(err, inst) {
      if (err) {
        docpadError(err);
      }

      var output = {};

      if (_.isString(files)) {
        files = [files];
      }

      async.forEachSeries(files, function(file, next) {
        var options = {
          path: file,
          renderSingleExtensions: true
        };
        inst.action('render', options, function(err, result) {
          if (err) {
            docpadError(err);
          }
          output[file] = result;

          next();
        });
      }, function() {
        callback(output);
      });

    });
  });

  grunt.registerHelper('_docs-findbase', function(file) {
    var base;
    if (file.indexOf('*') !== -1) {
      base = file.substr(0, file.indexOf('*'));
    } else {
      base = path.dirname(file) + path.sep;
    }
    return base;
  });

};
