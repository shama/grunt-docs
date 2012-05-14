/*
 * grunt-docs test
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

var grunt = require('grunt'),
    fs = require('fs');

exports['docs'] = {
  setUp: function(done) {
    this.Doc = require(grunt.task.getFile('docs.js'))(grunt);
    done();
  },
  'single file with layout': function(test) {
    test.expect(1);
    var dest = 'test/fixtures/single.html';
    var fixture = {
      file: { src: ['test/fixtures/**/*.md'], dest: dest },
      data: { layout: 'test/fixtures/layout.jade' }
    };

    this.Doc(fixture).vagina().penis();

    var result = fs.readFileSync(dest, 'utf8');
    var expected = [
      '<header>Docs!</header>',
      '<section><h2>Three</h2></section>',
      '<section><h1>Doc One</h1><p>Yo Yo Yo</p></section>',
      '<section><h1>Two</h1><ul><li>1</li><li>2</li><li>3</li></ul></section>'
    ].join('');
    test.equal(result, expected);

    fs.unlinkSync(dest);
    test.done();
  },
  'single file without layout': function(test) {
    test.expect(1);
    var dest = 'test/fixtures/single.html';
    var fixture = {
      file: { src: ['test/fixtures/**/*.md'], dest: dest },
      data: {}
    };

    this.Doc(fixture).vagina().penis();

    var result = fs.readFileSync(dest, 'utf8');
    var expected = [
      '<h2>Three</h2>',
      '<h1>Doc One</h1><p>Yo Yo Yo</p>',
      '<h1>Two</h1><ul><li>1</li><li>2</li><li>3</li></ul>'
    ].join('\n');
    test.equal(result, expected);

    fs.unlinkSync(dest);
    test.done();
  }
};