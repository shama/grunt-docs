/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

exports.init = function(grunt) {
  'use strict';

  var exports = {};

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var docpad = require('docpad');
  var path = require('path');

  var _ = grunt.util._;
  var async = grunt.util.async;

  // Guesses a destination given patterns
  exports.guessBasePath = function(file, patterns) {
    var out = false;
    patterns.forEach(function(pattern) {
      var base = exports.findBase(pattern);
      if (file.substr(0, base.length) === base) {
        out = file.replace(base, '');
      }
    });
    return exports.resolveExt(out || path.basename(file));
  };

  // Guesses a base path from a pattern
  exports.findBase = function(file) {
    if (file.indexOf('*') !== -1) {
      return file.substr(0, file.indexOf('*'));
    } else {
      return path.dirname(file) + path.sep;
    }
  };

  // Changes .html.md -> .html
  exports.resolveExt = function(file) {
    return file.substr(0, file.lastIndexOf(path.extname(file)));
  };

  // Print error
  exports.docpadError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    grunt.log.error(e.filename + ': ' + pos + ' ' + e.message);
    grunt.fail.warn("Error compiling with docpad.", 1);
  };

  // Run docpad
  exports.docpad = function(files, docpadConfig, callback) {
    docpad.createInstance(docpadConfig, function(err, inst) {
      if (err) {
        exports.docpadError(err);
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
            exports.docpadError(err);
          }
          output[file] = result;

          next();
        });
      }, function() {
        callback(output);
      });

    });
  };

  return exports;
};