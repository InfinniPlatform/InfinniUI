'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    combiner = require('stream-combiner2').obj,
    version = require('../../package.json').version;

module.exports = function (options) {
    return function (callback) {
        return combiner(
            gulp.src(options.src, {base: '.'}),
            $.wrapper({
                header: function (file) {
                    return '//####' + file.relative + '\n';
                }
            }),
            $.concat(options.finalName),
            $.replace(/<%infinniui_version%>/g, version),
            $.wrapper({
                header: ';(function(){\n',
                footer: '})();'
            }),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError({
            title: options.taskName
        }));
    };
};
