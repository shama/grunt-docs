/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  grunt.registerMultiTask('docs', 'Build docs with YamYam', function() {
    var yamyam = require('YamYam'),
      path = require('path'),
      dest = this.file.dest,
      blocks = [],
      files = grunt.file.expandFiles(this.file.src);
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
    if (blocks.length > 0) {
      if (this.data.layout !== undefined) {
        var layout = require('jade').compile(grunt.file.read(this.data.layout), {
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
        // Output simple joined files
        grunt.file.write(dest, blocks.join("\n"));
        grunt.log.writeln('File ' + dest + ' created.');
      }
    }
  });
};
