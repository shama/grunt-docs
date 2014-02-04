# grunt-docs

A grunt plugin to compile using [DocPad](http://docpad.org/).

## Getting Started

Install this grunt plugin next to your project's
[Gruntfile.js gruntfile][http://gruntjs.com/getting-started] with:
`npm install grunt-docs`

Then add this line to your project's `Grunfile.js` gruntfile:

```js
grunt.loadNpmTasks('grunt-docs');
```

## Documentation

This plugin provides the task: `docs`. You can pass in your
[DocPad configuration](http://docpad.org/docs/config) directly:

```js
docs: {
  srcPath: 'src/',
  outPath: 'build/',
}
```

Please view the
[example](https://github.com/shama/grunt-docs/tree/master/example) for an
example folder structure for converting file types.

## Contributing

Please use the issue tracker and pull requests.

## Release History

* 0.7.0 Update docpad to latest v6.63.3.
* 0.6.0 Update docpad to latest v6.46.3.
* 0.5.1 Update docpad to latest.
* 0.5.0 Now just a wrapper for docpad generate.
* 0.4.0 Support for Grunt v0.4. Update docpad version.
* 0.3.1 Ability to set DocPad config with `options`.
* 0.3.0 Update to DocPad 6.6.6. Refactor for migration to Grunt 0.4.
* 0.2.0 Convert to use DocPad
* 0.1.1 More testable structure of module
* 0.1.0 Initial release

## License

Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
