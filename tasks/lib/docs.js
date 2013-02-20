/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var docpad = require('docpad');
var path = require('path');

var _ = grunt.util._;
var async = grunt.util.async;

var docs = module.exports = {};

// Guesses a destination given patterns
docs.guessBasePath = function(file, patterns) {
  var out = false;
  patterns.forEach(function(pattern) {
    var base = docs.findBase(pattern);
    if (file.substr(0, base.length) === base) {
      out = file.replace(base, '');
    }
  });
  return docs.resolveExt(out || path.basename(file));
};

// Guesses a base path from a pattern
docs.findBase = function(file) {
  if (file.indexOf('*') !== -1) {
    return file.substr(0, file.indexOf('*'));
  } else {
    return path.dirname(file) + path.sep;
  }
};

// Changes .html.md -> .html
docs.resolveExt = function(file) {
  return file.substr(0, file.lastIndexOf(path.extname(file)));
};

// Print error
docs.docpadError = function(e) {
  var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
  grunt.log.error(e.filename + ': ' + pos + ' ' + e.message);
  grunt.fail.warn("Error compiling with docpad.", 1);
};

// Run docpad
docs.docpad = function(files, docpadConfig, callback) {
  docpad.createInstance(docpadConfig, function(err, inst) {
    if (err) {
      docs.docpadError(err);
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
      if (grunt.file.isDir(file)) {
        return next();
      }
      inst.action('render', options, function(err, result) {
        if (err) {
          docs.docpadError(err);
        }
        output[file] = result;

        next();
      });
    }, function() {
      callback(output);
    });

  });
};
