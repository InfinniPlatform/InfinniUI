'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var concatStream = require('streamqueue');

var sourceForFiles = require('./sourceForFiles');
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

gulp.task('build:js', function () {
    return concatStream({ objectMode: true }, getTemplateStream(sourceForFiles.templateFiles), getJsStream(sourceForFiles.jsFiles))
        .pipe($.concat(sourceForFiles.platformJsOutputFile))
        .pipe($.wrapper({
                header: ';(function(){\n' + templateNamespaceInitString,
                footer: '})();'
            }))
        .pipe(gulp.dest(sourceForFiles.platformOutputFolder));
});
