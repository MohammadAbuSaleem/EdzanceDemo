/*
 * grunt-ng-html2js
 * https://github.com/brandon.nydell/grunt-ng-html2js
 *
 * Copyright (c) 2015 Brandon Nydell
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var nghtml2js = require('ng-html2js');
var chalk = require('chalk');

module.exports = function(grunt) {

    grunt.registerMultiTask('ng_html2js', 'Grunt wrapper for ng-html2js', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                moduleName: null,        // moduleName defaults to file name
                moduleVar: 'module',     // moduleVar defaults to 'ngModule'
                output: 'verbose',       // 'verbose' (default) || 'simple' || 'none'
                missingFiles: 'warn'     // 'ignore' || 'warn' (default) || 'fail'
            }),
            successCount = 0;

        // compile each file asynchronously
        this.files.forEach(function(file) {

            // If nonull isn't set, grunt errors silently, so let's not use grunt for that
            // Assume that if grunt silently fails, then the file doesn't exist.
            var fileExists = false,
                srcFilePath = file.src.length ? file.src : file.orig.src;

            // Get the file's contents
            var content = file.src.filter(function(filepath) {

                // Remove nonexistent files.
                if (!grunt.file.exists(filepath)) {
                    // fileExists defaults to false so we don't have to do anything here
                    return false;
                } else {
                    fileExists = true;
                    return true;
                }

            }).map(function(filepath) {

                // Read and return the file's source.
                return grunt.file.read(filepath);

            }).join('');

            if(!fileExists) {
                var warnMessage = 'Source file "' + srcFilePath + '" not found.';

                switch(options.missingFiles){
                    case 'warn':
                        grunt.log.warn(warnMessage);
                        break;
                    case 'fail':
                        grunt.fail.warn(warnMessage);
                        break;
                    default:
                        break;
                }
            } else {

                // Run ng-html2js
                var output = nghtml2js(file.src, content, options.moduleName, options.moduleVar);

                // Write the output file
                grunt.file.write(file.dest, output);

                // Log a successful compilation
                if(options.output === 'verbose'){
                    grunt.log.writeln(chalk.cyan(file.src) + ' compiled to ' + chalk.cyan(file.dest));
                }

                successCount++;
            }
        });

        if(options.output !== 'none') {
            grunt.log.writeln(chalk.green( (options.output === 'verbose' ? '\n' : '') + successCount + ' of ' + this.files.length + ' templates compiled successfully.'));
        }
    });

};
