/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var path = require('path'),
      blocks = [];

  /**
   * Doc constructor
   */
  function Doc(cfg) {
    this.cfg = grunt.utils._.defaults(cfg, {
      file: grunt.task.current.file,
      data: {}
    });
    if (this instanceof Doc) {
      return this.Doc;
    } else {
      return new Doc(cfg);
    }
  }

  /**
   * Put markdown into this
   */
  Doc.prototype.input = function() {
    var yamyam = require('YamYam'),
        files = grunt.file.expandFiles(this.cfg.file.src);
    files.forEach(function(filepath) {
      // Ignore _ prepended files
      if (path.basename(filepath).substr(0, 1) === '_') {
        return;
      }
      // Markdown -> HTML
      yamyam.parse(grunt.file.read(filepath), function(err, html) {
        blocks.push({data: html, file: filepath});
      });
    });
    return this;
  };

  /**
   * HTML comes out of this
   */
  Doc.prototype.output = function() {
    var dest = this.cfg.file.dest;
    if (blocks.length > 0) {
      if (this.cfg.data.layout !== undefined) {
        var layout = require('jade').compile(grunt.file.read(this.cfg.data.layout), {
          filename: dest,
          client: false,
          compileDebug: false
        });
        if (dest.substr(-1, 1) === '*') {
          // Output multiple layout files
          blocks.forEach(function(block) {
            var name = path.basename(block.file, '.md'),
                dir = path.dirname(dest),
                html = layout({blocks:[block]}),
                filepath = path.normalize(dir + '/' + name + '.html');
            grunt.file.write(filepath, html);
            grunt.log.writeln('File ' + filepath + ' created.');
          });
        } else {
          // Output single layout file
          grunt.file.write(dest, layout({blocks:blocks}));
          grunt.log.writeln('File ' + dest + ' created.');
        }
      } else {
        // Output simple joined files to single
        grunt.file.write(dest, grunt.utils._.pluck(blocks, 'data').join("\n"));
        grunt.log.writeln('File ' + dest + ' created.');
      }
    }
    return this;
  };

  // Register grunt task
  grunt.registerMultiTask('docs', 'Build docs with YamYam', function() {
    new Doc(this).input().output();
  });

  // Return for testing
  return Doc;
};
