module.exports = function(grunt) {
  'use strict';

  grunt.file.mkdir('test/fixtures/output/');

  grunt.initConfig({
    clean: ['test/fixtures/output/*'],
    docs: {
      www: {
        src: ['test/fixtures/testdocs/**/*', 'test/fixtures/testdocs2/test.html.md'],
        dest: 'test/fixtures/output/'
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'clean', 'docs', 'nodeunit', 'clean']);
};
