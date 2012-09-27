# grunt-docs

A grunt plugin to build docs from a variety of file types using
[DocPad](https://github.com/bevry/docpad).

## Getting Started

Install this grunt plugin next to your project's
[grunt.js gruntfile][getting_started] with: `npm install grunt-docs`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-docs');
```

[grunt.js gruntfile]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

This plugin provides the task: `docs`. Here is an example config block:

```javascript
docs: {
  www: {
    src: ['docs/api/**/*'],
    dest: 'out/'
  }
}
```

This will compile all the files within the `docs/api/` folder and sub folders.
Then output the files to the `out/` folder, duplicating the same path structure.

The conversion of your files is based on its extension. For example if I wanted
a file in markdown to be converted to html, I would name the file:
`myfile.html.md`. After the file is converted it will be named: `myfile.html`.

### DocPad

grunt-docs supports all the render
[types DocPad supports](https://github.com/bevry/docpad/wiki/Plugins). Depending
on the types you want to convert, you will need to install the additional
dependencies.

For example if you would like to convert `css/style.css.styl` you would need to
install the `docpad-plugin-stylus` module.

## Contributing

Please use the issue tracker and pull requests.

## Release History

* 0.3.1 Ability to set DocPad config with `options`.
* 0.3.0 Update to DocPad 6.6.6. Refactor for migration to Grunt 0.4.
* 0.2.0 Convert to use DocPad
* 0.1.1 More testable structure of module
* 0.1.0 Initial release

## License

Copyright (c) 2012 Kyle Robinson Young

Licensed under the MIT license.
