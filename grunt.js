module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  grunt.file.mkdir('test/fixtures/output/');

  grunt.initConfig({
    clean: ['test/fixtures/output/*'],
    docs: {
      www: {
        src: ['test/fixtures/testdocs/**/*', 'test/fixtures/testdocs2/test.html.md'],
        dest: 'test/fixtures/output/'
      }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
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
        es5: true
      },
      globals: {}
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'lint clean docs test clean');
};
