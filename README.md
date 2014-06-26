# DoggyFrame

A front-end workflow and basic framework based on [Grunt](http://gruntjs.com/) support most browser. See demo.html for demo.

## Quick Start

1. install ruby if you don't have it.
2. `fork` and `git clone` or download as zip.
3. `unzip` and `cd`.
3. `npm install`.
4. install livereload browser extension
    - [safari](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
    - [chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
    - [firefox](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)
5. `grunt watch` and happy coding.

## Grunt Tasks

- HTMLmin
- HTMLhint
- Jsmerge
- Uglify
- JShint
- Karma
- Sass
- Sprite
- Imagemin
- Watch

## JS lib

- Autohide
- Cookie
- Dialog
- Dropdown
- Lazyload
- LoadQueue
- Placeholder
- Position
- Select
- Smoothscroll
- Tab
- Throttle
- Tooltip
- UA

## Update

- 2014.6.26
    - Add test file: `smoothscroll.js`
    - Add grunt task `jshint:grunt` for grunt config files
    - Add grunt watch task `grunt` and `image`
    - Add html5 tags support for `demo.html`
- 2014.6.25
    - Add js test: grunt + karma + mocha + sinon + chai
