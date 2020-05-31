# grunt-ng-html2js v0.2.0 ![](https://ga-beacon.appspot.com/UA-60632926-1/grunt-ng-html2js/readme?pixel)

[![Build Status](https://travis-ci.org/itsnydell/grunt-ng-html2js.svg?branch=master)](https://travis-ci.org/itsnydell/grunt-ng-html2js)
[![Build status](https://ci.appveyor.com/api/projects/status/29afqicugoqx3xr4?svg=true)](https://ci.appveyor.com/project/itsnydell/grunt-ng-html2js)
[![Dependency Status](https://gemnasium.com/itsnydell/grunt-ng-html2js.svg)](https://gemnasium.com/itsnydell/grunt-ng-html2js)

Grunt wrapper for ng-html2js that turns your Angular templates into JavaScript and puts them in modules.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ng-html2js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ng-html2js');
```

## The "ng_html2js" task

### Overview
In your project's Gruntfile, add a section named `ng_html2js` to the data object passed into `grunt.initConfig()`.

```JavaScript
grunt.initConfig({
  ng_html2js: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.moduleName
Type: `String`
Default value: `null`

If you specify moduleName, the template will belong to that module.
If you don't specify moduleName, inputFile will be the name of the module.

#### options.moduleVar
Type: `String`
Default value: `'module'`

moduleVar is to be used with moduleName. If moduleVar is provided, it will pass moduleVar to immediately-invoked function expression (IIFE). Its default value is "module".

#### options.output
Type: `String`
Default value: `'verbose'`
Available values: `'verbose'`, `'simple'`, `'none'`

If you have a lot of templates to be compiled, your grunt output might get pretty crazy. You can hide every file compile message by using `'simple'` or hide all output from the task with `'none'`

#### options.missingFiles
Type: `String`
Default value: `'warn'`
Available values: `'ignore'`, `'warn'`, `'fail'`

Tell grunt what to do if the file is missing. We default to just put a warning in console that the file is missing, but you can also have it ignored if you really don't care much, or fail if you want grunt to stop if the file is missing.

### Usage Examples

#### Default Options
In this example, the default options are used and will take src/template.html and compile it to dest/template.js using the default module name 'module'

```JavaScript
grunt.initConfig({
    ng_html2js: {
        files: {
            'dest/template.js': 'src/template.html',
        },
    },
});
```

the compiled file will be:

```JavaScript
var module = angular.module('src/template.html', []);
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/template.html',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>');
}]);
```

#### Custom Options and folder of files to compile
In this example, custom options are used to define the module name and module vars. It also takes in a group of files to compile into a folder of your choice.

```JavaScript
grunt.initConfig({
    ng_html2js: {
        options: {
            moduleName: 'testApp',
            moduleVar: 'ngModule'
        },
        files: [{
            expand: true,
            cwd: 'src',
            src: ['*.html'],
            dest: 'dest',
            ext: '.js'
        }]
    },
});
```

will output templates in this format:

```JavaScript
var ngModule;
try {
  ngModule = angular.module('testApp');
} catch (e) {
  ngModule = angular.module('testApp', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('src/template.html',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>');
}]);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- v0.2.0 - Added output verbosity and missingFile warning options
- v0.1.2 - Misc readme and package.json tweaks, no functionality updates.
- v0.1.1 - Misc package tweaks, no functionality updates.
- v0.1.0 - First commit
