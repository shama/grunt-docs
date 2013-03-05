module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    docs: {
      srcPath: 'example/src/',
      outPath: 'example/out/',
    },
    jshint: {
      files: ['Gruntfile.js', 'tasks/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['jshint', 'docs']);
};
