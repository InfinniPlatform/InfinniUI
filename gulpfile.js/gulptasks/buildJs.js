'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    streamqueue = require('streamqueue');

var templateNamespaceInitString = 'window["InfinniUI"] = window["InfinniUI"] || {};\nwindow["InfinniUI"]["Template"] = window["InfinniUI"]["Template"] || {};\n';

function getTemplateStream(src) {
    return gulp.src(src, {base: 'app'})
        .pipe($.templateCompile({
                namespace: 'InfinniUI.Template',
                IIFE: false
        }))
        .pipe($.replace(templateNamespaceInitString, ''))
        .pipe($.replace(/\r*\n/g, ''));
}

function getJsStream(src) {
    return gulp.src(src, {base: '.'})
        .pipe($.wrapper({
            header: function (file) {
                return '//####' + file.relative + '\n';
            }
        }));
}

module.exports = function (options) {
    return function () {
        return streamqueue({ objectMode: true }, getTemplateStream(options.templateSrc), getJsStream(options.src))
            .pipe($.concat(options.finalName))
            .pipe($.wrapper({
                    header: ';(function(){\n' + templateNamespaceInitString,
                    footer: '})();'
                }))
            .pipe(gulp.dest(options.dest))
            .on('error',$.notify.onError({
                title: options.taskName
            }));
    };
};
