'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    streamqueue = require('streamqueue'),
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var templateNamespaceInitString = 'window["InfinniUI"] = window["InfinniUI"] || {};\nwindow["InfinniUI"]["Template"] = window["InfinniUI"]["Template"] || {};\n';

function getTemplateStream(src) {
    return gulp.src(src)
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
    return function (callback) {
        return streamqueue({objectMode: true}, getTemplateStream(options.templateSrc), getJsStream(options.src))
            .pipe($.concat(options.finalName))
            .pipe($.if(!isDevelopment, $.uglify()))
            .pipe(gulp.dest(options.dest));
    };
};
