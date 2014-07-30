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
- HTMLhintplus
- Jsmerge
- JShint
- Karma
- Sass
- Sprite
- Imagemin
- Watch

## JS lib

- Autohide
- Checkbox
- Cookie
- DataApi
- Dialog
- Dropdown
- Lazyload
- Placeholder
- Position
- Radio
- Select
- Smoothscroll
- Tab
- Throttle
- Tooltip
- UA

## Update

- 2014.7.16
    - Add fixedWidth config for dropdown
    - Add text case for fixedWidth
    - Select support disable
- 2014.7.15
    - Add switch
- 2014.7.11
    - Bugfix
    - Add autohide test case
- 2014.7.10
    - Auto add css style for checkbox label and radio label
    - Fix autohide
    - Add iconfont
- 2014.7.9
    - Add checkbox
    - Add radio
    - Add sourceMap for sass and js
- 2014.7.3
    - Use karma-jquery-new instead of jquery file
    - Use requestAnimationFrame instead of setTimeout for jQuery
- 2014.7.2
    - Button add new style `hollow`
    - Tab add tip
- 2014.6.30
    - Add test file: `tooltip.js`, `dialog.js`, `placeholder.js`
    - Increase coverage:
        - Statements: 56.47% => 89.22%
        - Branches: 40.59% => 78.43%
        - Functions: 49.09% => 85.71%
    - Bugfix: `pngfix.js` not work
- 2014.6.27
    - Bugfix: dataApi reload bug
    - Add test file: `tab.js`, `data-api.js`, `select.js`, `throttle.js`, `lazyload.js`, `position.js`
    - Add code coverage check
- 2014.6.26
    - Replace loadQueue width `$().ready()`
    - Split dataApi boot to each file
    - Add test file: `smoothscroll.js`
    - Add grunt task `jshint:grunt` for grunt config files
    - Add grunt watch task `grunt` and `image`
    - Add html5 tags support for `demo.html`
- 2014.6.25
    - Add js test: grunt + karma + mocha + sinon + chai
