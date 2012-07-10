/*
 * grunt-docs test
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

var grunt = require('grunt');
var path = require('path');

exports['docs'] = {
  setUp: function(done) {
    done();
  },
  'docpad': function(test) {
    test.expect(1);

    grunt.helper('docpad', [
      'test/fixtures/testdocs/layout.html.jade',
      'test/fixtures/testdocs/one.html.md',
      'test/fixtures/testdocs/sub/three.html.md'
    ], {}, function(result) {
      var expected = {};
      expected['test/fixtures/testdocs/layout.html.jade'] = '<header>Docs!</header><ul><li>One</li><li>Two</li></ul>';
      expected['test/fixtures/testdocs/one.html.md'] = '<h1>Doc One</h1>\n\n<p>Yo Yo Yo</p>';
      expected['test/fixtures/testdocs/sub/three.html.md'] = '<h2>Three</h2>';
      test.deepEqual(result, expected);
      test.done();
    });
  },
  'docpad single': function(test) {
    test.expect(1);
    grunt.helper('docpad', 'test/fixtures/testdocs2/test.html.md', {}, function(result) {
      test.deepEqual(result, {'test/fixtures/testdocs2/test.html.md': '<h1>Test</h1>'});
      test.done();
    });
  },
  'docs-findbase': function(test) {
    test.expect(3);

    var result = grunt.helper('_docs-findbase', 'fixtures/output/**/*');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    result = grunt.helper('_docs-findbase', 'fixtures/output/*');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    result = grunt.helper('_docs-findbase', 'fixtures/output/test.md');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    test.done();
  }
};