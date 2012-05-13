module.exports = function(grunt) {
  grunt.initConfig({
    docs: {
      html: {
        layout: 'test/fixtures/layout.jade',
        src: ['test/fixtures/*.md'],
        dest: 'test/fixtures/*'
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
  grunt.registerTask('default', 'lint test');
};
