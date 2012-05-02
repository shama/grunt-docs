# grunt-docs

Build docs with grunt using YamYam (markdown) and Jade (for layouts).

## Getting Started

Install this grunt plugin next to your project's
[grunt.js gruntfile][getting_started] with: `npm install grunt-docs`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-docs');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

This plugin provides the task: `docs`. Here is an example config block:

```javascript
docs: {
  html: {
    layout: 'docs/api/layout.jade',
    src: ['docs/api/*.md'],
    dest: 'docs/index.html'
  }
}
```

This will compile all the markdown files (without a `_` prepended) from the
`docs/api/` folder. Then use `layout.jade` to construct the final
`docs/index.html`. If no layout is specified then all the compiled markdown
files will joined with a newline.

## Contributing

Please use the issue tracker and pull requests.

## Future Plans

* Allow other templating langs
* Hooks for userland formatting
* JSON output

## Release History

* 0.1.0 Initial release

## License

Copyright (c) 2012 Kyle Robinson Young
Licensed under the MIT license.
