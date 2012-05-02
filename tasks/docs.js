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
      if (path.basename(filepath).substr(0, 1) === '_') {
        return;
      }
      yamyam.parse(grunt.file.read(filepath), function(err, html) {
        blocks.push(html);
      });
    });
    if (this.data.layout !== undefined) {
      var f = require('jade').compile(grunt.file.read(this.data.layout), {
        filename: dest,
        client: false,
        compileDebug: false
      });
      grunt.file.write(dest, f({blocks:blocks}));
    } else {
      grunt.file.write(dest, blocks.join("\n"));
    }
    grunt.log.writeln('File ' + dest + ' created.');
  });
};
