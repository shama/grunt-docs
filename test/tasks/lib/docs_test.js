/*
 * grunt-docs test
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var path = require('path');
var docs = require('../../../tasks/lib/docs');

exports.docs = {
  docpad: function(test) {
    test.expect(1);
    docs.docpad([
      'test/fixtures/testdocs/layout.html.jade',
      'test/fixtures/testdocs/one.html.md',
      'test/fixtures/testdocs/sub/three.html.md'
    ], {}, function(result) {
      var expected = {};
      Object.keys(result).forEach(function(file) {
        result[file] = result[file].replace(/\s+/g, '');
      });
      expected['test/fixtures/testdocs/layout.html.jade'] = '<header>Docs!</header><ul><li>One</li><li>Two</li></ul>';
      expected['test/fixtures/testdocs/one.html.md'] = '<h1>DocOne</h1><p>YoYoYo</p>';
      expected['test/fixtures/testdocs/sub/three.html.md'] = '<h2>Three</h2>';
      test.deepEqual(result, expected);
      test.done();
    });
  },
  docpad_single: function(test) {
    test.expect(1);
    docs.docpad('test/fixtures/testdocs2/test.html.md', {}, function(result) {
      test.deepEqual(result, {'test/fixtures/testdocs2/test.html.md': '<h1>Test</h1>\n'});
      test.done();
    });
  },
  findbase: function(test) {
    test.expect(3);

    var result = docs.findBase('fixtures/output/**/*');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    result = docs.findBase('fixtures/output/*');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    result = docs.findBase('fixtures/output/test.md');
    test.deepEqual(result.split(path.sep), ['fixtures', 'output', '']);

    test.done();
  }
};